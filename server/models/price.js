'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      price.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'price',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  price.init({
    amount: DataTypes.FLOAT,
    product_id: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    taxBehavior: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'price',
  });
  return price;
};