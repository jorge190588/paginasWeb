var express = require('express');
var http = require('http');
var path = require('path');
var mysql = require('mysql');
var port = (process.env.PORT || 3000);

//conexion a la db
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'simple_chat',
    port: 3306
});

conn.connect((error) => {
    return (error)
        ? console.log(`Error al conectarse a Mysql: ${error.stack}`)
        : console.log(`Conexión establecida con Mysql: ${conn.threadId}`)
});    

//Socket
var socket = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socket(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(express.static(path.join(__dirname, 'public')));



//Configurar ruta de la app
app.get('/',function(req,res){
    res.render('chat',{title : 'chat nodejs'});
});

app.get('/messages',function(req,res){
    var query = "SELECT * FROM messages";
    conn.query(query,function(error, data){
        if(!error){
            res.header('Content-Type','application/json');
            res.send(data);
        }
    });
});

//Configurar socket.io para escuchar eventos desde el cliente
io.on('connection',function(socket){
    console.log('Usuario Conectado :)');

    //Escuchador de eventos
    socket.on('new message',function(message){
        //console.log(message.username+" : "+message.body);
        //Guardar el mensaje en la db 
        var query = "INSERT INTO messages SET ?";
        conn.query(query,message,(error,results)=>{
            if(!error)
                io.emit('new message', message);
        });        
    });

    socket.on('disconnect', function(){
        console.log('Usuario Desconectado :(');
    });
});

server.listen(port,function(){
    console.log("Servidor Corriendo localhost:"+port);
});