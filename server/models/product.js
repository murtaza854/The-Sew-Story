'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.category, {
        foreignKey: 'category_id',
        as: 'category',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      product.hasMany(models.image, {
        foreignKey: 'product_id',
        as: 'images',
      });
      product.hasMany(models.detail, {
        foreignKey: 'product_id',
        as: 'details',
      });
      product.hasMany(models.orderItem, {
        as: 'orderItems',
        foreignKey: 'product_id',
      });
    }
  };
  product.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    productCode: DataTypes.STRING,
    story: DataTypes.TEXT,
    storyImageFileName: DataTypes.STRING,
    storyImagePath: DataTypes.STRING,
    price: DataTypes.FLOAT,
    quantity: DataTypes.INTEGER,
    active: DataTypes.BOOLEAN,
    category_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};