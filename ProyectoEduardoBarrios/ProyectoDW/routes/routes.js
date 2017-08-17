var express = require('express');
var router = express.Router();

// archivo para autocargar todos los controladores 
var controllers = require('../controllers');

/* GET homeController. */
router.get('/', controllers.homeController.index);
//router.get('/default', controllers.homeController.default);
//router.get('/nuevo', controllers.homeController.new);

/* GET juegoController. */
router.get('/nuevaEncuesta', controllers.juegoController.nuevaEncuesta);
router.get('/nuevoExamen', controllers.juegoController.nuevoExamen);
router.get('/nuevaDiscusion', controllers.juegoController.nuevaDiscusion);
router.get('/nuevoRevoltijo', controllers.juegoController.nuevoRevoltijo);

/* GET authController. */
router.get('/login', controllers.authController.loginGet);
router.get('/crearCuenta', controllers.authController.createAccountGet);


// llamar una ruta con mvc
const controlador = require('../controllers/pruebaController'),
      objController = new controlador();

router.get('/ruta', objController.getAll);

// crear ruta para juegosDefault 
const indexDefault = require('../controllers/juegosDefaultController');
var obj = new indexDefault();

router.get('/default', obj.getJuegos);

// ruta para nuevoJuegoGET
router.get('/nuevoJuego', obj.crearJuegoGet);
router.post('/crear',obj.crearJuegoPost);
router.post('/editar/:id',obj.editarJuego);
router.post('/eliminar/:id', obj.eliminarJuego);

// ruta mvc para agregar Preguntas
const addPreguntas = require('../controllers/agregarPreguntasController');
var inst = new addPreguntas();

router.get('/juegoCreado/:id',inst.getOneGame);
router.get('/agregarPregunta/:id',inst.nuevaPreguntaGet);
router.post('/crearPregunta',inst.nuevaPreguntaPost);

// ruta de prueba
router.get('/pruebaPreguntas',inst.getPreguntas);
module.exports = router;