import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Если роли не указаны, разрешаем доступ
    if (!requiredRoles) {
      return true;
    }

    // Получаем пользователя из контекста
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    // Проверяем наличие пользователя
    if (!user) {
      return false;
    }

    // Проверяем роль пользователя
    return requiredRoles.includes(user.role);
  }
}
