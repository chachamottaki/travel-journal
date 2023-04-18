const Sequelize = require('sequelize')
const db = require('../db.js')

const Entry = db.define('entry', {
    entry_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: { type: Sequelize.DATE, allowNull: false },
    location: { type: Sequelize.STRING, allowNull: false },
    journal_id: { type: Sequelize.INTEGER, allowNull: false}
})

module.exports = Entry