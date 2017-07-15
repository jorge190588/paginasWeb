var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send('Inicio');
})


app.get('/contacto/', function (req, res) {
   res.send('contacto');
})


app.get('/imagenes/', function (req, res) {
   res.send('imagenes');
})


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})