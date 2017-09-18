var assert = require('chai').assert,
    videosModel = require('../models/videos-model'),
    foo = 'bar',
    vm = new videosModel(),
    videos = require('../controllers/videos-controller');
    classVideos = new videos();

describe('Clase de video', ()=>{
    describe('obtener todos los videos en la base de datos', ()=>{
        it('validar que no existar error al obtener los datos', ()=>{
            vm.getAll((error, data) => {
                assert.isNotNull(error);
            })
        });

        it('validar que data sea un arreglo', ()=>{
            vm.getAll((error, data) => {
                assert.isArray(data);
            })
        });

        it('validar que data tenga un regitro o mas', ()=>{
            vm.getAll((error, data) => {
                assert.notEqual(0,data.length)
            })
        });
        it('validar los atributos de la data', ()=>{
            console.log('test 4');
            vm.getAll((error, data) => {
                //console.log('data',data[0].titulo);
                assert.isNumber(foo);
                //assert.equal(undefined,data[0].titulos);
            })
        });
    });
});

