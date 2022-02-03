import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';

import { Product } from 'src/product/enities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrdersProducts {
  @PrimaryColumn()
  orderId: string;

  @ManyToOne((type) => Order, (order) => order.OrdersProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order;

  @PrimaryColumn()
  productId: string;

  @ManyToOne((type) => Product, (product) => product.OrdersProducts)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  quantity: number;
}
