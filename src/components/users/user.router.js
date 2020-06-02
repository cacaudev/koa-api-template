/*
 * Name: user.router.js
 * Description: Router for user resource endpoints.
 * Author: Cacaudev
 * Date: 08/11/2019
*/

'use strict';

import { UserController } from './user.controller';
import { Paginate_Params } from '../../global/validators';
import {
  Id_Validator,
  Update_Validator,
  Create_Validator
} from './user.validator';

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} app_router - app router from app
 */
export default (Router, app_router) => {
  const user_router = new Router;
  user_router.prefix('/user');

  const userController = new UserController();

  user_router.post('/',
    Create_Validator,
    userController.create
  );

  user_router.get('/:userId',
    Id_Validator,
    userController.read
  );
  user_router.patch('/:userId',
    Id_Validator,
    Update_Validator,
    userController.update
  );
  user_router.delete('/:userId',
    Id_Validator,
    userController.delete
  );
  user_router.get('s',
    Paginate_Params,
    userController.list
  );

  app_router.use(user_router.routes());
};
