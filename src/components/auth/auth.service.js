"use strict";


import jwt from "jsonwebtoken";
import config from "../../../config";

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

  constructor() { }

  async generateToken(user_id) {
    let token = {};
    try {
      token = jwt.sign({
        userId: user_id,
        type: "default"
      }, config.auth.jwt_secret, {
        algorithm: "HS256",
        expiresIn: "7d" // 7 days
      });
    } catch (error) {
      throw new Error();
    }
    return token;
  }
}

module.exports = { AuthService };
