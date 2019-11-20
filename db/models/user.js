'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true // Disable sequelize 'id' default column
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
