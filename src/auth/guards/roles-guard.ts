import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY, ROLES_MODE_STRICT } from '../decorators/role-decorator';
import { User } from '../../user/entity/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles)
      return true;

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    if (!user)
      throw new UnauthorizedException('Неавторизованная попытка входа');

    const strictMode = this.reflector.get<boolean>(ROLES_MODE_STRICT, context.getHandler());
    const userRoles = await user.roles;
    const rolesIntersects = userRoles.filter((userRole) => {
      return roles.includes(userRole.name);
    });
    if (!strictMode) {
      return rolesIntersects.length > 0;
    }
    return rolesIntersects.length == roles.length;
  }

}