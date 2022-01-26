import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly surname: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string;

  @IsPhoneNumber()
  readonly phoneNumber: string;

  @IsString()
  readonly roleName: string;
}
