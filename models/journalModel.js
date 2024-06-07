const Sequelize = require('sequelize')
const db = require('../db.js')

const Journal = db.define('journal', {
    journal_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'Untitled Journal'
    },
    theme_id: { type: Sequelize.INTEGER, allowNull: true }
})

module.exports = Journal