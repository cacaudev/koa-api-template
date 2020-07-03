/*
 * @Author: cacaudev
 * @Date: 2020-06-30 20:34:03
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-30 21:02:20
 */
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const chalk = require("chalk");
const logger = require("../../src/utils/logger");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config.js")[env];

const db = {};
let sequelize;

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
      //console.log("Connection established successfully.");
      logger.info(
        chalk.greenBright(`\n-------\nDatabase:
          mode: [${chalk.magentaBright(`${env}`)}]
          ${chalk.black.bgGreenBright("Connection established successfully.")}\n-------`
        )
      );
    })
    .catch(err => {
      logger.error(
        chalk.greenBright(`\n-------\nDatabase:
        mode: [${chalk.bgRed(`${env}`)}]
        error: ${chalk.black.bgRedBright(`Unable to connect to database: ${err}`)}
        -------`
        )
      );
    });
} else
  console.log("Database url do not exist on db config file for the requested env mode.");

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".js");
  })
  .forEach(file => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;