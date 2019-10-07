'use strict';

import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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
  },
  development: {
    port: process.env.PORT || 8080,
  },
  test: {
    port: process.env.PORT || 5000,
  }
};

const config = Object.assign(app_config.base, app_config[env]);

module.exports = config;
