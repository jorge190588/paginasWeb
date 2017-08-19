var express = require('express');
var app = express();

app.set('view engine','pug');
app.use(express.static('public'));

//ruta
app.get('/',function(req, res){
    res.render('crearUsuario');
});

app.listen(8081,function(err){
    if(err) return console.log('Hubo un error'), process.exit(1);
    console.log('Escuchando en el puerto 8081');
});