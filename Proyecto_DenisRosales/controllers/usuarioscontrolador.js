class usuarios
{
    login(req, res)
	{
		res.render('login',{title:'iniciar sesion'});
	}

    crearUsuario(req, res)
	{
		res.render('crearUsuario',{title:'Crear Usuario'});
	}

}
module.exports = usuarios;