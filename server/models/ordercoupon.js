'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      orderCoupon.belongsTo(models.order, {
        foreignKey: 'order_id',
        as: 'order',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      orderCoupon.belongsTo(models.coupon, {
        foreignKey: 'coupon_id',
        as: 'coupon',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  orderCoupon.init({
    order_id: DataTypes.STRING,
    coupon_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'orderCoupon',
  });
  return orderCoupon;
};