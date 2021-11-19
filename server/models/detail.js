'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      detail.belongsTo(models.product, {
        foreignKey: 'product_id',
        as: 'product',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      detail.belongsTo(models.type, {
        foreignKey: 'type_id',
        as: 'type',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  };
  detail.init({
    label: DataTypes.STRING,
    text: DataTypes.STRING,
    type_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};