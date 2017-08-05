'use strict';

const conn = require('./conexion');

class addPreguntas{
    getOneGameModel(idJuego,Callback){
        console.log("Id en el modelo "+idJuego);
        conn.query('SELECT * FROM juegos WHERE idJuego = ?',idJuego ,Callback);
    }

    nuevoPreguntaPost(pregunta, Callback)
    {
        conn.query('INSERT INTO preguntas SET ?', pregunta, Callback );
    }

}

module.exports = addPreguntas;