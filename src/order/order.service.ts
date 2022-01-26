import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { Status } from './enums/status.enum';

import { OrdersProducts } from './entities/orders-products.entity';
import { Order } from './entities/order.entity';

import { CreateOrderDto, ProductDto } from '../order/dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrdersProducts)
    private readonly ordersProductsRepository: Repository<OrdersProducts>,
    private readonly productService: ProductService,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    const orders = await this.orderRepository.find();

    return orders;
  }

  async findAllByUserId(id: string) {
    const orders = await this.orderRepository.find({
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
    const order = await this.orderRepository.findOne(id);

    if (!order) {
      throw new NotFoundException(`Order under this id doesn't exist`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userService.findOne(createOrderDto.userId);
    const { products, price, productsMap } =
      await this.getProductsAndTheirPrice(createOrderDto.products);

    const status = Status.NEEDS_CONFIRMATION;

    const order = await this.orderRepository.create({
      ...createOrderDto,
      price,
      user,
      status,
    });

    const savedOrder = await this.orderRepository.save(order);

    const ordersProducts = products.map((product) => ({
      order,
      product,
      quantity: productsMap.get(product.id),
    }));

    await this.ordersProductsRepository.save(ordersProducts);

    return savedOrder;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const { products, price, productsMap } =
      updateOrderDto.products &&
      (await this.getProductsAndTheirPrice(updateOrderDto.products));

    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
      price,
    });

    if (!order) {
      throw new NotFoundException(`There is no order under id ${id}`);
    }

    const savedOrder = await this.orderRepository.save(order);

    if (updateOrderDto.products) {
      const ordersProducts = products.map((product) => ({
        order,
        product,
        quantity: productsMap.get(product.id),
      }));

      return this.ordersProductsRepository.save(ordersProducts);
    }

    return savedOrder;
  }

  async remove(id: string) {
    const order = await this.findOne(id);

    return this.orderRepository.remove(order);
  }

  private async getProductsAndTheirPrice(productsDto: Array<ProductDto>) {
    const productsMap = new Map<string, number>(); //productId -> quantity
    const productsIds = productsDto.map((current) => current.id);

    for (const product of productsDto) {
      const { id, quantity } = product;

      productsMap.set(id, quantity);
    }

    const products = await this.productService.findManyByIds(productsIds);

    const price = products.reduce(
      (sum, current) => sum + +current.price * productsMap.get(current.id),
      0,
    );

    return { products, price, productsMap };
  }
}
