'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config.js')[env];
const db = {};

const loggingEnv = config.logging;
const operatorsAliasesEnv = config.operatorsAliases;
const dialectOptionsEnv = config.dialectOptions;

let sequelize;

if (config.url) {
  sequelize = new Sequelize(
    config.url,
    {
      logging: loggingEnv,
      operatorsAliases: operatorsAliasesEnv,
      dialectOptions: dialectOptionsEnv
    }
  );

  // Test connection to database
  sequelize
    .authenticate()
    .then(() => {
      console.log(`Connection to ${process.env.NODE_ENV} database has been established successfully.`);
    })
    .catch(err => {
      console.error(`Unable to connect to the ${process.env.NODE_ENV} database:`, err);
    });
} else
  console.error(`
    Database url do not exist on db config file for the requested env mode.
  `);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
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
