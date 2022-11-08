import { Controller, Get, Inject } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Controller('/')
export class HomeController {
  @Inject()
  ctx: Context;

  @Inject()
  jwt: JwtService;

  @Get('/')
  async home(): Promise<string> {
    return 'Hello Midwayjs!';
  }
}
