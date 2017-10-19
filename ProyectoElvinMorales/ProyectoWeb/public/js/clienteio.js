var io = io();

io.on('usersOnline', function(contador){
    document.querySelector('#usersOnline').innerHTML = contador.usersOnline;
});

io.on('videosSubidos', function(data){
    document.querySelector('#videos_subidos').innerHTML = data;
});

/* messages */
function sendMessage(e){
    var date_at = new Date();
    var message = {
        message: $('#message').val(),
        id_auth: $('#id_auth').val(),
        date_at: date_at
    };

    io.emit('newUserMessage', message);
    $('#message').val('');
    return false;
}

io.on('messageReceived', function(message){
    console.log(message);
    var html = `<p>${message.name}</p><span class="messages">${message.message} <span class="time">${message.date_at}</span></span>`;
    $('#messages').prepend(html);
    //append agrega datos al final
    //prepend agrega datos al inicio
});
/* end messages */

/* comments */
function sendComment(e){
    var date_at = new Date();
    var comment = {
        mensaje: $('#comment').val(),
        id_auth: $('#id_auth_comment').val(),
        id_video: $('#id_video_comment').val(),
        fecha_at: date_at,
        full_name: $('#full_name').val()
    };
    io.emit('newUserComment', comment);
    $('#comment').val('');
    return false;
}

function renderComment(data){
    var html = (`
            <li class='media media1'>
                <div class=['media-body'>
                    <p>
                        <strong>Comentario de - 
                        <span class='text-primary'> ${data.full_name} </span>
                        <span>-</span>
                        <span> ${data.fecha_at}</span></strong>
                    </p>
                    <div class="flecha-izquierda"></div>
                    <div class="contenido">${data.mensaje}</div>
                </div>
            </li>
        `);
    $('#comments').prepend(html);
}

io.on('commentReceived', function(data){
    // $('#message').prepend(data.mensaje);
    renderComment(data);
});