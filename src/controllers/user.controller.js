'use strict';

import { UserService } from '../services';
import Response from '../utils/global/response.class';

class UserController {
  async read(ctx) {
    const user_Id = ctx.params.userId;

    const userInstance = new UserService();
    return await userInstance
      .GetById(user_Id)
      .then((result) => {
        if (!result)
          Response.notFound(ctx, 'User');
        else
          Response.success(ctx, { user: result });
      })
      .catch((err) => Response.error(ctx,
        'BAD_REQUEST',
        `Error trying to read user: ${err}`
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