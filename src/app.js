/*
 * Name: app.js
 * Description: App entry point.
 * Author: cacaudev
 * Date: 12/09/2019
*/

'use strict';

import koa from 'koa';
import morgan from 'koa-morgan';
import Logger from './loaders/logger';

const server_config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
};

async function startServer() {
  const app = new koa();

  app
    .use(morgan('tiny', { stream: Logger.stream }))
    .use(async ctx => {
      ctx.type = 'application/json';
      ctx.body = {
        status: "success",
        response: "Welcome to koa api template!"
      };
    });

  app.listen(server_config.port, err => {
    if (err)
      Logger.error(err);
    else
      Logger.info(`
      ##########################################
       Koa Server listening on port: ${server_config.port},
       in ${server_config.env} mode
      ##########################################
    `);
  });
}

startServer();
