import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { TokenService } from 'src/token/token.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve) => {
      const neededRole = this.reflector.get<string>(
        'role',
        context.getHandler(),
      );

      const req = context.switchToHttp().getRequest();

      try {
        const authHeader = req.headers.authorization;
        console.log(authHeader);

        const tokenType = authHeader.split(' ')[0];
        const token = authHeader.split(' ')[1];

        if (!token || tokenType !== 'Bearer') {
          throw new UnauthorizedException('Incorrect auth headers');
        }

        const payload = this.tokenService.verifyAccessToken(token);

        const user = await this.userService.findOne(payload.id);

        resolve(neededRole.toString() === user.role.name);
      } catch (e) {}
    });
  }
}
