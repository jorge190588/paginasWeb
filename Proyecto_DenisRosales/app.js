var express = require('express');
var app = express();

app.set('view engine','pug');
app.use(express.static('public'));

//ruta
app.get('/login',function(req, res){
    res.render('login');
});

app.get('/listaJuegos',function(req, res){
    res.render('listaJuegos');
});

app.get('/crearUsuario',function(req, res){
    res.render('crearUsuario');
});

app.get('/crearJuego',function(req, res){
    res.render('crearJuego');
});

app.get('/gameindividual',function(req, res){
    res.render('gameindividual');
});

app.listen(8081,function(err){
    if(err) return console.log('Hubo un error'), process.exit(1);
    console.log('Escuchando en el puerto 8081');
});