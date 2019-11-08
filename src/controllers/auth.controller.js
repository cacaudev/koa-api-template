/*
 * Description: Auth controller.
 * Author: Cacaudev
 * Date: 01/11/2019
*/
'use strict';

import { AuthService } from '../services';
import Response from '../utils/global/response';

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
}

module.exports = { AuthController };
