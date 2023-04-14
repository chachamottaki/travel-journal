//Get an instance of the express router and set routes
let express = require('express');
let userControllerApi = require('./controllers/userControllerApi');
let router = express.Router();

/********* API *********/

//add user
router.get('/api/user', userControllerApi.userAdd);

module.exports = router;