import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { Request } from 'express';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OnPaymentSuccessQuery } from './dto/on-payment-success.dto';

import { Permission } from 'src/role/decorators/permission.decorator';

import { PermissionGuard } from 'src/role/guards/permission.guard';

import { AuthService } from 'src/auth/auth.service';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly authService: AuthService,
  ) {}

  @Get('/success')
  async onPaymentSuccess(@Query() queryParams: OnPaymentSuccessQuery) {
    return this.orderService.onPaymentSuccess(queryParams.session_id);
  }

  @Get('/cancel')
  async onPaymentCanceled() {
    return 'Your payment has been canceled!';
  }

  @Permission('GET_ORDER_ALL')
  @UseGuards(PermissionGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Permission('GET_ORDER_SELF')
  @UseGuards(PermissionGuard)
  @Get()
  async findAllByUserId(@Req() req: Request) {
    const { id } = await this.authService.parseAuthorizationHeaders(
      req.headers.authorization,
    );

    return this.orderService.findAllByUserId(id);
  }

  @Permission('CREATE_ORDER_SELF')
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Req() req: Request, @Body() createOrderDto: CreateOrderDto) {
    const payload = await this.authService.parseAuthorizationHeaders(
      req.headers.authorization,
    );
    const userId = payload.id;

    return this.orderService.create(userId, createOrderDto);
  }

  @Permission('UPDATE_ORDER_ALL')
  @UseGuards(PermissionGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    return this.orderService.update(id, updateOrderDto);
  }

  @Permission('REMOVE_ORDER_ALL')
  @UseGuards(PermissionGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
