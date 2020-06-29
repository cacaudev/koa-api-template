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

const authRouter = new Router({ prefix: "/auth" });
const authController = new AuthController();

authRouter
  .get("/token",
    hasAuthorizationHeaders,
    authController.signIn
  );

export default authRouter;
