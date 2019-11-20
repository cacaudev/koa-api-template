'use strict';

import bcrypt from 'bcryptjs';
import randtoken from 'rand-token';

import { User } from '../../db/models';
import { encryptPassword } from '../utils';

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
    const encrypted_password = await encryptPassword(user_input.password);

    if (encrypted_password.error)
      return null;

    user_input.password = encrypted_password;
    return await this.userModel.create({ id, ...user_input });
  }

  /**
   *
   * @param {string} username
   * @param {string} password
   */
  async Authenticate({ username, password }) {
    const userFound = await this.userModel.findOne({
      where: { username },
      attributes: ['username', 'password'],
      raw: true
    });
    if (userFound)
      if (bcrypt.compareSync(password, userFound.password))
        return true;

    return false;
  }

  async GenerateToken(user_id) {
    console.log('hello from token ');
  }
}

module.exports = { AuthService };
