import { IsOptional, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  readonly adress: string;

  @IsString()
  readonly date: string;

  @IsString({ each: true })
  readonly products: string[];

  @IsString()
  readonly status: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
