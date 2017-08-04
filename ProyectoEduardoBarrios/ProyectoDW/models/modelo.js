'use strict';

const conn = require('./conexion');

class Prueba{
    getAll(Callback){
        conn.query('SELECT * FROM prueba', Callback);
    }
}

module.exports = Prueba;