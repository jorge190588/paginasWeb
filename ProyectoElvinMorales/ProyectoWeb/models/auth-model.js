'use strict';

const conn = require('./conexion');

class AuthModel{
    getUser(user, cb){
        conn.query('SELECT * FROM auth WHERE email = ? AND password = ?', [user.email, user.password], cb);
    }

    setUser(user, cb){
        conn.query('INSERT INTO auth SET ?', user, cb);
    }
}

module.exports = AuthModel;