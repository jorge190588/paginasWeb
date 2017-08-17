'use strict';

const conn = require('./conexion');

class addPreguntas{
    //metodo para el caso en el que el juego no tiene preguntas
    getOneGameModel(idJuego,Callback){
        conn.query("SELECT * FROM juegos WHERE idJuego = ?",idJuego,Callback);
    }
    //metodo para el caso en que un juego tenga preguntas
    getOneGameQuestionsModel(idJuego,Callback){    
        //conn.query("SELECT J.idJuego,J.Titulo,J.Descripcion,J.fechaCreacion,P.idPregunta,P.pregunta,P.limiteTiempo,R.idRespuesta,R.respuesta,R.idPregunta,R.correcta FROM juegos J INNER JOIN preguntas P ON J.idJuego = P.idJuego INNER JOIN respuestas R ON P.idPregunta = R.idPregunta WHERE J.idJuego ="+idJuego,Callback);
        //conn.query("SELECT J.idJuego,J.Titulo,J.Descripcion,J.fechaCrecion,P.idPregunta,P.pregunta,P.limiteTiempo,P.idJuego FROM juegos J INNER JOIN preguntas P ON J.idJuego=P.idJuego WHERE J.idJuego ="+idJuego,Callback);
        conn.query("SELECT * FROM juegos J INNER JOIN preguntas P ON J.idJuego = P.idJuego WHERE J.idJuego = ? ",idJuego,Callback);
        //conn.query("SELECT P.idPregunta,P.pregunta,P.limiteTiempo,P.idJuego FROM preguntas P INNER JOIN preguntas P ON P.idPregunta=P.idPregunta WHERE J.idJuego ="+idJuego,Callback);
    }

    nuevaPreguntaPost(pregunta,respuestas,respCorrectas,Callback)
    {
      console.log("Id del juego en agregar nueva pregunta: ->> "+pregunta.idJuego);
      conn.query("CALL sp_TransaccionInsertPreguntasRespuestas('"+pregunta.pregunta+"','"+pregunta.tiempo+"',"+pregunta.idJuego+",'"
                +respuestas.resp1+"','"+respuestas.resp2+"','"+respuestas.resp3+"','"+respuestas.resp4+"',"
                +respCorrectas.respCorrecta1+","+respCorrectas.respCorrecta2+","+respCorrectas.respCorrecta3+","+respCorrectas.respCorrecta4+")"      
                ,Callback);      
    }

    getPreguntasDeJuegos(idJuego,Callback)
    {
      //console.log("ID DEL JUEGO EN EL MODEL ->> "+idJuego)
      conn.query("SELECT J.Titulo,J.Descripcion,J.fechaCreacion,P.idPregunta,P.pregunta,P.limiteTiempo,R.idRespuesta,R.respuesta,R.idPregunta,R.correcta FROM juegos J INNER JOIN preguntas P ON J.idJuego = P.idJuego INNER JOIN respuestas R ON P.idPregunta = R.idPregunta WHERE P.idJuego ="+idJuego,Callback);
      //conn.query("CALL sp_GetPreguntasRespuestas(?)",idJuego,Callback);
    }

}

module.exports = addPreguntas;