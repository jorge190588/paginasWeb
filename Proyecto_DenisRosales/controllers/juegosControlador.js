class Juegos
{
	listaJuegos(req, res)
	{
		res.render('listaJuegos',{title:'Lista de Juegos'});
	}

	crearJuego(req, res)
	{
		res.render('crearJuego',{title:'Crear Juego'});
	}

	gameindividual(req, res)
	{
		res.render('gameindividual',{title:'Juego individual'});
	}
}

module.exports = Juegos;