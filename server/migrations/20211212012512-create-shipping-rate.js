'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('shippingRates', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      fixedAmount: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      taxBehavior: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryEstimateMinUnit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryEstimateMin: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      deliveryEstimateMaxUnit: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryEstimateMax: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('shippingRates');
  }
};