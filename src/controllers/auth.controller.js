'use strict';

import { AuthService } from '../services';

class AuthController {

  async SignUp(ctx) {
    const user_data = ctx.request.body;

    try {
      const AuthInstance = new AuthService();
      const user_record = await AuthInstance.Signup(user_data);
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
}

module.exports = { AuthController };
