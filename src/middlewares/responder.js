/*
 * Description: Format request response.
 * Author: Cacaudev
 * Date: 08/11/2019
*/
"use strict";

const responder = (ctx, status, content = null) => {
  ctx.status = status;
  ctx.type = "application/json";
  ctx.body = content;
  return;
};

export { responder };
