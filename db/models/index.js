/* eslint-disable max-len */
/* eslint-disable indent */
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const chalk = require('chalk');
const Logger = require('../../src/loaders/logger');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/db.config.js')[env];
const db = {};

let SequelizeMock = require('sequelize-mock');
var DBConnectionMock = new SequelizeMock();

let sequelize;

/**
 * In case of env tests we use the sequelize mock
 * lib to simulate a db connection
 */

if (env !== 'test') {

  if (config.url) {
    // Establish connection
    sequelize = new Sequelize(
      config.url,
      {
        logging: config.logging,
        dialectOptions: config.dialectOptions
      }
    );

    // Test connection to database
    sequelize
      .authenticate()
      .then(() => {
        if (env == 'development' || env == 'stage') {
          Logger.info(
            chalk.greenBright(`\n-------\nDatabase:
          mode: [${chalk.magentaBright(`${env}`)}]
          ${chalk.black.bgGreenBright('Connection established successfully.')}\n-------`
            )
          );
        }
      })
      .catch(err => {
        Logger.error(
          chalk.greenBright(`\n-------\nDatabase:
        mode: [${chalk.bgRed(`${env}`)}]
        error: ${chalk.black.bgRedBright(`Unable to connect to database: ${err}`)}
        -------`
          )
        );
      });
  } else
    Logger.error(`
    ${chalk.black.bgRedBright(
      'Database url do not exist on db config file for the requested env mode.'
    )}`);
}

if (env == 'development' || env == 'production' || env == 'stage') {

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && (file.slice(-8) !== '.mock.js');
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(__dirname, file));
      db[model.name] = model;
    });

} else {

  fs
    .readdirSync(__dirname)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-8) === '.mock.js');
    })
    .forEach(file => {
      let model = require(path.join(__dirname, file))(DBConnectionMock);
      db[model.name] = model;
    });
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

if (env == 'development' || env == 'production' || env == 'stage') {
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
}

module.exports = db;
