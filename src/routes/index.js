/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import Router from 'koa-router';
import auth from './auth';
import config from '../../config';

let app_router = Router({
  prefix: config.api.prefix
});

// TODO: Temporary controller function
async function main_route(ctx) {
  ctx.type = 'application/json';
  ctx.body = {
    status: 'success',
    response: 'Main route'
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
    status: 'fail',
    response: 'Route inexistent.'
  };
  return;
});


export default app_router;
