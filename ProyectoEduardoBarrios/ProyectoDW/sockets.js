exports.handle = function(server, session)
{
    var io = require('socket.io')(server);
    // Json para controlar que no existan nombres repetidos
    var usuariosConectados = [];
    var contadorConexiones = 0;

    io.use((socket,next)=>{
        session(socket.request, socket.request.res, next);
    });

    io.sockets.on('connection',function(socket){
        if(socket.request.session.nombre)
        {
            if(usuariosConectados.indexOf(socket.request.session.nombre) != -1){
                updateNicknames();
            }else{
                socket.nickname = socket.request.session.nombre;
                usuariosConectados.push(socket.nickname);
                updateNicknames();
            }

            console.log("ARRAY CONECTADOS: "+usuariosConectados);
        }
        
        contadorConexiones = usuariosConectados.length;
        socket.emit('conectados',contadorConexiones);
        socket.broadcast.emit('conectados',contadorConexiones)

        function updateNicknames(){
            io.sockets.emit('listaUsuarios',usuariosConectados);    
        }
        
        //Se dispara cuando alguien se desconecta
        socket.on('disconnect',function(){
            if(!socket.nickname) return;
            usuariosConectados.splice(usuariosConectados.indexOf(socket.nickname), 1);
            updateNicknames();
            //console.log("Cantidad de conexiones al Desconectar "+contadorConexiones);
        });

        //Evento para cuando el administrador inicia el juego
        socket.on('empezar juego',function(empezar){
            //console.log('EMPEZAR EL JUEGO -> '+empezar);
            io.sockets.emit('empezar',empezar);
        });
    });
}