import { Entity, Column, ManyToOne } from 'typeorm';

import { Product } from 'src/product/enities/product.entity';
import { Order } from './order.entity';

@Entity()
export class OrdersProducts {
  @ManyToOne((type) => Order, (order) => order.OrdersProductss, {
    primary: true,
  })
  order: Order;

  @ManyToOne((type) => Product, (product) => product.OrdersProductss, {
    primary: true,
  })
  product: Product;

  @Column()
  quantity: number;
}
