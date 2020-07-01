/*
 * @Author: cacaudev
 * @Date: 2020-06-30 20:37:24
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-30 20:57:58
 */

const path = require("path");
const dotenv = require("dotenv");

dotenv.config({
  path: path.resolve(__dirname + "../../config/.env")
});

module.exports = {
  "development": {
    "url": process.env.DEVELOPMENT_DATABASE_URL,
    "logging": true,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": false
    }
  },
  "test": {
    "url": process.env.TEST_DATABASE_URL,
    "logging": false,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  },
  "stage": {
    "url": process.env.STAGE_DATABASE_URL,
    "logging": false,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  },
  "production": {
    "url": process.env.PRODUCTION_DATABASE_URL,
    "logging": false,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  }
};
