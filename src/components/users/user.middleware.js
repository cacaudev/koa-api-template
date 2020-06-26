/*
 * Name: user.js
 * Description: Validator for user resource endpoints.
 * Author: Cacaudev
 * Date: 14/11/2019
*/
"use strict";

import validator, { Joi } from "koa-context-validator";

const paramsSchema = Joi.object().keys({
  params: Joi.object().keys({
    userId: Joi.string()
      .length(36)
  })
});

const bodySchema = Joi.object().keys({
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
    .optional()
});

const credentialsSchema = Joi.object().keys({
  username: Joi.string()
    .min(4)
    .max(32),
  password: Joi.string()
    .min(4)
    .max(32),
  confirm_password: Joi.string()
    .valid(
      Joi.ref("password")
    ),
  email: Joi.string()
    .email()
}).options({ presence: "required" });

const hasParams = validator({
  params: paramsSchema.options({ presence: "required" })
});

const hasCreateBody = validator({
  body: bodySchema.options({ presence: "required" })
});

const hasUpdateBody = validator({
  body: bodySchema
});

const hasCredentials = validator({
  body: credentialsSchema
});

export {
  hasParams,
  hasCredentials,
  hasCreateBody,
  hasUpdateBody
};
