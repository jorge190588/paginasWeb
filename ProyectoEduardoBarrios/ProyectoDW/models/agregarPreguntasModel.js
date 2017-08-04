'use strict';

const conn = require('./conexion');

class addPreguntas{
    getOneGameModel(idJuego,Callback){
        console.log("Id en el modelo "+idJuego);
        conn.query('SELECT * FROM juegos WHERE idJuego = ?',idJuego ,Callback);
    }

}

module.exports = addPreguntas;