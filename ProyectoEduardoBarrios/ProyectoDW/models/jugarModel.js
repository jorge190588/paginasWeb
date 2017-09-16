'use strict';

const conn = require('./conexion');

class JugarModel{
   
    jugarIndexGetParticipantes(idJuego,Callback)
    {
        //console.log("id del juego EN EL MODELO "+idJuego);
        conn.query("SELECT (SELECT count(idParticipante) FROM participantes WHERE idJuego = "+idJuego+") as CantidadParticipantes,P.nombre,P.carne FROM participantes P WHERE P.idJuego = "+idJuego+" ORDER BY P.idParticipante DESC",Callback);
    }

}

module.exports = JugarModel;