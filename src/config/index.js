/*
 * Name: app.js
 * Description: Env variables configuration file.
 * Author: Cacaudev
 * Date: 07/10/2019
 */

'use strict';

import path from 'path';
import dotenv from 'dotenv';

dotenv.config({
  path: path.resolve(__dirname + '/.env'),
});

/**
 * App node environment.
 * @static
 * @type {string}
 */
const env = process.env.NODE_ENV || 'development';

/**
 * @type {Object}
 * @property {string} port - App port. Default is 3000.
 * @property {string} env - App env. Default is development.
 */
const app_config = {
  base: {
    env,
    port: process.env.PORT || 3000,
    api: {
      prefix: '/v1',
    },
    auth: {
      bcrypt_cost: process.env.BCRYPT_COST,
      jwt_secret: process.env.JWT_SECRET,
    },
    date_format_default: 'YYYY/MM/DD HH:MM:SS',
  },
  development: {
    port: process.env.PORT || 8080,
  },
  test: {
    port: process.env.PORT || 5000,
  },
};

const config = Object.assign(app_config.base, app_config[env]);

module.exports = config;
