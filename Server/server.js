var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var morgan = require('morgan');
var mongoose = require('mongoose');

var configDB = require('./config/database.js');

mongoose.connect(configDB.DBHost);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret: 'anystringoftext',
				 saveUninitialized: true,
				 resave: true}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


require('./app/routes.js')(app);

app.listen(port);
console.log('Server running on port: ' + port);




