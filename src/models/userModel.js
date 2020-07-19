import Sequelize, { Model } from 'sequelize';

class User extends Model {
  static init(sequelize) {
    const userSchema = {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      username: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING(128),
      },
      password: Sequelize.STRING(288),
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
      },
      name: Sequelize.STRING(128),
      surname: Sequelize.STRING(128),
      phone: Sequelize.STRING(64),
      birthdate: Sequelize.DATEONLY,
      avatar: Sequelize.STRING(128),
      type: {
        type: Sequelize.ENUM,
        values: ['DEFAULT', 'ADMIN'],
        defaultValue: 'DEFAULT',
      },
      login_type: {
        type: Sequelize.ENUM,
        values: ['EMAIL', 'GOOGLE', 'FACEBOOK'],
        defaultValue: 'EMAIL',
      },
      timezone: {
        type: Sequelize.STRING,
        defaultValue: 'America/Sao_Paulo',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW(),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW(),
      },
    };
    const options = {
      tableName: 'user',
      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,
      createdAt: false,
      updatedAt: false,
    };
    return super.init(userSchema, {
      ...options,
      sequelize,
    });
  }
  // static associate(models) {}
  // static queries for model
  static getId(where) {
    return this.findOne({
      where,
      attributes: ['id'],
      order: [['createdAt', 'DESC']],
    });
  }
}

module.exports = User;
