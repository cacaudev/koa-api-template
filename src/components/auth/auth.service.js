'use strict';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../../db/models';
import config from '../../../config';

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
   *
   * @param {string} username
   * @param {string} password
   */
  async Authenticate({ username, password }) {
    const userFound = await this.userModel.findOne({
      where: { username },
      attributes: ['id', 'username', 'password'],
      raw: true
    });
    if (userFound)
      if (bcrypt.compareSync(password, userFound.password))
        return userFound.id;

    throw new Error();
  }

  async GenerateToken(user_id) {
    let token = {};
    try {
      token = jwt.sign({
        userId: user_id,
        type: 'default'
      }, config.auth.jwt_secret, {
        algorithm: 'HS256',
        expiresIn: '7d' // 7 days
      });
    } catch (error) {
      throw new Error();
    }
    return token;
  }
}

module.exports = { AuthService };
