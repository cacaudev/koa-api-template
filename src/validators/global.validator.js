/*
 * Name: user.js
 * Description: Validator that can be used for some endpoints.
 * Author: Cacaudev
 * Date: 19/11/2019
*/

'use strict';

import validator, { Joi } from 'koa-context-validator';

export const Paginate_Params = validator({
  query: Joi.object().keys({
    page: Joi.number()
      .positive(),
    limit_by_page: Joi.number()
      .positive(),
  })
});
