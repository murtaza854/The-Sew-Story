'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      order.belongsTo(models.city, {
        foreignKey: 'city_id',
        as: 'city',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      order.belongsTo(models.shippingRate, {
        foreignKey: 'shippingRateId',
        as: 'shippingRate',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      order.hasMany(models.orderItem, {
        as: 'orderItems',
        foreignKey: 'order_id',
      });
      order.hasMany(models.orderCoupon, {
        as: 'orderCoupons',
        foreignKey: 'order_id',
      });
      // order.belongsTo(models.coupon, {
      //   foreignKey: 'coupon_id',
      //   as: 'coupon',
      //   onDelete: 'CASCADE',
      //   onUpdate: 'CASCADE'
      // });
    }
  };
  order.init({
    orderStatus: DataTypes.STRING,
    orderDate: DataTypes.DATE,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    contactNumber: DataTypes.STRING,
    addressLine1: DataTypes.STRING,
    addressLine2: DataTypes.STRING,
    city_id: DataTypes.INTEGER,
    zipCode: DataTypes.STRING,
    amountSubtotal: DataTypes.FLOAT,
    orderTotal: DataTypes.FLOAT,
    user_id: DataTypes.INTEGER,
    stripe_sessionID: DataTypes.STRING,
    shippingRateId: DataTypes.STRING,
    // coupon_id: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};