/*
 * Name: user.js
 * Description: Validator for user resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import validator, { Joi } from 'koa-context-validator';

export const SignUp_Validator = validator({
  body: Joi.object().keys({
    name: Joi.string()
      .min(4)
      .max(32)
      .required(),
    surname: Joi.string()
      .min(4)
      .max(32)
      .required()
  })
});
