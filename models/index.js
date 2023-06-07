const Sequelize = require('sequelize')
const sequelize = require('../db.js');

//db object is created to store the models and associations
const db = {};

//assign imported Sequelize and sequelize instances to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('../models/userModel');
db.Journal = require('../models/journalModel');
db.Entry =  require('../models/entryModel');
db.Theme = require('../models/themeModel.js');

// establishing the associations between the models
db.User.hasMany( db.Journal, { foreignKey: "user_id" });
db.Entry.belongsTo( db.Journal, { foreignKey: "journal_id" });
db.Journal.hasMany( db.Entry, { foreignKey: "journal_id" });
db.Theme.hasMany( db.Journal, { foreignKey: "theme_id" });

// synchronize your Sequelize models with the database
sequelize.sync({alter:true, force:false})

module.exports = db

