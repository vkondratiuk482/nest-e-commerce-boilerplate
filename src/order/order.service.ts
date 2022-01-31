import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Stripe from 'stripe';
import { Repository } from 'typeorm';

import { Status } from './enums/status.enum';

import { Order } from './entities/order.entity';
import { OrdersProducts } from './entities/orders-products.entity';

import { CreateOrderDto, ProductDto } from '../order/dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { InjectStripe } from 'nestjs-stripe';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrdersProducts)
    private readonly ordersProductsRepository: Repository<OrdersProducts>,
    @InjectStripe() private readonly stripeClient: Stripe,
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

  async create(userId: string, createOrderDto: CreateOrderDto) {
    const { products } = createOrderDto;
    const status = Status.NEEDS_CONFIRMATION;

    const price = await this.getTotalPrice(products);
    const userExists = await this.userService.findOne(userId);

    const order = await this.orderRepository.create({
      ...createOrderDto,
      userId,
      status,
      price,
    });

    const savedOrder = await this.orderRepository.save(order);

    const ordersProducts = products.map((product) => ({
      orderId: savedOrder.id,
      productId: product.id,
      quantity: product.quantity,
    }));

    return this.ordersProductsRepository.save(ordersProducts);
  }

  async createPaymentSession(items: any) {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items,
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    const sessionUrlObject = { url: session.url };

    return sessionUrlObject;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderDto,
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

  private async getTotalPrice(productsDto: Array<ProductDto>) {
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

    return price;
  }
}
