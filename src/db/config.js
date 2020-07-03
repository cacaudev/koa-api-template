/*
 * @Author: cacaudev
 * @Date: 2020-06-30 20:37:24
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-03 16:29:36
 */

import path from "path";
import dotenv from "dotenv";

dotenv.config({
  path: path.resolve(__dirname + "../../../config/.env")
});

const {
  DEVELOPMENT_DATABASE_URL,
  TEST_DATABASE_URL,
  STAGE_DATABASE_URL,
  PRODUCTION_DATABASE_URL
} = process.env;

module.exports = {
  "development": {
    "url": DEVELOPMENT_DATABASE_URL,
    "logging": true,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": false
    }
  },
  "test": {
    "url": TEST_DATABASE_URL,
    "logging": false,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  },
  "stage": {
    "url": STAGE_DATABASE_URL,
    "logging": false,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  },
  "production": {
    "url": PRODUCTION_DATABASE_URL,
    "logging": false,
    "dialect": "postgres",
    "dialectOptions": {
      "ssl": true
    }
  }
};
