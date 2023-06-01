const Sequelize = require('sequelize')
const db = require('../db.js')

const Journal = db.define('journal', {
    journal_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    theme_id: { type: Sequelize.INTEGER, allowNull: false }
})

module.exports = Journal