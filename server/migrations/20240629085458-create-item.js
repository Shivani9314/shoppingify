"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    static associate(models) {
      // define association here
      Item.belongsTo(models.Category, { foreignKey: "category_id" });
      Item.belongsToMany(models.List, {
        through: models.ListItem,
        foreignKey: "item_id",
      });
    }
  }
  Item.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      note: {
        type: DataTypes.TEXT
      },
      image_url: {
        type: DataTypes.STRING
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Categories',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    },
    {
      sequelize,
      modelName: "Item",
    }
  );
  return Item;
};

