const Model = require('../models/juegosDefaultModel'),
      inst = new Model();
//var moment = require('moment');      

class JuegosDefault{
    getJuegos(req, res, next){
        let idUsuarioCreaJuegos = req.session.idUsuarioCreaJuegos;
        let nombreUsuarioCreaJuegos = req.session.usuarioCreaJuegos;
        //console.log("Nombre del usuario recien-creado getJuegos -> "+req.session.usuarioCreaJuegos);
        return (req.session.emailUserAdmin) 
        ? inst.getJuegos(idUsuarioCreaJuegos,(error, data) =>{
            if(!error){            
                if(data.length > 0)
                    res.render('default', {titulo : 'Objeto', data : data, fecha: data.fechaCreacion, sesion : req.session.emailUserAdmin});

                else
                    res.render('default', {titulo : 'Objeto', sinDatos : true, nombreUsuario : nombreUsuarioCreaJuegos, sesion : req.session.emailUserAdmin});

            }
        })
        : res.redirect('/notFound');
    }

    crearJuegoGet(request, response, next)
    {
        return(request.session.emailUserAdmin)
        ? response.render('juego/nuevoJuego',{title : 'Nuevo Juego GET', sesion : request.session.emailUserAdmin})
          //console.log("Entraste a crear un juego nuevo")
        : response.redirect('/notFound');
        
    }

    crearJuegoPost(request, response, next)
    {
        console.log('Crear Juego POST');
        let juego = 
        {
            titulo: request.body.titulo,
            descripcion: request.body.descripcion,
            idUsuarioCrea: request.session.idUsuarioCreaJuegos,
            juegoIniciado: 0
        };
        
        //console.log(juego);

        inst.nuevoJuegoPost(juego, (error)=>{
            if(!error)
            {
                response.redirect('/default');
            }
            else
            {
                return next(new Error('Error no se guardo el registro'));
            }
        });
    }

    editarJuego(request,response,next)
    {
        console.log("Editar Juego POST");
        let juego = 
        {
            //Lo que esta del lado izquierdo tiene que ir igual como esta en la db
            idJuego: request.body.id,
            Titulo: request.body.titulo,
            Descripcion: request.body.descripcion        
        };
        //console.log(juego);
        return(request.session.emailUserAdmin)
        ? inst.editarJuego(juego, (error)=>{
            if(!error)
            {
                response.redirect('/default');
            }
         })
        : response.redirect('/notFound');
        
    }

    eliminarJuego(request, response, next)
    {
        console.log("Eliminar un Juego POST");
        let idJuego = request.params.id;
        
        console.log("Id "+idJuego);

        return(request.session.emailUserAdmin)
        ?
            inst.eliminarJuego(idJuego, (error)=>{
                if(!error)
                {
                    response.redirect('/default');
                }
            })
        : response.redirect('/notFound');
        
    }
}

module.exports = JuegosDefault;