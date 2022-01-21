import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';
import { RoleService } from '../role.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly roleService: RoleService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return new Promise(async (resolve) => {
      const neededPermission = this.reflector.get<string>(
        'permission',
        context.getHandler(),
      );

      const req = context.switchToHttp().getRequest();

      try {
        const { id } = await this.authService.parseAuthorizationHeaders(
          req.headers.authorization,
        );
        const { role } = await this.userService.findOne(id);
        const hasPermission = await this.roleService.checkPermission(
          role.name,
          neededPermission.toString(),
        );

        resolve(hasPermission);
      } catch (e) {
        console.log(e);
      }
    });
  }
}
