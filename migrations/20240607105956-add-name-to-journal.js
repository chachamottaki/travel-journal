'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('journals', 'name', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'Untitled Journal'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('journals', 'name');
  }
};