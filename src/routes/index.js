/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

"use strict";

import Router from "koa-router";
import authRouter from "../components/auth/auth.router";
import mainRouter from "../components/main/main.router";
import userRouter from "../components/users/user.router";
import config from "../../config";
import Response from "../global/utils/response";

const baseRouter = new Router({
  prefix: config.api.prefix
});

baseRouter
  .use(mainRouter.routes())
  .use(authRouter.routes())
  .use(userRouter.routes())
  .all("/*", async (ctx) => {
    Response.error(ctx,
      "METHOD_NOT_ALLOWED"
    );
    return;
  });

export default baseRouter;
