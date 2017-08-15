var	app = require('./app'),
	server = app.listen(app.get('port'), () => {
		console.log(`Servidor Iniciado en el puerto ${app.get('port')}`);
	})