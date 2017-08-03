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

    editarJuego(juego, Callback)
    {
        //console.log('Juego desde el Modelo '+juego.id+" "+juego.titulo+" "+juego.descripcion+" "+juego.idPreguntas);
        conn.query('UPDATE juegos SET ? WHERE idJuego = ?',[juego,juego.id], Callback);
    }

    eliminarJuego(id, Callback){
        conn.query('DELETE FROM juegos WHERE idJuego = ?', id, Callback);
    }
}

module.exports = Default;