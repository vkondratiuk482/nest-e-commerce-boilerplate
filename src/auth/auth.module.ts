import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';
import { TokenModule } from '../token/token.module';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TokenModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
