'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('categories', {
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
        unique: true,
      },
      fileName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      imagePath: {
        allowNull: false,
        type: Sequelize.STRING
      },
      comingSoon: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      comingSoon: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      homePage: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      ourStoryPage: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      active: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
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
    await queryInterface.dropTable('categories');
  }
};