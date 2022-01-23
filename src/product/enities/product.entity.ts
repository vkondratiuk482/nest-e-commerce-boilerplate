import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Order } from '../../order/entities/order.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50 })
  vendorCode: string;

  @Column({ length: 10 })
  weight: string;

  @Column('decimal', {
    precision: 8,
    scale: 2,
  })
  price: number;

  @Column()
  photo: string;

  @Column({ length: 255 })
  description: string;

  @Column()
  size: string;

  @Column({ length: 50 })
  category: string;

  @ManyToMany(() => Order, (order: Order) => order.products)
  orders: Order[];
}
