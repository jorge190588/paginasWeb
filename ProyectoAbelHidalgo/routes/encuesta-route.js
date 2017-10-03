'use strict';

const encuestaController = require('../controllers/encuesta-controller'),
    express = require('express'),
    router  = express.Router(),
    quiz = new encuestaController();

router
    .get('/', quiz.index)
    .get('/preguntas/:id',quiz.ingresar_preguntas)
    .get('/crear_encuesta',quiz.mostrarTodasLasEncuestas)
    .post('/guardar_encuesta',quiz.guardar_encuesta)
    .post('/agregar_pregunta', quiz.guardar_pregunta)
    .post('/verificando_pin', quiz.verificando_pin)
    .get('/eliminar/:id', quiz.delete);
module.exports = router;