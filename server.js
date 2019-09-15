/*
 * Name: server.js
 * Description: Main webserver configuration file.
 * Author: cacaudev
 * Date: 12/09/2019
*/
'use strict';

const koa = require('koa');
const app = new koa();

app.use(async ctx => {
  ctx.body = "Hello world!";
});

app.listen(3000);