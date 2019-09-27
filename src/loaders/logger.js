/*
 * Name: app.js
 * Description: Logger startup module.
 * Author: cacaudev
 * Date: 27/09/2019
*/
'use strict';

import winston from 'winston';

/**
 * Winston log types that can be used and
 * their priority level
 * [
    emerg,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
  ]
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
 */
Logger.stream = {
  write: function (message, encoding) {
    Logger.info(message);
  },
};

export default Logger;
