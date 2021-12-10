'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class productCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      productCoupon.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      productCoupon.belongsTo(models.coupon, {
        foreignKey: 'coupon_id',
        as: 'coupon',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  productCoupon.init({
    product_id: DataTypes.STRING,
    coupon_id: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'productCoupon',
  });
  return productCoupon;
};