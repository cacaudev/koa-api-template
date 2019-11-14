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

export const User_Schema_Create_Validator = validator({
  body: Joi.object().keys({
    name: Joi.string()
      .min(4)
      .max(32)
      .required(),
    surname: Joi.string()
      .min(4)
      .max(32)
      .required(),
    age: Joi.number()
      .positive()
      .required()
  })
});

export const User_Schema_Update_Validator = validator({
  body: Joi.object().keys({
    name: Joi.string()
      .min(4)
      .max(32),
    surname: Joi.string()
      .min(4)
      .max(32),
    age: Joi.number()
      .positive()
  })
});
