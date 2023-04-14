//import express
let express = require('express');

//Initialize the app
let app = express();

//router
let router = require('./routes');
app.use('/', router);

// serve up static files (css)
 app.use('/public', express.static('public'));

//Setup server post
let port = 8000;

//Launch app to listen to specified port
app.listen(port, function() {
    console.log('Server running on port' + port)
});