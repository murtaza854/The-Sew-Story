'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasMany(models.order, {
        as: 'orders',
        foreignKey: 'user_id',
      });
      user.hasMany(models.promotionCode, {
        as: 'promotionCodes',
        foreignKey: 'user_id'
      });
    }
  };
  user.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    uid: DataTypes.STRING,
    stripe_id: DataTypes.STRING,
    subscribed: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN,
    superuser: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};