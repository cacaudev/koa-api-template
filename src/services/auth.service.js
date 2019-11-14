'use strict';

import { User } from '../../db/models';

import randtoken from 'rand-token';
import bcrypt from 'bcryptjs';

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
   * @param {String} user_input.name - User name
   * @param {String} user_input.surname - User surname
   * @param {Number} user_input.age - User age
   * @returns {Record} User Instance
   *
   * @example
   * let user_record = await authServiceInstance.Signup(user_data);
   */
  async Signup(user_input) {
    const id = randtoken.generator().generate(36);
    return await this.userModel.create({ id, ...user_input });
  }

  async Authenticate({ username, password }) {
    return await this.userModel.findOne({ id, ...user_input });
  }

  async GenerateToken(user_id) {

  }
}

module.exports = { AuthService };
