/*
 * @Author: cacaudev
 * @Date: 2020-06-30 20:50:28
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-03 18:45:59
 */
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    const userSchema = {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128)
      },
      password: Sequelize.STRING(288),
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true
      },
      name: Sequelize.STRING(128),
      surname: Sequelize.STRING(128),
      phone: Sequelize.STRING,
      birthdate: Sequelize.DATEONLY,
      avatar: Sequelize.STRING,
      type: {
        type: Sequelize.ENUM,
        values: ["DEFAULT", "ADMIN"],
        defaultValue: "DEFAULT"
      },
      login_type: {
        type: Sequelize.ENUM,
        values: ["EMAIL", "GOOGLE", "FACEBOOK"],
        defaultValue: "EMAIL"
      },
      timezone: {
        type: Sequelize.STRING,
        defaultValue: "America/Sao_Paulo"
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    };
    return queryInterface.createTable("user", userSchema);
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("user");
  }
};
