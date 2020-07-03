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
    const user_data = ctx.request.body;
    return await this.userInstance.create(user_data)
      .then(async (result) => {
        Response.created(ctx, {
          user: result
        });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to create user: ${err}`
      ));
  }
  async read(ctx) {
    const { userId } = ctx.params;
    return await this.userInstance
      .getById(userId)
      .then(async (result) => {
        if (!result)
          Response.notFound(ctx, "user");
        else
          Response.success(ctx, {
            user: await this.userInstance.serialize(result)
          });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to read user: ${err}`
      ));
  }
  async update(ctx) {
    const { userId } = ctx.params;
    const user_data = ctx.request.body;

    return await this.userInstance
      .updateById(userId, user_data)
      .then(async ([updatedRows, [updatedResources]]) => {
        if (updatedRows == 0)
          Response.notFound(ctx, "User");
        else
          Response.success(ctx, {
            user: await this.userInstance.serialize(updatedResources)
          });
      })
      .catch((err) => Response.error(ctx,
        "BAD_REQUEST",
        `Error trying to update user: ${err}`
      ));
  }
  async delete(ctx) {
    const { userId } = ctx.params;

    return await this.service
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

        users["rows"].map((user) => this.userInstance.serialize(user));

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