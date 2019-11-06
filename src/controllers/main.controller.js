'use strict';


import { LocaleService } from '../services';
import swaggerSpec from '../../config/swagger.config';
import appInfo from '../../package.json';
import os from 'os';

class MainController {

  async getApiInfo(ctx) {
    let i18n = new LocaleService(ctx.request.query.locale);

    const environments = {
      nodeVersion: appInfo.engines.node,
      npmVersion: appInfo.engines.npm,
      hostname: os.hostname(),
      platform: `${process.platform}/${process.arch}`
    };
    const data = {
      name: appInfo.name,
      version: appInfo.version,
      description: appInfo.description,
      environments
    };

    ctx.type = 'application/json';
    ctx.body = {
      status: 'success',
      response: {
        message: i18n._t('info:welcome'),
        info: data
      }
    };
    return;
  }


  async status(ctx) {
    ctx.type = 'application/json';
    const data = {
      services: [
        {
          name: 'auth',
          status: 'ok'
        },
        {
          name: 'dashboard',
          status: 'ok'
        }
      ]
    };
    ctx.body = data;
    return;
  }


  async spec(ctx) {
    ctx.type = 'application/json';
    ctx.body = swaggerSpec;
    return;
  }
}

module.exports = { MainController };
