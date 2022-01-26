import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Order } from './entities/order.entity';

import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from 'src/token/token.module';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

import { OrderController } from './order.controller';

import { OrderService } from './order.service';
import { OrdersProducts } from './entities/orders-products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrdersProducts]),
    ProductModule,
    UserModule,
    TokenModule,
    AuthModule,
    RoleModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
