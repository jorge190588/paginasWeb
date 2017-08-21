'use strict';

const conn = require('./conexion');

class JugarModel{
   
    jugarIndexGetParticipantes(idJuego,Callback)
    {
        //console.log("id del juego EN EL MODELO "+idJuego);
        conn.query("SELECT * FROM participantes WHERE idJuego = "+idJuego,Callback);
    }

}

module.exports = JugarModel;