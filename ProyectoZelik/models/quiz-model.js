const conexion = require('./conexion');
class QuizModel{
    obtenerTodosLosQuiz(cb){
        conexion.query('SELECT * FROM quiz',cb);
    }

    guardarQuiz(quiz, cb){
        conexion.query('INSERT INTO quiz SET ?', quiz, cb);
    }

    obtenerUnRegistro(id, cb){
        conexion.query('SELECT * FROM quiz WHERE id=?', id, cb);
    }

    guardarCambiosQuiz(quiz, cb){
        conexion.query('UPDATE quiz SET ? WHERE id = ?', [quiz, quiz.id], cb);
    }
}

module.exports = new QuizModel;