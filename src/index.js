/*
 * Name: app.js
 * Description: App entry point.
 * Author: cacaudev
 * Date: 12/09/2019
*/

'use strict';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname + '../../config/.env')
});

import App from './app';
import Logger from './loaders/logger';

const server_config = {
  port: process.env.PORT || 3000,
  env: process.env.NODE_ENV || 'development'
};

const app = new App();

app.on('error', err => {
  Logger.error(err);
});

const server = app.listen(server_config.port, () => {
  Logger.info(`
    Koa Server listening on port: ${server_config.port},
    in ${server_config.env} mode
   `);
});

server.on('error', err => {
  Logger.error(err);
});

module.exports = server;
