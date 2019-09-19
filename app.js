var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
//require app router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var requestRouter = require('./routes/request');
var appointRouter = require('./routes/appointment');
var adminRouter = require('./routes/admin');
var productRouter = require('./routes/product');

//database setting
require('./config/database')

//app
var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors())

//define app routes
app.use('/Api', indexRouter);
app.use('/Api/users', usersRouter);
app.use('/Api/request', requestRouter);
app.use('/Api/appointment', appointRouter);
app.use('/Api/product', productRouter);
app.use('/Api/admin', adminRouter);

app.use(express.static(__dirname + '/public/'));

// Calling Public folder
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));


module.exports = app;
