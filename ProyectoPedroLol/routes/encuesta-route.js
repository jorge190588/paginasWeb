'use strict';

const encuestaController = require('../controllers/encuesta-controller'),
    express = require('express'),
    router  = express.Router(),
    objEncuesta = new encuestaController();

router
    .get('/', objEncuesta.index)
    .get('/preguntas/:id',objEncuesta.ingresar_preguntas)
    .get('/crear_encuesta',objEncuesta.crear_encuesta)
    .post('/guardar_encuesta',objEncuesta.guardar_encuesta)
    .post('/eliminar_encuesta/:id',objEncuesta.eliminar_encuesta)
    .post('/guardar_pregunta', objEncuesta.guardar_pregunta)
    .post('/eliminar_preguntas/:id',objEncuesta.eliminar_preguntas)
    .get('/login',objEncuesta.login)
    .get('/Respuestas',objEncuesta.Respuestas)
    .get('/jugando',objEncuesta.jugando);
    
module.exports = router;