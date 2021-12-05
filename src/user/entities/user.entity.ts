import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/order.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 25 })
  name: string;

  @Column({ length: 25 })
  surname: string;

  @Column({ length: 10 })
  phoneNumber: string;

  @JoinTable()
  @ManyToOne(() => Role, (role: Role) => role.users, {
    cascade: true,
  })
  role: Role;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
