var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//MongoDB
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('muntravel:muntravel123@ds061984.mongolab.com:61984/muntravelreviews');

var routes = require('./routes/index');
var lasvegas = require('./routes/lasvegas');
var newyork = require('./routes/newyork');
var toronto = require('./routes/toronto');
var seattle = require('./routes/seattle');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Make mongodb accessible to our router
//adding db object to every HTTP request
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/lasvegas', lasvegas);
app.use('/newyork', newyork);
app.use('/toronto', toronto);
app.use('/seattle', seattle);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;