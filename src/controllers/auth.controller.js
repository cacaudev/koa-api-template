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

    const AuthInstance = new AuthService();
    return await AuthInstance
      .Authenticate({ username, password })
      .then(async (user_id) => {
        const token = await AuthInstance.GenerateToken(user_id);
        return Response.success(ctx, {
          access_token: token,
          token_type: 'Bearer',
          expires_in: '7 days'
        });
      })
      .catch(() => Response.unauthorized(ctx));
  }
}

module.exports = { AuthController };
