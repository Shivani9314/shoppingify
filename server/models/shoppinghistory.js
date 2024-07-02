'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ShoppingHistory extends Model {
    static associate(models) {
      ShoppingHistory.belongsTo(models.User, { foreignKey: 'user_id' });
      ShoppingHistory.belongsTo(models.List, { foreignKey: 'list_id' });
    }
  }
  ShoppingHistory.init({
    
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    list_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Lists',
        key: 'id',
      },
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'ShoppingHistory',
  });
  return ShoppingHistory;
};
