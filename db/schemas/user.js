/*
 * @Author: cacaudev
 * @Date: 2020-06-30 20:50:36
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-30 20:55:29
 */
"use strict";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: sequelize.UUIDV4
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    phone: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
    avatar: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ["DEFAULT", "ADMIN"],
      defaultValue: "DEFAULT"
    },
    login_type: {
      type: DataTypes.ENUM,
      values: ["EMAIL", "GOOGLE", "FACEBOOK"]
    },
    timezone: DataTypes.STRING
  }, {});
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};
