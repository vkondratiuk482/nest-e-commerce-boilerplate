import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { OrdersProducts } from './orders-products.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  adress: string;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column({ length: 25 })
  date: string;

  @Column({ length: 50 })
  status: string;

  @Column({ nullable: true })
  stripeId: string;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @Column()
  userId: string;

  @OneToMany(
    () => OrdersProducts,
    (OrdersProducts: OrdersProducts) => OrdersProducts.order,
  )
  OrdersProducts: OrdersProducts[];
}
