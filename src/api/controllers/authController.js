/*
 * Description: Auth controller.
 * Author: Cacaudev
 * Date: 01/11/2019
 */
'use strict';

import { AuthService } from '../../services';
import Response from '../../common/response';

class AuthController {
  async signIn(ctx) {
    const response = new Response(ctx);
    const authInstance = new AuthService();
    const authHeader = ctx.request.headers['authorization'];

    return await authInstance
      .authenticate(authHeader)
      .then(async (user_id) => {
        const token = await authInstance.generateToken(user_id);
        return response.success({ token });
      })
      .catch(() => response.unauthorized());
  }
}

module.exports = { AuthController };
