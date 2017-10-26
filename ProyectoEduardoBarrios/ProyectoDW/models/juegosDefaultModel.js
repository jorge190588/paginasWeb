'use strict';

const conn = require('./conexion');

class Default{
    getJuegos(idUsuarioCrea,Callback){
        conn.query('SELECT * FROM juegos WHERE idUsuarioCrea = '+idUsuarioCrea+' ORDER BY idJuego DESC', Callback);
    }

    nuevoJuegoPost(juego, Callback)
    {
        console.log(juego);
        conn.query('INSERT INTO juegos SET ?', juego, Callback );
    }

    editarJuego(juego, Callback)
    {
        //console.log('Juego desde el Modelo '+juego.id+" "+juego.titulo+" "+juego.descripcion+" "+juego.idPreguntas);
        conn.query('UPDATE juegos SET ? WHERE idJuego = ?',[juego,juego.idJuego], Callback);
    }

    eliminarJuego(id, Callback){
        conn.query('DELETE FROM juegos WHERE idJuego = ?', id, Callback);
    }
}

module.exports = Default;