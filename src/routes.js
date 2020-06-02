/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import Router from 'koa-router';
import auth from './components/auth/auth.router';
import main from './components/main/main.router';
import user from './components/users/user.router';
import config from '../config';

let app_router = new Router({
  prefix: config.api.prefix
});

/*
 * Load all route dependencies.
 * Pass Koa Router Instance as a parameter
 * so just have to import once.
*/
main(Router, app_router);
auth(Router, app_router);
user(Router, app_router);

app_router.all('/*', async (ctx) => {
  ctx.body = {
    status: 'false',
    response: 'Route inexistent.'
  };
  return;
});


export default app_router;
