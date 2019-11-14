/*
 * Name: auth.validator.js
 * Description: Validator for auth resource endpoints.
 * Author: Cacaudev
 * Date: 08/10/2019
*/

'use strict';

import validator, { Joi } from 'koa-context-validator';

export const Authorization_Header_Validator = validator({
  headers: Joi.object({
    'authorization': Joi.string()
      .max(128)
      .required(),
  }).options({
    // ! This option enables inclusion from other
    // ! types of headers, but validates only the ones above
    allowUnknown: true
  }),
});
