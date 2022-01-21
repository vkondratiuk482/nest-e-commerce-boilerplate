import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Permission } from 'src/role/decorators/permission.decorator';

import { PermissionGuard } from 'src/role/guards/permission.guard';

import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get('category/:category')
  async findAllByCategory(@Param('category') category: string) {
    return this.productService.findAllByCategory(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Permission('CRUD_PRODUCT_ALL')
  @UseGuards(PermissionGuard)
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Permission('CRUD_PRODUCT_ALL')
  @UseGuards(PermissionGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(id, updateProductDto);
  }

  @Permission('CRUD_PRODUCT_ALL')
  @UseGuards(PermissionGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
