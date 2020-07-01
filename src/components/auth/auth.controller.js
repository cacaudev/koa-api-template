/*
 * Description: Auth controller.
 * Author: Cacaudev
 * Date: 01/11/2019
*/
"use strict";

import { AuthService } from "./auth.service";
import { basicAuthParser } from "./utils";
import Response from "../../utils/response";

class AuthController {
  async signIn(ctx) {
    let authHeader = ctx.request.headers["authorization"];
    const { username, password } = await basicAuthParser(authHeader);

    const authInstance = new AuthService();
    return await authInstance
      .authenticate({ username, password })
      .then(async (user_id) => {
        const token = await authInstance.generateToken(user_id);
        return Response.success(ctx, {
          access_token: token,
          token_type: "Bearer",
          expires_in: "7 days"
        });
      })
      .catch(() => Response.unauthorized(ctx));
  }
}

module.exports = { AuthController };
