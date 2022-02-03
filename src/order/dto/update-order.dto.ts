import { IsString, IsOptional, IsEnum } from 'class-validator';

import { Status } from '../enums/status.enum';

export class UpdateOrderDto {
  @IsOptional()
  @IsString()
  readonly adress?: string;

  @IsOptional()
  @IsString()
  readonly date?: string;

  @IsOptional()
  @IsEnum(Status)
  readonly status?: string;
}
