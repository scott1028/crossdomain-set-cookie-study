var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var cookieRouter = require('./routes/cookie');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/console-log-div', express.static(__dirname + '/node_modules/console-log-div/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/axios', express.static(__dirname + '/node_modules/axios/dist/'));
app.use('/whatwg-fetch', express.static(__dirname + '/node_modules/whatwg-fetch/'));
app.use(cors({
  // origin: 'http://localhost:3001',  // can not be *, after new version chrome
  // origin: 'http://localhost:3001',  // can not be *, after new version chrome
  origin: '*',  // can not be *, after new version chrome
  credentials: true,  // Access-Control-Allow-Credentials: true // It doesn't matter with `set-cookie`
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  console.log('Cookies: ', JSON.stringify(req.cookies));
  // NOTE: just check `ngrep` log
  // console.log('req:', req);
  // console.log('res:', res);
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/cookie', cookieRouter);

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
