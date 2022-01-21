import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { Permission } from './entities/permission.entity';

import { RoleModule } from '../role/role.module';

import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Permission]), RoleModule],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
