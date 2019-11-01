'use strict';

import { User } from '../../db/models';

class AuthService {
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
   * @desc Create a new user
   * @method
   * @param {Object} user_input
   * @param {Object} user_input.name - User name
   * @param {Object} user_input.surname - User surname
   * @returns {Record} User Instance
   *
   * @example
   * let user_record = await authServiceInstance.Signup(user_data);
   */
  async Signup(user_input) {
    const UserRecord = await this.userModel.create(user_input);
    return UserRecord;
  }
}

module.exports = { AuthService };
