'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class promotionCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      promotionCode.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      promotionCode.belongsTo(models.coupon, {
        foreignKey: 'coupon_id',
        as: 'coupon',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  promotionCode.init({
    code: DataTypes.STRING,
    coupon_id: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    expiresAt: DataTypes.DATE,
    maxRedemptions: DataTypes.INTEGER,
    firstTimeTransaction: DataTypes.BOOLEAN,
    minAmount: DataTypes.FLOAT,
    timesRedeeemed: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'promotionCode',
  });
  return promotionCode;
};