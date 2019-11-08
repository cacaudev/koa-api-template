/*
 * Description: Format request response.
 * Author: Cacaudev
 * Date: 08/11/2019
*/
'use strict';

const format_response = (ctx, status, content) => {
  const request_success = status < 400 ?
    'true' : 'false';

  ctx.status = status;
  ctx.type = 'application/json';
  ctx.body = {
    success: request_success,
    response: content
  };
  return;
};

module.exports = { format_response };
