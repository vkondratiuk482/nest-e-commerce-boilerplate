import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    try {
      const authHeader = req.headers.authorization;

      const tokenType = authHeader.split(' ')[0];
      const token = authHeader.split(' ')[1];

      if (!token || tokenType !== 'Bearer') {
        throw new UnauthorizedException('Incorrect auth headers');
      }

      const payload = this.tokenService.verifyAccessToken(token);

      return true;
    } catch (e) {}
  }
}
