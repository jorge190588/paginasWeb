const quizController = require('../controllers/quiz-controller'),
    express = require('express'),
    router = express.Router();

    router
        .get('/', quizController.getIndex)
        .get('/nuevo', quizController.mostarFormularioNuevoQuiz)
        .post('/nuevo', quizController.guardarQuiz)
        .get('/editar/:id', quizController.mostrarFormularioEdicion)
        .post('/editar/:id', quizController.guardarCambiosQuiz)
        .get('/preguntas', quizController.mostrarFormularioPreguntas);


    module.exports = router;