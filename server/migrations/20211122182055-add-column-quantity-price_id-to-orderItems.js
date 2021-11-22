'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('orderItems', 'quantity', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
    await queryInterface.addColumn('orderItems', 'price_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'prices',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('orderItems', 'quantity');
    await queryInterface.removeColumn('orderItems', 'price_id');
  }
};
