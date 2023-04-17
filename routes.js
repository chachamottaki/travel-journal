//Get an instance of the express router and set routes
let express = require('express');
let router = express.Router();

//import controllers
let userController = require('./controllers/userController');


router.post('/user', userController.addUser);
router.get('/user/:user_id', userController.getUser);
router.put('/user/:user_id', userController.updateUser);
router.delete('/user/:user_id', userController.deleteUser);

module.exports = router;