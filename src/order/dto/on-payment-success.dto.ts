import { IsString } from 'class-validator';

export class OnPaymentSuccessQuery {
  @IsString()
  session_id: string;
}
