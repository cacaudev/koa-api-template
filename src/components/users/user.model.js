import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    const userSchema = {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: sequelize.UUIDV4
      },
      username: Sequelize.STRING,
      password: Sequelize.STRING,
      email: Sequelize.STRING,
      name: Sequelize.STRING,
      surname: Sequelize.STRING,
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
        values: ["EMAIL", "GOOGLE", "FACEBOOK"]
      },
      timezone: {
        type: Sequelize.STRING,
        defaultValue: "America/Sao_Paulo"
      }
    };
    const options = {
      tableName: "user",
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    };
    return super.init(userSchema, {
      ...options,
      sequelize
    });
  }

  static associate(models) { }

  static getId(where) {
    return this.findOne({
      where,
      attributes: ["id"],
      order: [["createdAt", "DESC"]]
    });
  }

  getFullName() {
    return `${this.name} ${this.surname}`;
  }
}

module.exports = User;
