"use strict";

import _ from "lodash";
import { UserService } from "./user.service";
import { paginate } from "../../utils";
import Response from "../../utils/response";

class UserController {
  async create(ctx) {
    const user_data = ctx.request.body;
    const userInstance = new UserService();

    return await userInstance
      .create(user_data)
      .then(async (result) => {
        Response.created(ctx, {
          user: await userInstance.Serialize(result)
        });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to create user: ${err}`
      ));
  }

  async read(ctx) {
    const user_Id = ctx.params.userId;
    const userInstance = new UserService();

    return await userInstance
      .getById(user_Id)
      .then(async (result) => {
        if (!result)
          Response.notFound(ctx, "User");
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
    const user_Id = ctx.params.userId;
    const user_data = ctx.request.body;
    const userInstance = new UserService();

    return await userInstance
      .updateById(user_Id, user_data)
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
    const user_Id = ctx.params.userId;
    const userInstance = new UserService();

    return await userInstance
      .deleteById(user_Id)
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
    let query = {};

    if (ctx.query.page && ctx.query.limit_by_page)
      query = await paginate(ctx.query.page, ctx.query.limit_by_page);

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
            pages_total: Math.ceil(users.count / ctx.query.limit_by_page),
            itens_per_page: parseInt(ctx.query.limit_by_page),
            current_page: parseInt(ctx.query.page)
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
