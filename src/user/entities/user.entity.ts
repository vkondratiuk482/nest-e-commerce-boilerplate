import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Order } from '../../order/entities/order.entity';
import { Role } from '../../role/entities/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 25 })
  surname: string;

  @Column({ length: 50 })
  email: string;

  @Column({ length: 60 })
  password: string;

  @Column({ length: 16 })
  phoneNumber: string;

  @Column({ nullable: true })
  refreshToken: string;

  @JoinTable()
  @ManyToOne(() => Role, (role: Role) => role.users)
  role: Role;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
