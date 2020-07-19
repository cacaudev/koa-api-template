/*
 * @Author: cacaudev
 * @Date: 2020-07-03 16:03:07
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-19 18:45:55
 */
'use strict';
import Sequelize from 'sequelize';
// import chalk from 'chalk';
// import logger from "../../common/logger";

const env = process.env.NODE_ENV || 'development';
const config = require('../config/db.js')[env];
const { url, logging, dialectOptions } = config;

let sequelize;

if (url) {
  // Establish connection
  sequelize = new Sequelize(url, { logging, dialectOptions });
  // Test connection to database
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection established successfully.');
      /*logger.info(
        chalk.greenBright(`\n-------\nDatabase:
          mode: [${chalk.magentaBright(`${env}`)}]
          ${chalk.black.bgGreenBright("Connection established successfully.")}\n-------`
        )
      );*/
    })
    .catch((err) => {
      console.log(`Unable to connect to database: ${err}`);
      /*logger.error(
        chalk.greenBright(`\n-------\nDatabase:
        mode: [${chalk.bgRed(`${env}`)}]
        error: ${chalk.black.bgRedBright(`Unable to connect to database: ${err}`)}
        -------`
        )
      );*/
    });
} else
  console.log(
    'Database url do not exist on db config file for the requested env mode.'
  );

let dbConnection = sequelize;
module.exports = dbConnection;
