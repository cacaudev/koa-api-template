/*
 * @Author: cacaudev
 * @Date: 2020-06-26 16:19:32
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-26 16:29:39
 */

"use strict";

import validator, { Joi } from "koa-context-validator";

const hasPaginationParams = validator({
  query: Joi.object().keys({
    page: Joi.number()
      .positive(),
    limit_by_page: Joi.number()
      .positive()
  })
});

const hasAuthorizationHeaders = validator({
  headers: Joi.object({
    "authorization": Joi.string()
      .max(128)
      .required(),
  }).options({
    // ! This option enables inclusion from other
    // ! types of headers, but validates only the ones above
    allowUnknown: true
  }),
});

export {
  hasPaginationParams,
  hasAuthorizationHeaders
};
