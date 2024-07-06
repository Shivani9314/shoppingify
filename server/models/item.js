"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      Item.belongsTo(models.Category, { foreignKey: "category_id" });
      Item.belongsToMany(models.List, {
        through: models.ListItem,
        foreignKey: "item_id",
        as: "lists",
      });
    }
  }

  Item.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      note: { type: DataTypes.TEXT },
      image_url: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Item",
    }
  );

  return Item;
};
