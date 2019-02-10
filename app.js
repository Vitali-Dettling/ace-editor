var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var requirejs = require('requirejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersEditor = require('./routes/editor');

var app = express();

requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: '../node_modules/ace-code-editor/lib',
  //except, if the module ID starts with "app",
  //load it from the js/app directory. paths
  //config is relative to the baseUrl, and
  //never includes a ".js" extension since  
  //the paths config could be for a directory.
  paths: {
      app: '../app'
  }
});

// view engine setup
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + 'views'));
app.use(requirejs);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/editor', usersEditor);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
