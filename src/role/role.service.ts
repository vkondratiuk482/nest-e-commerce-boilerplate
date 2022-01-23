import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findOneByName(name: string) {
    const role = await this.roleRepository.findOne({ name });

    if (role) {
      return role;
    }

    throw new NotFoundException(`There is no role under this name ${name}`);
  }

  async checkPermission(name: string, neededPermission: string) {
    const role = await this.roleRepository.findOne(
      {
        name,
      },
      {
        relations: ['permissions'],
      },
    );

    const permission = role.permissions.find(
      (permission) => permission.name === neededPermission,
    );

    if (permission) {
      return true;
    }

    return false;
  }
}
