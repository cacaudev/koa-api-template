/*
 * Description: Auth controller.
 * Author: Cacaudev
 * Date: 01/11/2019
*/
'use strict';

import { AuthService } from '../services';
import { BasicAuthParser } from '../utils';
import Response from '../utils/global/response.class';

class AuthController {
  async SignUp(ctx) {
    const user_data = ctx.request.body;

    const AuthInstance = new AuthService();
    return await AuthInstance
      .Signup(user_data)
      .then((result) => Response.created(ctx, { user: result }))
      .catch((err) => Response.error(ctx,
        'BAD_REQUEST',
        `Error trying to create user: ${err}`
      ));
  }

  async SignIn(ctx) {
    let authHeader = ctx.request.headers['authorization'];
    const { username, password } = await BasicAuthParser(authHeader);
    console.log('{ username, password } ', { username, password });

    const AuthInstance = new AuthService();
    return await AuthInstance
      .Authenticate({ username, password })
      .then((result) => {
        if (!result)
          Response.unauthorized(ctx);
      })
      .generateToken()
      .then((result) => Response.success(ctx, {
        access_token: result,
        token_type: 'Bearer',
        expires_in: '7 days'
      }))
      .catch((err) => Response.error(ctx,
        'BAD_REQUEST',
        `Error trying to create user: ${err}`
      ));
  }
}

module.exports = { AuthController };
