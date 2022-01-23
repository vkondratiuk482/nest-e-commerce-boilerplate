import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from 'src/user/entities/user.entity';
import { Permission } from '../../user/entities/permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  name: string;

  @OneToMany(() => User, (user: User) => user.role)
  users: User[];

  @JoinTable()
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
