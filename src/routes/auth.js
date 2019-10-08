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
      const user_credentials = ctx.request.body;
      console.log('TCL: user_credentials', user_credentials);

      let service = new AuthService();


      // Call service layer
      try {
        await service.Signup(user_credentials);
      } catch (err) {
        console.log('err ', err);
      }

      // Return response to client
      ctx.status = 201;
      ctx.body = 'Passed through signup';
      return;
    }
  );

  main_router.use(auth_router.routes());
};
