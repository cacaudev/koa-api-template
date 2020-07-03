/*
 * @Author: cacaudev
 * @Date: 2020-07-03 17:13:21
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-03 19:04:38
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
   * @param {Object} userInput
   * @param {String} userInput.name - User name
   * @param {String} userInput.surname - User surname
   * @param {Number} userInput.age - User age
   * @returns {Record} User Instance
   *
   * @example
   * let user_record = await userServiceInstance.Create(user_data);
   */
  async create(userInput) {
    const encryptedPassword = await encryptPassword(userInput.password);
    if (encryptedPassword.error)
      return null;
    userInput.password = encryptedPassword;
    return await this.model.create(_.omit(userInput, ["confirm_password"]));
  }
  /**
   * @desc Read user
   * @method
   * @param {Object} userInput
   * @param {Object} userInput.name - User name
   * @param {Object} userInput.surname - User surname
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
  async updateById(id, userInput) {
    return await this.model.update(
      userInput,
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
  async serialize(userInput) {
    if (userInput.password)
      userInput.password = undefined;

    let dates = _.pick(userInput, this.dateFields);
    for (var key in dates)
      userInput[key] = await formatTimezone(dates[key], userInput.timezone);

    return userInput;
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
