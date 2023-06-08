//import express
let express = require('express');

//Initialize the app
let app = express();
app.use(express.urlencoded({extended:true})); //decode body for form
app.use(express.json()); //decode json format 

//cors : allow origin
const cors = require("cors");
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

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