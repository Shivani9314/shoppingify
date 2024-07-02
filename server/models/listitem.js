"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ListItem extends Model {
    static associate(models) {
      // define association here
      ListItem.belongsTo(models.List, { foreignKey: "list_id" });
      ListItem.belongsTo(models.Item, { foreignKey: "item_id" });
    }
  }
  ListItem.init(
    
    {
      list_id: DataTypes.INTEGER,
      item_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ListItem",
    }
  );
  return ListItem;
};
