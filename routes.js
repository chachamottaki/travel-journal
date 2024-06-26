//Get an instance of the express router and set routes
let express = require('express');
let router = express.Router();


//import controllers
let userController = require('./controllers/userController');
let entryController = require('./controllers/entryController');
let journalController = require('./controllers/journalController');

//user crud + login
router.post('/login', userController.login);  
router.post('/user', userController.addUser);
router.get('/user/:user_id', userController.getUser);
router.put('/user/:user_id', userController.updateUser);
router.delete('/user/:user_id', userController.deleteUser);

//entry crud
router.post('/journal/:journal_id/entry', entryController.addEntry);
router.get('/journal/:journal_id/entry/date/:date_id', entryController.listEntryByDate);
router.get('/journal/:journal_id/entry/location/:location_id', entryController.listEntryByLocation);
router.put('/journal/:journal_id/entry/:entry_id', entryController.updateEntry);
router.delete('/journal/:journal_id/entry/:entry_id', entryController.deleteEntry);

//journal
router.post('/user/:user_id/journal', journalController.addJournal)
router.get('/user/:user_id/journals', journalController.listJournalsByUser);
router.get('/journal/:journal_id', journalController.getJournal);
router.post('/journal/:journal_id/theme', journalController.addTheme);
router.put('/journal/:journal_id', journalController.updateJournal);

module.exports = router;
