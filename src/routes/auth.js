/*
 * Name: user.js
 * Description: Router for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import { SignUp_Validator } from '../validators';

// TODO: Temporary controller function
async function auth_route(ctx) {
  ctx.type = 'application/json';
  ctx.body = {
    status: 'success',
    response: 'User main route'
  };
  return;
}

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} main_router - Main router from app
 */
export default (Router, main_router) => {
  const auth_router = new Router;
  auth_router.prefix('/auth');

  auth_router.get(
    '/',
    auth_route
  );
  auth_router.post(
    '/signup',
    SignUp_Validator
  );

  main_router.use(auth_router.routes());
};
