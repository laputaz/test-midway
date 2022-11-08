import { Provide, Scope, ScopeEnum } from '@midwayjs/decorator';

@Provide()
@Scope(ScopeEnum.Request, { allowDowngrade: true })
export class LoginService {
  async validateUser(options) {
    return options.username === 'admin' && options.password === 'admin';
  }
}
