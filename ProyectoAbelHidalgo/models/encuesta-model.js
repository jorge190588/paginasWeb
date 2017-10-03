const connection = require('./conexion');

class EncuestaModel{
    obtenerTodasLasEncuestas(callback){
        connection.query('SELECT *, (SELECT COUNT(p.ID) FROM pregunta p WHERE p.ID_ENCUESTA=e.ID) total_pregunta FROM encuesta e', callback);
    }

    obtenerUnaEncuesta(id, callback){
        connection.query('SELECT * FROM encuesta WHERE ID = ?', id, callback);
    }

    obtenerPreguntasEncuesta(id,callback){
        connection.query('SELECT p.PREGUNTA, r.RESPUESTA '+
        'FROM pregunta p '+
        'INNER JOIN respuesta r ON r.ID_PREGUNTA=p.ID '+
        'WHERE p.ID_ENCUESTA=?', id, callback);
    }

    guardar_encuesta(objEncuesta,callback){
        connection.query('INSERT INTO encuesta SET ?',objEncuesta,callback);
    }

    guardar_pregunta(pregunta,callback){
        connection.query('INSERT INTO pregunta SET ?', pregunta, callback);
    }

    guardar_respuesta(respuesta,callback){
        connection.query('INSERT INTO respuesta SET ?', respuesta, callback);
    }

    obtenerIdMaximoEncuestaGuardada(callback){
        connection.query('SELECT MAX(ID) id FROM encuesta', callback);
    }

    obtenerIdMaximoPreguntaGuardada(callback){
        connection.query('SELECT MAX(ID) id FROM pregunta', callback);
    }

    verificar_pin(pin, callback){
        connection.query('SELECT ID,TITULO FROM encuesta WHERE CODIGO_ACCESO=?',pin,callback);
    }

    obtenerPreguntasPlay(id,callback){
        connection.query('SELECT * FROM pregunta WHERE ID_ENCUESTA=?', id, callback);
    }

    delete(id, callback){
        connection.query('DELETE FROM encuesta WHERE id=?', id, callback);
    }

    delete_question(id){
        connection.query('DELETE FROM pregunta WHERE ID_ENCUESTA=?', id);
    }

    delete_response(id){
        connection.query('DELETE FROM respuesta WHERE ID_PREGUNTA=?', id);
    }
}

module.exports = EncuestaModel;