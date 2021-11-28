'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('promotionCodes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      coupon_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'coupons',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
          onDelete: 'CASCADE',
          onUpdate: 'CASCADE'
        }
      },
      expiresAt: {
        type: Sequelize.DATE
      },
      maxRedemptions: {
        type: Sequelize.INTEGER
      },
      firstTimeTransaction: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      minAmount: {
        type: Sequelize.FLOAT
      },
      timesRedeeemed: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
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
    await queryInterface.dropTable('promotionCodes');
  }
};