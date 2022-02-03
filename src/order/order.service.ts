import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import Stripe from 'stripe';
import { Repository } from 'typeorm';

import { Status } from './enums/status.enum';

import { Order } from './entities/order.entity';
import { Product } from 'src/product/enities/product.entity';
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
    const status = Status.NEEDS_CONFIRMATION;
    const productsDto = createOrderDto.products;

    const userExists = await this.userService.findOne(userId);

    const productsIds = productsDto.map((current) => current.id);
    const productsMap = new Map<string, number>(); //productId -> quantity

    const products = await this.productService.findManyByIds(productsIds);

    for (const product of productsDto) {
      const { id, quantity } = product;

      productsMap.set(id, quantity);
    }

    const price = await this.getTotalPrice(products, productsMap);

    const paymentItems = products.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
        },
        unit_amount: product.price * 100,
      },
      quantity: productsMap.get(product.id),
    }));

    const sessionObject = await this.createPaymentSession(paymentItems);

    const order = await this.orderRepository.create({
      ...createOrderDto,
      userId,
      status,
      price,
      stripeId: sessionObject.id,
    });

    const savedOrder = await this.orderRepository.save(order);

    const ordersProducts = products.map((product) => ({
      orderId: savedOrder.id,
      productId: product.id,
      quantity: productsMap.get(product.id),
    }));

    await this.ordersProductsRepository.save(ordersProducts);

    return sessionObject.url;
  }

  async createPaymentSession(items: any) {
    const session = await this.stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: items,
      success_url:
        'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cancel',
    });

    const sessionUrlObject = { url: session.url, id: session.id };

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

  private async getTotalPrice(
    products: Array<Product>,
    productsMap: Map<string, number>,
  ) {
    const price = products.reduce(
      (sum, current) => sum + +current.price * productsMap.get(current.id),
      0,
    );

    return price;
  }
}
