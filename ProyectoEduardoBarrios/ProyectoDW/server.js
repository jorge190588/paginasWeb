var express = require('express');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var port = (process.env.PORT || 3000);


//Contador de conexiones
//var conexiones = 0;
//Configuración de Socket
//var socket = require('socket.io');

//llamada a socket
var socketServer = require('./sockets');

var app = express();
var server = http.createServer(app);
//var io = socket(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;

//app.use(express.static(path.join(__dirname, 'routes')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
//Sessiones con express
var sessionMiddleware = session({
    secret: '123456',
    resave: false,
    saveUninitialized: true
  });

socketServer.handle(server,sessionMiddleware);
app.use(sessionMiddleware);


  //require de las rutas
var rutas = require('./routes/routes');
app.use('/',rutas);

var usuarioDesconectado;
//uso de sockets
/*
io.on('connection',function(socket){    
    //Escuchando el evento y recibiendo datos
    //console.log("Usuarios Conectados -> "+conexiones);
    socket.on('new jugador',function(jugador,carne){
        console.log('1 Usuario Conectado');
        //Incrementar el número de usuarios solo si se registran
        conexiones++;
        console.log("DATOS Socket en el Server -> "+jugador+" Carne -> "+carne+" Conexiones ->"+conexiones);
            io.emit('new jugador',jugador,carne,conexiones);
    });


    //Si un usuario se desconecta o cierra el navegador
    socket.on('disconnect', function(){
        console.log('Usuario Desconectado :(');
        conexiones--;
        if(conexiones < 0)
            conexiones = 0;

        io.emit('desconectado',conexiones);
    });

    //Recibir un mensaje desde el cliente
    socket.on('new message',function(nameJugador,message){
        console.log("Mensaje en el server -> "+message+" Usuario -> "+nameJugador);
        io.emit('new message',nameJugador,message);
    });
}); */

server.listen(port,function(){
    console.log("Servidor Corriendo localhost:"+port);
});