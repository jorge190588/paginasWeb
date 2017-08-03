'use strict';

const conn = require('./conexion');

class Default{
    getJuegos(Callback){
        conn.query('SELECT * FROM juegos ORDER BY idJuego DESC', Callback);
    }

    nuevoJuegoPost(juego, Callback)
    {
        conn.query('INSERT INTO juegos SET ?', juego, Callback );
    }
}

module.exports = Default;