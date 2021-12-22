'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class shippingRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      shippingRate.hasMany(models.order, {
        foreignKey: 'shippingRateId',
        as: 'orders'
      });
    }
  };
  shippingRate.init({
    active: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    fixedAmount: DataTypes.FLOAT,
    taxBehavior: DataTypes.STRING,
    deliveryEstimateMinUnit: DataTypes.STRING,
    deliveryEstimateMin: DataTypes.INTEGER,
    deliveryEstimateMaxUnit: DataTypes.STRING,
    deliveryEstimateMax: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'shippingRate',
  });
  return shippingRate;
};