var express = require('express');
var router = express.Router();

var homeController = require('../controllers/homeController');
var home = new homeController();
/* GET homeController. mvc */
router.get('/', home.IndexGet);
router.post('/irJuego', home.IndexPost);
router.get('/juegoEnEspera/:id',home.JuegoEnEspera);

//RUTA para validar si existe un juego por ajax en el inicio cuando se ingresa el id para empezar a jugar
router.get('/ValidarExisteJuego/:idJuego',home.ValidarExisteJuego);

//ruta en clase
router.get('/ProcesarJuego/:idJuego/:idPregunta',home.ProcesarJuego);

/* GET authController. */
const auth = require('../controllers/authController');
var authorize = new auth();
router.get('/login', authorize.loginGet);
router.post('/loginPost', authorize.loginPost);
router.get('/crearCuenta', authorize.createAccountGet);
router.post('/crearCuentaPost', authorize.createAccountPost);

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

//Ruta para actualizar el campo juegoIniciado con ajax en la tabla juegos
router.get('/iniciarJuego/:id',jugar.IniciarJuego);

//Ruta para obtener el resultado de un juego AJAX
router.get('/ResultadoFinalJuego',jugar.ResultadoFinalJuego);

// ruta error | 404 si no hay usuario con session
const notFound = require('../controllers/notFound404Controller');
var not = new notFound();
router.get('/notFound',not.getNotFound);

// ruta para cambiar a null la session y cerrar sesion
router.get('/CerrarSesion',home.CerrarSesion);

//Ruta para los resultados con graficas
var Resultados = require('../controllers/resultadosController');
var result = new Resultados();

router.get('/resultados',result.getResultados);

// ruta para el chat entre jugadores y admin
const Chat = require('../controllers/chatController');
var chat = new Chat();

router.get('/Chat',chat.getViewChat);
// ruta de prueba
router.get('/pruebaPreguntas',inst.getPreguntas);

module.exports = router;