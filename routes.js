//Get an instance of the express router and set routes
let express = require('express');
let router = express.Router();

//import controllers
let userController = require('./controllers/userController');
let entryController = require('./controllers/entryController');

//user crud
router.post('/user', userController.addUser);
router.get('/user/:user_id', userController.getUser);
router.put('/user/:user_id', userController.updateUser);
router.delete('/user/:user_id', userController.deleteUser);

//entry crud
router.post('/journal/:journal_id/entry', entryController.addEntry);
// router.get('/journal/:journal_id/entry', entryController.addEntry);
//router.put('/journal/:journal_id/entry/:entry_id', entryController.updateEntry);
router.delete('/journal/:journal_id/entry/:entry_id', entryController.deleteEntry);

module.exports = router;