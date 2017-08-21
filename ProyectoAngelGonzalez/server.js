var express = require('express');
var mysql = require('mysql');
 
var app = express();
 
app.configure(function() {
    app.set('views', __dirname + '/views');
    app.set('view options', { layout: false });
    app.use(express.bodyParser());
    app.use(express.static(__dirname + '/public'));
});


var client = mysql.createClient({
  host: 'localhost',
  user: 'root',
  password: '',
});

client.database = 'juegos';

app.get('/', function(req, res) {
	
	client.query('SELECT id, nombre, tipo FROM juegos',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}

				res.render('index.jade', { juegos: results });
			}
		);
});

app.get('/crear', function(req, res) {
	
	client.query('SELECT id, nombre, tipo FROM juegos',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}

				res.render('crear.jade', { juegos: results });
			}
		);
});

app.get('/jugar', function(req, res) {
	
	client.query('SELECT id, nombre, tipo FROM juegos',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}

				res.render('jugar.jade', { juegos: results });
			}
		);
});


app.get('/parrafo', function(req, res) {
	
	client.query('SELECT id, parrafo, pregunta, respuesta1, respuesta2, idjuego FROM parrafos',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}

				res.render('parrafo.jade', { parrafos: results });
			}
		);
});
//enviar base datos

app.post('/nueva', function(req, res) {

	client.query('INSERT INTO juegos (nombre, tipo) VALUES (?, ?)', [req.body.nombre, req.body.tipo],
			function() {
				res.redirect('/crear');
			}
		);
});


app.post('/nuevaparrafo', function(req, res) {

	client.query('INSERT INTO parrafos (parrafo, pregunta, respuesta1, respuesta2, idjuego) VALUES (?, ?, ?, ?, ?)', [req.body.parrafo, req.body.pregunta, req.body.respuesta1, req.body.respuesta2, req.body.idjuego],
			function() {
				res.redirect('/');
			}
		);
});


// funciones editar, actualizar y elminiar
app.get('/editar/:id', function(req, res) {
	client.query('SELECT id, nombre, tipo FROM juegos WHERE id = ?', [req.params.id],
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}
				
				res.render('editar.jade', { juego: results[0] });
			}
		);
});

app.post('/actualizar', function(req, res) {
	client.query('UPDATE juegos SET nombre = ?, tipo = ? WHERE id = ?', [req.body.nombre, req.body.tipo, req.body.id],
			function() {			
				res.redirect('/');
			}
		);
});

app.get('/borrar/:id', function(req, res) {
	client.query('DELETE FROM juegos WHERE id = ?', [req.params.id],
		function() {
			res.redirect('/');
		}
	);
});

app.listen(3333);