/*
 * Name: app.js
 * Description: Main app configuration file.
 * Author: cacaudev
 * Date: 12/09/2019
*/

const koa = require('koa');
const logger = require('koa-logger');

const app = new koa();

app
  .use(logger())
  .use(async ctx => {
    ctx.type = 'application/json';
    ctx.body = {
      status: "success",
      response: "Welcome to koa api template!"
    };
  });

module.exports = app;