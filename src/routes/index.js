/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

"use strict";

import Router from "koa-router";
import AuthRouter from "../components/auth/auth.router";
import MainRouter from "../components/main/main.router";
import UserRouter from "../components/users/user.router";
import config from "../../config";
import Response from "../global/utils/response.class";

const baseRouter = new Router({
  prefix: config.api.prefix
});

baseRouter
  .use(MainRouter.routes())
  .use(AuthRouter.routes())
  .use(UserRouter.routes())
  .all("/*", async (ctx) => {
    Response.error(ctx,
      "METHOD_NOT_ALLOWED"
    );
    return;
  });

export default baseRouter;
