'use strict';

const conn = require('./conexion');

class addPreguntas{
    getOneGameModel(idJuego,Callback){
        //console.log("Id en el modelo "+idJuego);
        conn.query('SELECT * FROM juegos WHERE idJuego = ?',idJuego ,Callback);
    }

    nuevaPreguntaPost(pregunta,respuestas,respCorrectas,Callback)
    {
      console.log("Id del juego en agregar nueva pregunta: ->> "+pregunta.idJuego);
      conn.query("CALL sp_TransaccionInsertPreguntasRespuestas('"+pregunta.pregunta+"','"+pregunta.tiempo+"',"+pregunta.idJuego+",'"
                +respuestas.resp1+"','"+respuestas.resp2+"','"+respuestas.resp3+"','"+respuestas.resp4+"',"
                +respCorrectas.respCorrecta1+","+respCorrectas.respCorrecta2+","+respCorrectas.respCorrecta3+","+respCorrectas.respCorrecta4+")"      
                ,Callback);      
    }

}

module.exports = addPreguntas;