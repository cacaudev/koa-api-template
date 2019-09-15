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
  ctx.body = "Hello world!";
  });

module.exports = app;