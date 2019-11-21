'use strict';

import { UserService } from '../services';
import Response from '../utils/global/response.class';

class UserController {
  async read(ctx) {
    const user_Id = ctx.params.userId;
    const userInstance = new UserService();

    return await userInstance
      .GetById(user_Id)
      .then(async (result) => {
        if (!result)
          Response.notFound(ctx, 'User');
        else
          Response.success(ctx, {
            user: await userInstance.Serialize(result)
          });
      })
      .catch((err) => Response.error(ctx,
        'BAD_REQUEST',
        `Error trying to read user: ${err}`
      ));
  }

  async update(ctx) {
    const user_Id = ctx.params.userId;
    const user_data = ctx.request.body;
    const userInstance = new UserService();

    return await userInstance
      .UpdateById(user_Id, user_data)
      .then(async ([updatedRows, [updatedResources]]) => {
        if (updatedRows == 0)
          Response.notFound(ctx, 'User');
        else
          Response.success(ctx, {
            user: await userInstance.Serialize(updatedResources)
          });
      })
      .catch((err) => Response.error(ctx,
        'BAD_REQUEST',
        `Error trying to update user: ${err}`
      ));
  }

  async delete(ctx) {
    const user_Id = ctx.params.userId;
    const userInstance = new UserService();

    return await userInstance
      .DeleteById(user_Id)
      .then((result) => {
        if (result == 0)
          Response.notFound(ctx, 'User');
        else
          Response.noContent(ctx, {});
      })
      .catch((err) => Response.error(ctx,
        'BAD_REQUEST',
        `Error trying to delete user: ${err}`
      ));
  }
}

module.exports = { UserController };
