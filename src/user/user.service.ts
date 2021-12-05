import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}

  async findAll() {
    const users = await this.userRepository.find({
      relations: ['role'],
    });

    return users;
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id, {
      relations: ['role'],
    });

    if (!user) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const id = uuidv4();
    const role = await this.preloadRoleById(createUserDto.roleId);

    const user = await this.userRepository.create({
      id,
      ...createUserDto,
      role,
    });

    return this.userRepository.save(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const role =
      updateUserDto.roleId &&
      (await this.preloadRoleById(updateUserDto.roleId));

    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
      role,
    });

    if (!user) {
      throw new NotFoundException(`There is no user under id ${id}`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    return this.userRepository.remove(user);
  }

  private async preloadRoleById(id: string): Promise<Role> {
    const role = await this.roleRepository.findOne(id);

    if (role) {
      return role;
    }

    throw new NotFoundException(`There is no role under this id ${id}`);
  }
}
