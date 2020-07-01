/*
 * @Author: cacaudev
 * @Date: 2020-06-30 21:00:00
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-30 21:16:20
 */

"use strict";
import Router from "koa-router";
import authRouter from "../../components/auth/auth.router";
import userRouter from "../../components/users/user.router";
import config from "../../../config";

const v1Router = new Router({
  prefix: config.api.prefix
});

v1Router
  .use(authRouter.routes())
  .use(userRouter.routes());

export default v1Router;
