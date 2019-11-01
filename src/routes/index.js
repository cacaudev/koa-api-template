/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import Router from 'koa-router';
import auth from './auth.route';
import config from '../../config';
import { LocaleService } from '../services';

let app_router = Router({
  prefix: config.api.prefix
});

async function main_route(ctx) {
  let i18n = new LocaleService(ctx.request.query.locale);

  ctx.type = 'application/json';
  ctx.body = {
    status: 'success',
    response: i18n._t('info:welcome')
  };
  return;
}

app_router.get('/', main_route);

/*
 * Load all route dependencies.
 * Pass Koa Router Instance as a parameter
 * so just have to import once.
*/
auth(Router, app_router);

app_router.all('/*', async (ctx) => {
  ctx.body = {
    status: 'false',
    response: 'Route inexistent.'
  };
  return;
});


export default app_router;
