import { Type } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsEnum,
  ArrayMinSize,
  IsArray,
  ValidateNested,
} from 'class-validator';

import { Status } from '../enums/status.enum';
import { ProductDto } from './create-order.dto';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  readonly adress: string;

  @IsOptional()
  @IsString()
  readonly date: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  readonly products: ProductDto[];

  @IsOptional()
  @IsEnum(Status)
  readonly status: string;
}
