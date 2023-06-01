const Sequelize = require('sequelize');
const db = require('../db.js')

// Schema for theme model
const Theme = db.define('theme', {
  theme_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Theme;
