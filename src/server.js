/*
 * Name: app.js
 * Description: App entry point.
 * Author: cacaudev
 * Date: 12/09/2019
 */

'use strict';

import chalk from 'chalk';
import config from './config';
import App from './app';
import logger from './loaders/logger';

const app = new App();

app.on('error', (err) => {
  logger.error(err);
});

const server = app.listen(config.port, () => {
  // Server Info
  logger.info(`\n-------\nServer:
    mode: [${chalk.magentaBright(`${config.env}`)}]
    url: ${chalk.blueBright(`http://localhost:${config.port}`)}
   Koa API is ready!\n-------`);
});

server.on('error', (err) => {
  logger.error(
    chalk.redBright(`\n-------
    Error starting Koa Server:
    Code: [${chalk.magentaBright(`${err.code}`)}]
    Port: [${chalk.magentaBright(`${config.port}`)}]
    Server shutting down.}\n-------
    `)
  );
});

module.exports = server;
