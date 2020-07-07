/*
 * Name: index.js
 * Description: Router base file.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

"use strict";

import Router from "koa-router";
import { MainController } from "../controllers";
import v1Router from "./v1";
import Response from "../utils/response";

const baseRouter = new Router();
const mainController = new MainController();

baseRouter
  .get("/", mainController.getApiInfo)
  .get("/spec", mainController.spec)
  .get("/status", mainController.status)
  .use(v1Router.routes())
  .all("/*", async (ctx) => {
    new Response(ctx).methodNotAllowed();
  });

export default baseRouter;
