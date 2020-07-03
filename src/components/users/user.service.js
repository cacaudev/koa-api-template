/*
 * @Author: cacaudev
 * @Date: 2020-07-03 17:13:21
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-03 17:13:57
 */
"use strict";

import * as _ from "lodash";
import bcrypt from "bcryptjs";
import { User } from "../../db/modelsLoader";
import {
  formatTimezone,
  encryptPassword
} from "../../utils";

class UserService {
  /**
   * @summary Create an AuthService Instance
   * @class
   * @property {Sequelize_Model} model
   * @returns {function} AuthService Instance
   *
   * @example
   * const auth_instance = new AuthService();
   */

  constructor() {
    this.model = User;
    this.dateFields = [
      "createdAt",
      "updatedAt"
    ];
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
   * let user_record = await userServiceInstance.Create(user_data);
   */
  async create(user_input) {
    let payload = user_input;
    delete payload.confirm_password;
    const encrypted_password = await encryptPassword(user_input.password);
    if (encrypted_password.error)
      return null;
    user_input.password = encrypted_password;
    return await this.model.create(user_input);
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
  async getById(id) {
    return await this.model.findByPk(id, { raw: true });
  }
  async list({ offset = 0, limit = 1000 }) {
    return await this.model.findAndCountAll({
      offset,
      limit,
      raw: true
    });
  }
  async updateById(id, user_input) {
    return await this.model.update(
      user_input,
      {
        returning: true, // Return the user record updated
        where: { id },
        raw: true
      }
    );
  }
  async deleteById(id) {
    return await this.model.destroy({ where: { id } });
  }
  async serialize(user_input) {
    if (user_input.password)
      user_input.password = undefined;

    let dates = _.pick(user_input, this.dateFields);
    for (var key in dates)
      user_input[key] = await formatTimezone(dates[key], user_input.timezone);

    return user_input;
  }
  /**
   *
   * @param {string} username
   * @param {string} password
   */
  async authenticate({ username, password }) {
    const userFound = await this.model.findOne({
      where: { username },
      attributes: ["id", "username", "password"],
      raw: true
    });
    if (userFound)
      if (bcrypt.compareSync(password, userFound.password))
        return userFound.id;

    throw new Error();
  }
}

module.exports = { UserService };
