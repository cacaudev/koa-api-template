'use strict';

import { LocaleService } from '../services';
import swaggerSpec from '../../config/swagger.config';
import appInfo from '../../package.json';
import os from 'os';
import Response from '../utils';

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

    return Response.success(ctx, {
      message: i18n._t('info:welcome'),
      info: data
    });
  }

  async status(ctx) {
    return Response.success(ctx, {
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
    });
  }

  async spec(ctx) {
    return Response.success(ctx, swaggerSpec);
  }
}

module.exports = { MainController };
