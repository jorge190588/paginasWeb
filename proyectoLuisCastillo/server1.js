
var express = require('express');
var app = express();
var path    = require("path");

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', function (req, res) {
	console.log('index page');
    res.sendFile(path.join(__dirname+'/indexx.html'));
});

app.get('/', function (req, res) {
	console.log('index page');
    res.sendFile(path.join(__dirname+'/estilos.css'));
});

var server = app.listen(8082, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
});