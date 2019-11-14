/*
 * Name: user.router.js
 * Description: Router for user resource endpoints.
 * Author: Cacaudev
 * Date: 08/11/2019
*/

'use strict';

import { UserController } from '../controllers';
import { User_Id_Validator } from '../validators';

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} app_router - app router from app
 */
export default (Router, app_router) => {
  const user_router = new Router;
  user_router.prefix('/user');

  const userController = new UserController();

  user_router.get('/:userId', User_Id_Validator, userController.read);
  user_router.delete('/:userId', User_Id_Validator, userController.delete);

  app_router.use(user_router.routes());
};