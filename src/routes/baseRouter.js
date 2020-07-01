/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

"use strict";

import Router from "koa-router";
import mainRouter from "../components/main/main.router";
import v1Router from "./v1";
import Response from "../utils/response";

const baseRouter = new Router();

baseRouter
  .use(mainRouter.routes())
  .use(v1Router.routes())
  .all("/*", async (ctx) => {
    Response.methodNotAllowed(ctx);
  });

export default baseRouter;
