'use strict';

import { User } from '../../db/models';

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
      raw: true
    });
  }

  async UpdateById(id, user_input) {
    return await this.userModel.update({
      user_input,
      where: { id },
    });
  }

  async DeleteById(id, user_input) {
    return await this.userModel.destroy({
      where: { id }
    });
  }
}

module.exports = { UserService };
