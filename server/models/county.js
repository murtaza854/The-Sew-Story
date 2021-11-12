'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class county extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      county.belongsTo(models.state, {
        foreignKey: 'state_id',
        as: 'state',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      county.hasMany(models.city, {
        as: 'cities',
      });
    }
  };
  county.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    state_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'county',
  });
  return county;
};