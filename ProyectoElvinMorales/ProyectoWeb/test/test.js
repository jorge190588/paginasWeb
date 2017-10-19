var assert = require('chai').assert,
    videosModel = require('../models/videos-model'),
    videos = require('../controllers/videos-controller');
    classVideos = new videos();

var video = {
    id:             parseInt((4)),
    titulo:         'Testeando con mocha',
    descripcion:    'Es una buena practica para poder saber si nuestro software funciona correctamente',
    url:            'htttp://www.youtube.com/',
    id_auth:        parseInt(15),
    id_categoria:   parseInt(3)
};

const voto = {
    votos : parseInt(5),
    id_auth : parseInt(22),
    id_video : parseInt(8)
};

const comentario = {
    mensaje: 'Excelente video :)',
    id_auth: parseInt(22),
    id_video:  parseInt(10)
};

describe('Clase del controlador video comentar y votar en el video', ()=>{
    describe('verificar que los datos para comentar y votar sean validos por el sistema', ()=>{
        it('validar que el voto tenga un valor numerico menor que o igual que cinco (5)', ()=>{
            assert.isBelow(voto.votos,6);
        });

        it('validar que el atributo mensaje no venga vacio', ()=>{
            assert.notEqual(comentario.mensaje,'');            
        });
    });
});

