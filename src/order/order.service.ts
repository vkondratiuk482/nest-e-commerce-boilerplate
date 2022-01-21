import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Order } from './order.entity';

import { CreateOrderDto } from '../order/dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    const orders = await this.orderRepository.find({
      relations: ['products', 'user'],
    });

    return orders;
  }

  async findAllByUserId(id: string) {
    const orders = await this.orderRepository.find({
      relations: ['products', 'user'],
      where: {
        user: id,
      },
    });

    if (!orders) {
      throw new NotFoundException(`This user doesn't have any orders`);
    }

    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne(id, {
      relations: ['products', 'user'],
    });

    if (!order) {
      throw new NotFoundException(`Order under this id doesn't exist`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto) {
    const products = await this.productService.findManyByIds(
      createOrderDto.products,
    );
    const price = products.reduce((sum, current) => sum + +current.price, 0);
    const user = await this.userService.findOne(createOrderDto.userId);

    const order = await this.orderRepository.create({
      ...createOrderDto,
      products,
      price,
      user,
    });

    return this.orderRepository.save(order);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const products =
      updateOrderDto.products &&
      (await this.productService.findManyByIds(updateOrderDto.products));
    const price =
      updateOrderDto.products &&
      products.reduce((sum, current) => sum + +current.price, 0);

    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
      products,
      price,
    });

    if (!order) {
      throw new NotFoundException(`There is no order under id ${id}`);
    }

    return this.orderRepository.save(order);
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    return this.orderRepository.remove(order);
  }
}
