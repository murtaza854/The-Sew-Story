'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orderCoupons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'orders',
          key: 'id'
        }
      },
      coupon_id: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'coupons',
          key: 'id'
        }
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
    await queryInterface.dropTable('orderCoupons');
  }
};