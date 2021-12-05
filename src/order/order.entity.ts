import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Product } from '../product/product.entity';

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

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @JoinTable()
  @ManyToMany(() => Product, (product: Product) => product.orders)
  products: Product[];
}
