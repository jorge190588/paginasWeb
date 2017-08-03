'use strict';

const conn = require('./conexion');

class Default{
    getJuegos(Callback){
        conn.query('SELECT * FROM juegos', Callback);
    }

    nuevoJuegoPost(juego, Callback)
    {
        conn.query('INSER INTO juegos SET ?', juego, Callback );
    }
}

module.exports = Default;