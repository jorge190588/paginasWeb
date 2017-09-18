var express = require('express');
var router = express.Router();

// ruta para ajax de preguntas y respuestas
router.get('/ajax/:id',function(req,res){
      var data = req.params.id;
      console.log("DATOS POR AJAX EN EL SERVER "+data);            
      res.send(data);
});
// archivo para autocargar todos los controladores 
var controllers = require('../controllers');

var homeController = require('../controllers/homeController');
var home = new homeController();
/* GET homeController. mvc */
router.get('/', home.IndexGet);
router.post('/irJuego', home.IndexPost);
router.get('/juegoEnEspera/:id',home.JuegoEnEspera);

//ruta en clase
router.get('/ProcesarJuego/:idJuego/:idPregunta',home.ProcesarJuego);
//router.get('/ProcesarJuegoSaveResultado/:idJuego/:idPregunta',home.SaveResultadoPregunta);
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

// ruta mvc para jugar
const juego = require('../controllers/jugarController');
var jugar = new juego();

router.get('/jugar/:id',jugar.Index);


// ruta error | 404 si no hay usuario con session
const notFound = require('../controllers/notFound404Controller');
var not = new notFound();
router.get('/notFound',not.getNotFound);

// ruta para cambiar a null la session y cerrar sesion
router.get('/CerrarSesion',home.CerrarSesion);

// ruta de prueba
router.get('/pruebaPreguntas',inst.getPreguntas);
module.exports = router;