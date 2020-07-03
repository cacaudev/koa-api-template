/*
 * @Author: cacaudev
 * @Date: 2020-07-03 18:13:37
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-03 18:35:42
 */
"use strict";

import _ from "lodash";
import { UserService } from "./user.service";
import { paginate } from "../../utils";
import Response from "../../utils/response";

class UserController {
  constructor() {
    //this.userInstance = new UserService();
  }

  async create(ctx) {
    const userInstance = new UserService();
    const user_data = ctx.request.body;
    return await userInstance.create(user_data)
      .then(async (result) => {
        Response.created(ctx, {
          user: await userInstance.serialize(result)
        });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to create user: ${err}`
      ));
  }
  async read(ctx) {
    const userInstance = new UserService();
    const { userId } = ctx.params;
    return await userInstance
      .getById(userId)
      .then(async (result) => {
        if (!result)
          Response.notFound(ctx, "user");
        else
          Response.success(ctx, {
            user: await userInstance.serialize(result)
          });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to read user: ${err}`
      ));
  }
  async update(ctx) {
    const { userId } = ctx.params;
    const userInstance = new UserService();
    const user_data = ctx.request.body;

    return await userInstance
      .updateById(userId, user_data)
      .then(async ([updatedRows, [updatedResources]]) => {
        if (updatedRows == 0)
          Response.notFound(ctx, "User");
        else
          Response.success(ctx, {
            user: await userInstance.serialize(updatedResources)
          });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to update user: ${err}`
      ));
  }
  async delete(ctx) {
    const { userId } = ctx.params;
    const userInstance = new UserService();

    return await userInstance
      .deleteById(userId)
      .then((result) => {
        if (result == 0)
          Response.notFound(ctx, "User");
        else
          Response.noContent(ctx, {});
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to delete user: ${err}`
      ));
  }
  async list(ctx) {
    const userInstance = new UserService();
    const { page, limit_by_page } = ctx.query;
    let query = {};

    if (page && limit_by_page)
      query = await paginate(page, limit_by_page);

    return await userInstance
      .list(query)
      .then(async (users) => {
        if (users.count == 0)
          return Response.noContent(ctx, {});

        users["rows"].map((user) => userInstance.serialize(user));

        let result = { users: users.rows };
        let pagination_info;

        if (query)
          pagination_info = {
            itens_total: users.count,
            pages_total: Math.ceil(users.count / limit_by_page),
            itens_per_page: parseInt(limit_by_page),
            current_page: parseInt(page)
          };

        Response.success(ctx,
          !_.isEmpty(query) ?
            Object.assign(pagination_info, result) :
            result
        );
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to list users: ${err}`
      ));
  }
}

module.exports = { UserController };
