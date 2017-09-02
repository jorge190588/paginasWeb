'use strict';

const videosController = require('../controllers/videos-controller'),
    express = require('express'),
    router = express.Router(),
    vc = new videosController();

router
    .get('/inicio', vc.getAll )
    .get('/agregar', vc.addForm)
    .post('/inicio', vc.save)
    .get('/editar/:id', vc.getOne)
    .post('/actualizar/:id', vc.save)
    .post('/eliminar/:id', vc.delete)
    .get('/detalles/:id', vc.getDetails)
    .get('/perfil', vc.getProfile);
    .post('/calificar', vc.calificarVideo)
    .post('/comentar', vc.comentarVideo);
    
module.exports = router;