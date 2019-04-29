var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var bluebird = require('bluebird');
var morgan = require('morgan');
var passport = require('passport');

//var jwt = require('jsonwebtoken');

var mongoose = require('mongoose');

mongoose.Promise = bluebird;




if (process.env.DBPSW && process.env.MONGOODBURL){

  var dbUrl = process.env.MONGOODBURL ;
  var mongoodbUrl = 'mongodb://'+dbUrl;
  var bdpsw = encodeURIComponent(process.env.DBPSW);


  // mongoose.connect(mongoodbUrl, { 
  //         // sets how many times to try reconnecting
  //         reconnectTries: 30,
  //         // sets the delay between every retry (milliseconds)
  //         reconnectInterval: 1000,
  //       //  useNewUrlParser: true, 
  //         auth:{
  //           user: process.env.DBUSER,
  //           password: process.env.DBPSW,
  //           dbName:"bootcamphelper"



  //           } 
  //         },



  //     )
  mongoose.connect(mongoodbUrl, { 
          // sets how many times to try reconnecting
          reconnectTries: 30,
          // sets the delay between every retry (milliseconds)
          reconnectInterval: 1000,


            auth: {
              user: process.env.DBUSER,
              password: process.env.DBPSW,
              dbName:"bootcamphelper",
            },
          useNewUrlParser: false,




          },



      )
  .then(()=> { console.log('Succesfully Connected to the Mongodb Database  at URL : '+mongoodbUrl)})
  .catch((err)=> { console.log(mongoodbUrl , err)})
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', true);




}

else{

  var dbUrl = process.env.MONGOODBURL || 'localhost:27017';
  var mongoodbUrl = 'mongodb://'+dbUrl+'/bootcampHelper';


  mongoose.connect(mongoodbUrl, { 
          // sets how many times to try reconnecting
          reconnectTries: 30,
          // sets the delay between every retry (milliseconds)
          reconnectInterval: 1000,
          useNewUrlParser: true 
          } 
      )
  .then(()=> { console.log('Succesfully Connected to the Mongodb Database  at URL : '+mongoodbUrl)})
  .catch((err)=> { console.log(mongoodbUrl , err)})
  mongoose.set('useCreateIndex', true);
  mongoose.set('debug', true);


} 





var index = require('./routes/index');
var users = require('./routes/users');

// Get the API route ...

var api = require('./routes/api.route')

var app = express();

var allowedOrigins = ['http://localhost:4200'];
process.env.CORSORIGINE ? allowedOrigins.push(process.env.CORSORIGINE):'';
process.env.CORSORIGINE2 ? allowedOrigins.push(process.env.CORSORIGINE2):'';

// var corsOrigine = process.env.CORSORIGINE || "http://localhost:4200";
console.log('allowedOrigins', allowedOrigins);
app.use(function(req, res, next) {
  var origin = req.headers.origin;
  console.log('origin de la demande', origin)
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
//  res.header("Access-Control-Allow-Origin", corsOrigine);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, params");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(passport.initialize());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Use the Routes

app.use('/', index);
app.use('/users', users);

//Use the API routes for all routes matching /api

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = app;
