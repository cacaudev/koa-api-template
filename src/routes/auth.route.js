/*
 * Name: user.js
 * Description: Router for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import { SignUp_Validator } from '../validators';
import { AuthController } from '../controllers';

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} main_router - Main router from app
 */
export default (Router, main_router) => {
  const auth_router = new Router;
  auth_router.prefix('/auth');

  const authController = new AuthController();

  auth_router.post(
    '/signup',
    SignUp_Validator,
    authController.SignUp
  );

  main_router.use(auth_router.routes());
};
