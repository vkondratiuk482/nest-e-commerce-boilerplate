import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async setRefreshToken(id: string, refreshToken: string) {
    const user = await this.userService.findOne(id);

    return this.userRepository.save({
      ...user,
      refreshToken,
    });
  }

  async getRefreshToken(id: string) {
    const user = await this.userService.findOne(id);

    const token = user.refreshToken;

    return token;
  }

  async removeRefreshToken(id: string) {
    const user = await this.userService.findOne(id);

    return this.userRepository.save({
      ...user,
      refreshToken: null,
    });
  }

  verifyRefreshToken(refreshToken: string) {
    const decodedUser = this.jwtService.verify(refreshToken, {
      secret: process.env.JWT_REFRESH_SECRET,
    });

    return decodedUser;
  }

  verifyAccessToken(accessToken: string) {
    const decodedUser = this.jwtService.verify(accessToken, {
      secret: process.env.JWT_ACCESS_SECRET,
    });

    return decodedUser;
  }

  async generateTokens(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.role };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '30m',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d',
    });

    await this.setRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken };
  }

  private async isRefreshTokenValid(refreshToken: string) {
    try {
      const user = await this.verifyRefreshToken(refreshToken);
      const storedToken = await this.getRefreshToken(user?.id);

      if (refreshToken === storedToken) {
        return true;
      }

      return false;
    } catch (e) {
      return false;
    }
  }
}
