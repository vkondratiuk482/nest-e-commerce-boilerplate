import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
