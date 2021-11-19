'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class city extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      city.belongsTo(models.state, {
        foreignKey: 'state_id',
        as: 'state',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      city.hasMany(models.order, {
        as: 'orders',
      });
    }
  };
  city.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    city_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'city',
  });
  return city;
};