import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly vendorCode: string;

  @IsString()
  readonly weight: string;

  @IsNumber()
  readonly price: number;

  @IsString()
  readonly photo: string;

  @IsString()
  readonly description: string;

  @IsString()
  readonly size: string;

  @IsString()
  readonly category: string;
}
