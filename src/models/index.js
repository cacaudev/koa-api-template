/*
 * @Author: cacaudev
 * @Date: 2020-07-03 16:11:11
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-08 09:24:05
 */
"use strict";
import Sequelize from "sequelize";
import dbConnection from "../loaders/dbConnection";

const UserModel = require("./user.model");

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
