'use strict';

import * as _ from 'lodash';
import randtoken from 'rand-token';
import { User } from '../../../db/models';
import {
  FormatTimezone,
  encryptPassword
} from '../../global/utils';

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
  async Create(user_input) {
    const id = randtoken.generator().generate(36);
    user_input.timezone = 'America/Sao_Paulo';
    const encrypted_password = await encryptPassword(user_input.password);

    if (encrypted_password.error)
      return null;

    user_input.password = encrypted_password;
    return await this.userModel.create({ id, ...user_input });
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
    return await this.userModel.findByPk(id, { raw: true });
  }

  async List({ offset = 0, limit = 1000 }) {
    return await this.userModel.findAndCountAll({
      offset,
      limit,
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
    return await this.userModel.destroy({ where: { id } });
  }

  async Serialize(user_input) {
    if (user_input.password)
      user_input.password = undefined;

    let dates = _.pick(user_input, this.dateFields);
    for (var key in dates)
      user_input[key] = await FormatTimezone(dates[key], user_input.timezone);

    return user_input;
  }
}

module.exports = { UserService };
