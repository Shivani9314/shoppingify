"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate(models) {
      List.belongsTo(models.User, { foreignKey: "user_id" });
      List.belongsToMany(models.Item, {
        through: models.ListItem,
        foreignKey: "list_id",
        as: "items",
      });
      List.hasMany(models.ShoppingHistory, { foreignKey: "list_id" });
    }
  }

  List.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Users",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "List",
    }
  );

  return List;
};
