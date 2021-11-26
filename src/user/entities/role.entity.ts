import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @OneToMany(() => User, (user: User) => user.role)
  users: User[];

  @JoinTable()
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[];
}
