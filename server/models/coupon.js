'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      coupon.hasMany(models.order, {
        foreignKey: 'coupon_id',
        as: 'orders',
      });
      coupon.hasMany(models.promotionCode, {
        foreignKey: 'coupon_id',
        as: 'promotionCodes',
      });
      coupon.hasMany(models.productCoupon, {
        foreignKey: 'coupon_id',
        as: 'productCoupons',
      });
    }
  };
  coupon.init({
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    amountOff: DataTypes.INTEGER,
    percentOff: DataTypes.FLOAT,
    redeemBy: DataTypes.DATE,
    maxRedemptions: DataTypes.INTEGER,
    appliedToProducts: DataTypes.BOOLEAN,
    hasPromotionCodes: DataTypes.BOOLEAN,
    timesRedeeemed: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'coupon',
  });
  return coupon;
};