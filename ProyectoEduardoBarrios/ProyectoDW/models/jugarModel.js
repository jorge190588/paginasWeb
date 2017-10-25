'use strict';

const conn = require('./conexion');

class JugarModel{
    //Ya no usado
    jugarIndexGetParticipantes(idJuego,Callback)
    {
        //console.log("id del juego EN EL MODELO "+idJuego);
        conn.query("SELECT (SELECT count(idParticipante) FROM participantes WHERE idJuego = "+idJuego+") as CantidadParticipantes,P.nombre,P.carne FROM participantes P WHERE P.idJuego = "+idJuego+" ORDER BY P.idParticipante DESC",Callback);
    }

    //Cambiar el estado del juego a iniciado para quitar el loading
    IniciarJuego(idJuego,Callback)
    {
        conn.query("CALL sp_IniciarJuego("+idJuego+")",Callback);
        //conn.query("UPDATE juegos SET juegoIniciado = 1 WHERE idJuego = ?"+idJuego,Callback);
    }

    //Metodo para obtener el resultado de un juego y saber quien gano
    ResultadoFinalJuego(idJuego,Callback)
    {
        conn.query("CALL sp_ResultadoDeJuego(?)",idJuego,Callback);
    }

}

module.exports = JugarModel;