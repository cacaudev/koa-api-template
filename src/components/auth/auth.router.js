/*
 * Name: auth.router.js
 * Description: Router for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/
"use strict";

import Router from "koa-router";
import {
  hasAuthorizationHeaders
} from "../../global/middlewares";
import { AuthController } from "./auth.controller";

const AuthRouter = new Router({ prefix: "/auth" });
const authController = new AuthController();

AuthRouter
  .get("/token",
    hasAuthorizationHeaders,
    authController.SignIn
  );

export default AuthRouter;
