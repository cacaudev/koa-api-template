/*
 * @Author: cacaudev
 * @Date: 2020-06-30 20:50:28
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-30 20:55:30
 */
"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("user", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      surname: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      birthdate: {
        type: Sequelize.DATEONLY
      },
      timezone: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
      login_type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable("user");
  }
};
