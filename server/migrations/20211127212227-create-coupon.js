'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('coupons', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amountOff: {
        type: Sequelize.INTEGER
      },
      percentOff: {
        type: Sequelize.FLOAT
      },
      redeemBy: {
        type: Sequelize.DATE
      },
      maxRedemptions: {
        type: Sequelize.INTEGER
      },
      appliedToProducts: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      hasPromotionCodes: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      timesRedeeemed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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
    await queryInterface.dropTable('coupons');
  }
};