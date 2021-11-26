import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from '../../order/order.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  phoneNumber: string;

  @ManyToOne(() => Role, (role: Role) => role.users)
  role: Role;

  @OneToMany(() => Order, (order: Order) => order.user)
  orders: Order[];
}
