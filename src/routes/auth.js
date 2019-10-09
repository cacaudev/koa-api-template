/*
 * Name: user.js
 * Description: Router for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import { SignUp_Validator } from '../validators';
import AuthService from '../services/auth';

/**
 * @param {Router} Router - Koa Router instance
 * @param {Router} main_router - Main router from app
 */
export default (Router, main_router) => {
  const auth_router = new Router;
  auth_router.prefix('/auth');

  auth_router.post(
    '/signup',
    SignUp_Validator,
    async (ctx) => {
      const user_data = ctx.request.body;

      try {
        // Call service layer
        const authServiceInstance = new AuthService();
        const user_record = await authServiceInstance.Signup(user_data);

        // Return response to client
        ctx.status = 201;
        ctx.body = { user: user_record };

      } catch (err) {
        ctx.status = 400;
        ctx.body = {
          status: 'failed',
          message: {
            error: err
          }
        };
      }

      return;
    }
  );

  main_router.use(auth_router.routes());
};
