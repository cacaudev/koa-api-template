/*
 * Name: app.js
 * Description: Logger startup module.
 * Author: cacaudev
 * Date: 27/09/2019
*/
'use strict';

import winston from 'winston';

/**
 * Instantiate an Winston Logger.
 * @module Logger
 */
var Logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ],
  exitOnError: false,
});

/**
 * Stream function is used by Morgan log module
 * to track http requests output
 * @alias module:Logger.stream
 * @param {string} message - Message to log on console
 */
Logger.stream = {
  write: function (message) {
    Logger.info(message);
  },
};

export default Logger;
