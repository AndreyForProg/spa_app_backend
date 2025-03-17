import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Переопределение для работы с HTTP запросами
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  // Переопределение для извлечения HTTP запроса из GraphQL контекста
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
