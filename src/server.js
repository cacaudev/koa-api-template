/*
 * Name: server.js
 * Description: Main webserver configuration file.
 * Author: cacaudev
 * Date: 12/09/2019
*/

'use strict';

const app = require('./app')

const server_config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
};

const server = app.listen(server_config.port, () => {
  console.log(`Koa api server listening on ${server_config.port}, in ${server_config.env} mode`);
});

module.exports = server;

