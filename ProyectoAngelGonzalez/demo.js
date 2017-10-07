var mysql=require('mysql');
var client= mysql.createClient({
	host: 'localhost',
	user: 'root',
	password: '',
});

client.database= 'juegos';

function listarJuegos(callback){
	client.query('SELECT id, nombre, tipo FROM juegos',
			function selectCb(err, results, fields){
				console.log("lista juegos entro");
				callback(err,results,fields);

			}
		);

}

module.exports.listarJuegos=listarJuegos;