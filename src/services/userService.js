/*
 * @Author: cacaudev
 * @Date: 2020-07-03 17:13:21
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-19 18:48:21
 */
'use strict';

// import * as _ from 'lodash';
import { User } from '../models';
// import { DateFormatter } from '../common';
import Service from './service';

class UserService extends Service {
  /**
   * @class
   */
  constructor() {
    super();
    this.model = User;
  }

  /**
   * @method
   * @param {*} userInput
   */
  serialize(userInput = {}) {
    const { password } = userInput;
    if (password) userInput.password = undefined;
    /*let dates = _.pick(userInput, this.dateFields);
    for (var field in dates)
      userInput[field] = new DateFormatter(dates[field], timezone).formatDate();
*/
    return userInput;
  }
}

export { UserService };
