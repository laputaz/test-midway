// src/middleware/jwt.middleware.ts

import { Middleware } from '@midwayjs/decorator';
import { PassportMiddleware, AuthenticateOptions } from '@midwayjs/passport';
import { JwtStrategy } from '../strategy/jwt.strategy';
import { Context } from '@midwayjs/koa';

@Middleware()
export class JwtPassportMiddleware extends PassportMiddleware(JwtStrategy) {
  getAuthenticateOptions(): Promise<AuthenticateOptions> | AuthenticateOptions {
    return {
      assignProperty: 'user',
    };
  }
  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return ctx.path === '/login';
  }
}
