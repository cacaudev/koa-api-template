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
 * @summary Stream function is used by Morgan log module
 * to track http requests output
 * @member {function} Stream
 * @param {string} message - Message to log on console
 *
 * @example
 * morgan('tiny', { stream: Logger.stream })
 */
Logger.stream = {
  write: function (message) {
    Logger.info(message);
  },
};

export default Logger;
