/*
 * Name: user.js
 * Description: Validator for user resource endpoints.
 * Author: Cacaudev
 * Date: 14/11/2019
*/

'use strict';

import validator, { Joi } from 'koa-context-validator';

export const Id_Validator = validator({
  params: Joi.object().keys({
    userId: Joi.string()
      .length(36)
      .required()
  })
});

export const Create_Validator = validator({
  body: Joi.object().keys({
    username: Joi.string()
      .min(4)
      .max(32)
      .required(),
    password: Joi.string()
      .min(4)
      .max(32)
      .required(),
    confirm_password: Joi.string()
      .valid(Joi.ref('password'))
      .required(),
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

export const Update_Validator = validator({
  body: Joi.object().keys({
    name: Joi.string()
      .min(4)
      .max(32),
    surname: Joi.string()
      .min(4)
      .max(32),
    age: Joi.number()
      .positive(),
    timezone: Joi.string()
      .min(4)
      .max(36)
  })
});
