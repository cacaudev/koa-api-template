/*
 * Name: auth.router.js
 * Description: Router for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import { Authorization_Header_Validator } from '../../global/validators';
import { AuthController } from './auth.controller';

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} app_router - app router from app
 */
export default (Router, app_router) => {
  const auth_router = new Router;
  auth_router.prefix('/auth');

  const authController = new AuthController();

  auth_router.get('/token',
    Authorization_Header_Validator,
    authController.SignIn
  );

  app_router.use(auth_router.routes());
};
