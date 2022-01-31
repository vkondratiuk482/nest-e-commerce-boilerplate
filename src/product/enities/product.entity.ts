import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OrdersProducts } from 'src/order/entities/orders-products.entity';

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

  @OneToMany(
    () => OrdersProducts,
    (OrdersProducts: OrdersProducts) => OrdersProducts.product,
  )
  OrdersProducts: OrdersProducts[];
}
