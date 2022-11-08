import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { WeatherErrorFilter } from './filter/weather.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import { JwtPassportMiddleware } from './middleware/jwt.middleware';
import * as view from '@midwayjs/view-nunjucks';
import * as passport from '@midwayjs/passport';
import * as jwt from '@midwayjs/jwt';

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    passport,
    view,
    jwt,
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([ReportMiddleware, JwtPassportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
    this.app.useFilter([WeatherErrorFilter]);
  }
}
