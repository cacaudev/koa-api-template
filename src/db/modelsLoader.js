/*
 * @Author: cacaudev
 * @Date: 2020-07-03 16:11:11
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-07 11:17:40
 */
"use strict";
import Sequelize from "sequelize";
import dbConnection from "./connection";

const UserModel = require("./models/user.model");

const models = {
  //User: UserModel.init(dbConnection, Sequelize),
};

// Run `.associate` if it exists,
// and create relationships in the ORM
Object.values(models)
  .filter(model => typeof model.associate === "function")
  .forEach(model => model.associate(models));

const db = {
  ...models,
  dbConnection
};

module.exports = db;
