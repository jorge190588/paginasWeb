var express = require('express');
var app = express();

app.set('view engine','pug');
app.use(express.static('public'));

//ruta para usuarios
var usuarios = require('./controllers/usuarioscontrolador');
var usuarios = new usuarios();
app.get('/login',usuarios.login);
app.get('/crearUsuario',usuarios.crearUsuario); 


//app.get('/listaJuegos',function(req, res){
  //  res.render('listaJuegos');
//});
//RUTA LISTA DE JUEGOS
var Juegos = require('./controllers/juegosControlador');
var juegos = new Juegos();

app.get('/listaJuegos',juegos.listaJuegos);

app.get('/crearJuego',juegos.crearJuego);

app.get('/gameindividual',juegos.gameindividual);
    
//RUTA DE UNA VISTA QUE USA UN TEMPLATE
var controlador = require('./controllers/controladorPrueba');
var objeto = new controlador();

app.get('/vistaTemplate',objeto.getIndex);

app.listen(8081,function(err){
    if(err) return console.log('Hubo un error'), process.exit(1);
    console.log('Escuchando en el puerto 8081');
});