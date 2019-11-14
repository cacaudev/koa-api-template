/*
 * Name: user.js
 * Description: Validator for user resource endpoints.
 * Author: Cacaudev
 * Date: 14/11/2019
*/

'use strict';

import validator, { Joi } from 'koa-context-validator';

export const User_Id_Validator = validator({
  params: Joi.object().keys({
    userId: Joi.number()
      .positive()
      .required()
  })
});
