/*
 * @Author: cacaudev
 * @Date: 2020-07-07 11:10:36
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-07 17:36:42
 */
"use strict";

import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcryptjs";

class AuthService {
  /**
   * @summary Create an AuthService Instance
   * @class
   */
  constructor() { }

  static generateAuthorization(token) {
    return {
      access_token: token,
      token_type: "Bearer",
      expires_in: "7 days"
    };
  }
  static generateUserToken(userId) {
    return jwt.sign({
      userId,
      type: "default"
    }, config.auth.jwt_secret, {
      algorithm: "HS256",
      expiresIn: "7d" // 7 days
    });
  }
  /**
   * @function
   * @param {Header} authHeader
   */
  getUserCredentials(authHeader) {
    const base64Credentials = authHeader.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
    const [username, password] = credentials.split(":");
    return { username, password };
  }

  /**
   * @function
   * @param {string} username
   * @param {string} password
   */
  async authenticate(authHeader) {
    const { username, password } = this.getUserCredentials(authHeader);


    const userFound = await this.model.findOne({
      where: { username },
      attributes: ["id", "username", "password"],
      raw: true
    });

    if (userFound)
      if (bcrypt.compareSync(password, userFound.password))
        return userFound.id;
  }
}

export default AuthService;
