import { Inject } from '@midwayjs/core';
import { CustomStrategy, PassportStrategy } from '@midwayjs/passport';
import { Strategy } from 'passport-local';
import { LoginService } from '../service/login.service';

@CustomStrategy()
export class LocalStrategy extends PassportStrategy(Strategy) {
  @Inject()
  loginService: LoginService;

  // 策略的验证
  async validate(username, password) {
    const res = await this.loginService.validateUser({
      username,
      password,
    });
    if (!res) {
      throw new Error('username or password error');
    }

    return {
      username,
      password,
    };
  }

  // 当前策略的参数
  getStrategyOptions(): any {
    return {};
  }
}
