/*
 * Name: auth.router.js
 * Description: Router for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import { User_Schema_Create_Validator } from '../validators';
import { AuthController } from '../controllers';

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} app_router - app router from app
 */
export default (Router, app_router) => {
  const auth_router = new Router;
  auth_router.prefix('/auth');

  const authController = new AuthController();

  auth_router.post('/signup',
    User_Schema_Create_Validator,
    authController.SignUp
  );

  app_router.use(auth_router.routes());
};
