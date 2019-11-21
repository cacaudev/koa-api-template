'use strict';

import * as _ from 'lodash';
import { User } from '../../db/models';
import { FormatTimezone } from '../utils';

class UserService {
  /**
   * @summary Create an AuthService Instance
   * @class
   * @property {Sequelize_Model} userModel
   * @returns {function} AuthService Instance
   *
   * @example
   * const auth_instance = new AuthService();
   */

  constructor() {
    this.userModel = User;
    this.dateFields = [
      'createdAt',
      'updatedAt'
    ];
  }

  /**
   * @desc Read user
   * @method
   * @param {Object} user_input
   * @param {Object} user_input.name - User name
   * @param {Object} user_input.surname - User surname
   * @returns {Record} User Instance
   *
   * @example
   * let user_record = await userServiceInstance.Read(user_data);
   */
  async GetById(id) {
    return await this.userModel.findOne({
      where: { id },
      attributes: {
        exclude: ['password']
      },
      raw: true
    });
  }

  async UpdateById(id, user_input) {
    return await this.userModel.update(
      user_input,
      {
        returning: true, // Return the user record updated
        where: { id },
        raw: true
      }
    );
  }

  async DeleteById(id) {
    return await this.userModel.destroy({
      where: { id }
    });
  }

  async Serialize(user_input) {
    delete user_input.password;

    let dates = _.pick(user_input, this.dateFields);
    for (var key in dates)
      user_input[key] = await FormatTimezone(dates[key], user_input.timezone);

    return user_input;
  }
}

module.exports = { UserService };
