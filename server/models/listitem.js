"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ListItem extends Model {
    static associate(models) {
      ListItem.belongsTo(models.List, { foreignKey: "list_id" });
      ListItem.belongsTo(models.Item, { foreignKey: "item_id" });
    }
  }

  ListItem.init(
    {
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "List",
          key: "id",
        },
      },
      item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Item",
          key: "id",
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ListItem",
    }
  );

  return ListItem;
};
