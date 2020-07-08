/*
 * Name: user.router.js
 * Description: Router for user resource endpoints.
 * Author: Cacaudev
 * Date: 08/11/2019
*/

"use strict";

import Router from "koa-router";
import { UserController } from "../../controllers/user.controller";
import { hasPaginationParams } from "../../middlewares";
import {
  hasParams,
  hasCredentials,
  hasCreateBody,
  hasUpdateBody
} from "../../middlewares";

const userRouter = new Router({ prefix: "/user" });
const userController = new UserController();

userRouter
  .post("/",
    hasCredentials,
    hasCreateBody,
    userController.create
  )
  .get("/:userId",
    hasParams,
    userController.read
  )
  .patch("/:userId",
    hasParams,
    hasUpdateBody,
    userController.update
  )
  .delete("/:userId",
    hasParams,
    userController.delete
  )
  .get("s",
    hasPaginationParams,
    userController.list
  );

export default userRouter;
