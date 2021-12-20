import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { ProductModule } from '../product/product.module';
import { UserModule } from '../user/user.module';
import { TokenModule } from 'src/token/token.module';
import { RoleModule } from 'src/role/role.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
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
