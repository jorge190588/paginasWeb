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

//FUNCION PRINCIPAL

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


//FUNCION PRINCIPAL SE TOMO PARA CREAR OTRA FUNCION DIFERENTE
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

//FUNCION PARA MOSTRAR DATOS DE JUEGO
app.get('/jugar', function(req, res) {
	
	client.query('SELECT id, nombre, tipo FROM juegos',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}
				//res.send(results)
				res.render('jugar.jade', { juegos: results });
			}
		);
});



//FUNCION PARA MOSTRAR DATOS DE LOS PARRAFOS
app.get('/parrafo/:idJuego', function(req, res) {
	
	var idJuego = req.params.idJuego;
	console.log(idJuego);
	client.query('SELECT id, parrafo, pregunta, respuesta1, respuesta2, idjuego FROM parrafos',
			function selectCb(err, results, fields) {
				if (err) {
					throw err;					
				}
				//console.log(results);
				res.render('parrafo.jade', { parrafos: results , idJuego : idJuego});
			}
		);
});
//FUNCION PARA ENVIAR DATOS DE JUEGO A BASE DE DATOS

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

//mostrar preguntas una a una

app.get('/mostrarjuego/:idjuego/:idPregunta', function(req, res) {

	//console.log("Id del Juego -> "+req.params.idjuego+" Id Pregunta -> "+req.params.idPregunta);
	var idJuego = req.params.idjuego;
	var idPregunta = parseInt(req.params.idPregunta)-1;
	console.log("Id juego "+idJuego);
	console.log("Id Pregunta "+idPregunta);

	var siguientePregunta = parseInt(req.params.idPregunta)+1;

	client.query('SELECT id, parrafo, pregunta, respuesta1, respuesta2, idjuego FROM parrafos  WHERE idjuego = '+idJuego+' LIMIT '+idPregunta+',1', 
			function selectCb(err, results, fields) {
				//console.log(results.length);
				//res.send(results.length.toString());
				// si results.length.toString() == 0 reenderiar otra visa
				if (err) {
					throw err;					
				}
				// res.data="<script>var preguntaActual=1;</script>"
				//res.send(results);
				if(results.length > 0)
					res.render('mostrarjuego.jade', { juego: results[0] , idJuego: idJuego ,siguientePregunta : siguientePregunta}); 

				else
					res.send("<h1>Juego Finalizado</h1>");
				

			}
		);
});


app.listen(3333);