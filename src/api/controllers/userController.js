/*
 * @Author: cacaudev
 * @Date: 2020-07-03 18:13:37
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-19 18:44:38
 */
'use strict';

import _ from 'lodash';
import { UserService } from '../../services';
import { paginate } from '../../common';
import Response from '../../common/response';
// import { User } from '../../models';

let userMock = {
  id: '87937903-b614-4a7c-a243-3fb4b2812d3e',
  type: 'DEFAULT',
  login_type: 'EMAIL',
  timezone: 'America/Sao_Paulo',
  created_at: '2020-07-03T22:03:07.133Z',
  updated_at: '2020-07-03T22:03:07.133Z',
  username: 'cacautest3',
  email: 'cacau3@dev.com',
  name: null,
  surname: null,
  phone: null,
  birthdate: null,
  avatar: null,
};

class UserController {
  constructor() {
    //this.serviceInstance = new UserService(User);
    this.serviceInstance = UserService;
  }

  async create(ctx) {
    const serviceInstance = new UserService();
    const response = new response(ctx);
    const payload = ctx.request.body;

    /* const encryptedPassword = await encryptPassword(payload.password);
     if (encryptedPassword.error)
       return null;
     userInput.password = encryptedPassword;
     */
    return await serviceInstance
      .create(_.omit(payload, ['confirm_password']))
      .then(async (result) => {
        response.created({
          user: await serviceInstance.serialize(result),
        });
      });
  }
  async read(ctx) {
    const serviceInstance = new UserService();
    const response = new response(ctx);

    response.success({
      user: await serviceInstance.serialize(userMock),
    });

    /*return await serviceInstance
      .readById(userId)
      .then(async (result) => {
        if (!result)
          response.notFound(ctx, "user");
        else
          response.success(ctx, {
            user: await serviceInstance.serialize(result)
          });
      });
    }*/
  }
  async update(ctx) {
    const { userId } = ctx.params;
    const serviceInstance = new UserService();
    const response = new Response(ctx);
    const user_data = ctx.request.body;

    return await serviceInstance
      .updateById(userId, user_data)
      .then(async ([updatedRows, [updatedResources]]) => {
        if (updatedRows == 0) response.notFound('User');
        else
          response.success({
            user: await serviceInstance.serialize(updatedResources),
          });
      });
  }
  async delete(ctx) {
    const { userId } = ctx.params;
    const serviceInstance = new UserService();
    const response = new Response(ctx);

    return await serviceInstance.deleteById(userId).then((result) => {
      if (result == 0) response.notFound('User');
      else response.noContent();
    });
  }
  async list(ctx) {
    const service = new UserService();
    const response = new Response(ctx);
    const { page, limit_by_page } = ctx.query;
    let query = {};

    if (page && limit_by_page) query = await paginate(page, limit_by_page);

    return await service.list(query).then(async (users) => {
      if (users.count == 0) return response.noContent();

      users['rows'].map((user) => service.serialize(user));

      let result = { users: users.rows };
      let pagination_info;

      if (query)
        pagination_info = {
          items_total: users.count,
          pages_total: Math.ceil(users.count / limit_by_page),
          items_per_page: parseInt(limit_by_page),
          current_page: parseInt(page),
        };

      response.success(
        !_.isEmpty(query) ? Object.assign(pagination_info, result) : result
      );
    });
  }
}

module.exports = { UserController };
