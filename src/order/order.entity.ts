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
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  adress: string;

  @Column()
  price: string;

  @Column()
  date: string;

  @ManyToOne(() => User, (user: User) => user.orders)
  user: User;

  @JoinTable()
  @ManyToMany(() => Product, (product: Product) => product.orders)
  products: Product[];
}
