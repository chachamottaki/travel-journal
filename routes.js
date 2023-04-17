//Get an instance of the express router and set routes
let express = require('express');
let router = express.Router();

//import controllers
let userControllerApi = require('./controllers/userControllerApi');


router.post('/user', userControllerApi.addUser);
router.get('/user/:user_id', userControllerApi.getUser);
// router.put('/user/:user_id', userControllerApi.addUser);
// router.delete('/user/:user_id', userControllerApi.addUser);

module.exports = router;