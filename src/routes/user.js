/*
 * Name: user.js
 * Description: Router for user resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

// TODO: Temporary controller function
async function user_route(ctx) {
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
  const user_router = new Router;
  user_router.prefix('/user');
  user_router.get('/', user_route);
  main_router.use(user_router.routes());
};
