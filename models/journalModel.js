const Sequelize = require('sequelize')
const db = require('../db.js')

const Journal = db.define('journal', {
    journal_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    theme_id: { type: Sequelize.INTEGER, allowNull: false },
    user_id:{ type: Sequelize.INTEGER, allowNull: false } //temp until we introduce tokens
})

module.exports = Journal