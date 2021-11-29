'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true
      },
      orderStatus: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      amountSubtotal: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      orderTotal: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      orderDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true,
          notEmpty: true
        }
      },
      contactNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      city_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      zipCode: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    await queryInterface.dropTable('orders');
  }
};