var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/routes');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//app.use(session({secret: '123456', resave: true, saveUninitialized: true}));

app.use('/', index);
app.use('/users', users);

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

// SOCKET.IO
var apps = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);


app.get('/socket',function(req,res){
  //res.render('juego/jugarIndex',{ data : 'Hola mundo socket.io'});
  res.sendfile(__dirname + '/index.html');
});

// emit con SOCKET
io.on('connection', function(socket){
  socket.emit('hello',{ data : 'Hola Socket.io desde el server'});
  socket.on('otro evento',function(data){
    console.log(data);
  });
});
module.exports = app;
