let conexion = require('./conexion');

class MessagesModel
{
    showMessages(cb){
        conexion.query('SELECT *, name,last_name FROM message INNER JOIN auth ON message.id_auth=auth.id', cb);
    }

    addMessage(message, cb){
        conexion.query('INSERT INTO message SET ?',message, cb);
    }
}

module.exports = new MessagesModel;