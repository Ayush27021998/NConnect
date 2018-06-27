var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local');
var session= require('express-session');
var user = require("./models/user");
var flash        = require("connect-flash");

var app = express();

//MongoDB connection
mongoose.connect("mongodb://head:1234@ds125060.mlab.com:25060/nconnect", function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected");
    }
});

app.use(require('express-session')({
    secret: 'You know what, I am Awesome!!!',
    resave: false,
    saveUninitialized: false
}));
//app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());



var indexRouter = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


app.use('/', indexRouter);
app.use(require("./routes/auth"));
app.use(require("./routes/ngo"));
app.use(require("./routes/project"));
app.use(require("./routes/volunteer"));

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