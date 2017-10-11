const connection = require('./conexion');

class EncuestaModel{
    obtenerTodasLasEncuestas(callback){
        connection.query('SELECT * FROM encuesta', callback);
    }
    guardar_pregunta(pregunta, callback){
        connection.query('INSERT INTO pregunta SET ?', pregunta, callback);
    }
    obtenerUnaEncuesta(id, callback){
        connection.query('SELECT * FROM encuesta WHERE ID = ?', id, callback);
    }
    obtenerPreguntasSegunEncuesta(id, callback){
        connection.query('SELECT *, TITULO FROM pregunta p INNER JOIN encuesta e ON p.ID_ENCUESTA=e.ID WHERE p.ID_ENCUESTA=?', id, callback);
    }
    guardar_encuesta(objEncuesta,callback){
        connection.query('INSERT INTO encuesta SET ?',objEncuesta,callback);
    }
    eliminar_encuesta(objEncuesta,callback){
        connection.query('DELETE FROM encuesta WHERE ID = ?',objEncuesta,callback);
    }
    eliminar_preguntas(objEncuesta,callback){
        connection.query('DELETE FROM pregunta WHERE ID = ?',objEncuesta,callback);
    }
}

module.exports = EncuestaModel;