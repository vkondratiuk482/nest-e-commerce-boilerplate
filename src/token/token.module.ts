import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/entities/user.entity';

import { UserModule } from '../user/user.module';

import { TokenService } from './token.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: {
        expiresIn: '5m',
      },
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
