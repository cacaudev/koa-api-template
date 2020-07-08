/*
 * @Author: cacaudev
 * @Date: 2020-07-03 17:13:21
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-08 09:30:50
 */
"use strict";

import * as _ from "lodash";
import { User } from "../models";
import { DateFormatter } from "../utils";
import Service from "./service";

class UserService extends Service {
  /**
   * @class
   */
  constructor(model) {
    super(model);
    this.model = User;
    this.dateFields = [
      "created_at",
      "updated_at"
    ];
  }

  /**
   * @fuction
   * @param {*} userInput
   */
  async serialize(userInput = {}) {
    const { password, timezone } = userInput;
    if (password)
      userInput.password = undefined;
    let dates = _.pick(userInput, this.dateFields);
    for (var field in dates)
      userInput[field] = new DateFormatter(dates[field], timezone).formatDate();

    return userInput;
  }
}

export { UserService };
