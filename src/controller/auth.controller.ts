import {
  ContentType,
  Controller,
  Get,
  Inject,
  Post,
} from '@midwayjs/decorator';
import { LocalPassportMiddleware } from '../middleware/local.middleware';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';

@Controller('/')
export class AuthController {
  @Inject()
  ctx: Context;

  @Inject()
  jwt: JwtService;

  @Get('/login')
  @ContentType('html')
  async login() {
    return 'login <input/>';
  }

  @Post('/login', { middleware: [LocalPassportMiddleware] })
  async signin() {
    console.log('local user: ', this.ctx.state.user);
    const token = await this.jwt.sign({ msg: this.ctx.state.user });
    this.ctx.cookies.set('Token', token);
    return {
      success: true,
      message: 'successful login!',
      token,
    };
  }
}
