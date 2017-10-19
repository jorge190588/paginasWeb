exports.handle = function(server,sessionMiddleware){
    let io = require('socket.io')(server),
    moment = require('moment');
    moment.locale('es'); //configuramos el moment al español
    let messageModel = require('../models/messages-model');
    let commentModel = require('../models/comments-model');
    let nicknames = [];
    let contador = 0;


    io.use((socket, next)=>{
        sessionMiddleware(socket.request, socket.request.res, next);
    });

    io.sockets.on('connection', (socket)=>{
        if(socket.request.session.username){            
            if(nicknames.indexOf(socket.request.session.username) != -1){
                updateNicknames();
            }else{
                socket.nickname = socket.request.session.username;
                nicknames.push(socket.nickname);
                updateNicknames();
            }
        }

        contador = nicknames.length;
        
        console.log('nicknames: ',nicknames);
        socket.emit('usersOnline',{usersOnline : contador});
        socket.broadcast.emit('usersOnline',{usersOnline : contador});

        function showMessages(){
            messageModel.showMessages((error, message)=>{
                if(!error){
                    for(var msg in message){
                        let row = message[msg];
                        var message_custom = {
                            message: row.message,
                            date_at: moment(row.fecha).fromNow(),
                            name: row.name
                        };
                        socket.emit('messageReceived',message_custom);
                    }
                }
            });
        }

        showMessages();
        
        socket.on('newUserMessage', (message)=>{
            let message_db = {
                message: message.message,
                id_auth: message.id_auth
            };
            messageModel.addMessage(message_db, (error)=>{
                if(!error){
                    var message_custom = {
                        message: message.message,
                        date_at: moment(message.date_at).fromNow(),
                        name: socket.request.session.name
                    };
                    io.sockets.emit('messageReceived', message_custom);
                }
            });
        });

        socket.on('new user', (user, callback)=>{
            if(nicknames.indexOf(user) != -1){ //usuario existente
                callback(false);
            }else{ //usuario nuevo
                callback(true);
                socket.nickname = user;
                nicknames.push(socket.nickname);
                updateNicknames();
            }
        });

        function updateNicknames(){
            io.sockets.emit('usernames',nicknames);
        }

        /* comments */
        socket.on('newUserComment', (comment)=>{
            var comment_inserted_db = {
                mensaje: comment.mensaje,
                id_auth: comment.id_auth,
                id_video: comment.id_video
            };
            commentModel.addComment(comment_inserted_db, (error)=>{
                if(!error){
                    var mensaje_personalizado = {
                        full_name: comment.full_name,
                        fecha_at: moment(comment.fecha_at).fromNow(),
                        mensaje: comment.mensaje
                    };
                    io.sockets.emit('commentReceived', mensaje_personalizado);
                }
            });
        });

        socket.on('disconnect', ()=>{
            if(!socket.nickname) return;
            nicknames.splice(nicknames.indexOf(socket.nickname), 1);
            updateNicknames();
        });
    });
}