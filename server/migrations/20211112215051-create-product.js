'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      slug: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      productCode: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      story: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      storyImageFileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      storyWrittenBy: {
        allowNull: false,
        type: Sequelize.STRING
      },
      storyImagePath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.FLOAT,
        defaultValue: 0,
        validate: {
          min: 0
        },
      },
      quantity: {
        allowNull: false,
        type: Sequelize.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0
        },
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      category_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'categories',
          key: 'id',
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
    await queryInterface.dropTable('products');
  }
};