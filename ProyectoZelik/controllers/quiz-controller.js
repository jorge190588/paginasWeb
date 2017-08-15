const quizModel = require('../models/quiz-model');

class QuizController{
    getIndex(req, res, next){
        quizModel.obtenerTodosLosQuiz((error, data) => {
            if(!error){
                res.render('index',{
                    title: 'Inicio Del Juego',
                    data: data
                });
            }
        }); 
    }

    mostarFormularioNuevoQuiz(req, res, next){
        res.render('nuevo',{
            title: 'Nuevo Juego'
        });
    }

    guardarQuiz(req, res, next){
        const quiz = {
            nombre: req.body.titulo,
            descripcion: req.body.descripcion,
            cantidad_preguntas: req.body.cant_preguntas
        }
        quizModel.guardarQuiz(quiz, (error) => {
            if(!error){
                res.redirect('/');
            }
        })
    }

    mostrarFormularioEdicion(req, res, next){
        let idQuiz = req.params.id;
        quizModel.obtenerUnRegistro(idQuiz, (error, data) => {
            if(!error){
                res.render('editar_quiz', {
                    title: 'Edicion del Quiz',
                    data: data
                })
            }
        });
    }

    guardarCambiosQuiz(req, res, next){
        let quiz = {
            id: req.body.id,
            nombre: req.body.titulo,
            descripcion: req.body.descripcion,
            cantidad_preguntas: req.body.cant_preguntas
        }
        quizModel.guardarCambiosQuiz(quiz, (error) => {
            if(!error){
                res.redirect('/');
            }
        });
    }

    mostrarFormularioPreguntas(req, res, next){
        res.render("preguntas",{title:"Formulario de Preguntas"})
    }

}

module.exports = new QuizController;