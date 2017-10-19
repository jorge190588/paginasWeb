'use strict';

const connection = require('./conexion');

class AuthModel{
    getUser(user, cb)
    {
        connection.query('SELECT * FROM auth WHERE email = ? AND password = ?', [user.email, user.password], cb);       
    }

    getOneUser(id, cb)
    {
        connection.query('SELECT * FROM auth WHERE id=?',id,cb);
    }

    setUser(user, cb)
    {
        connection.query('INSERT INTO auth SET ?', user, cb);        
    }

    updateAvatar(avatar,id_auth, cb){
        connection.query('UPDATE auth SET avatar=? WHERE id=?',[avatar,id_auth],cb);
    }
}

module.exports = new AuthModel;