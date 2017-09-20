const Model = require('../models/juegosDefaultModel'),
      inst = new Model();
var moment = require('moment');      

class JuegosDefault{
    getJuegos(req, res, next){
        let idUsuarioCreaJuegos = req.session.idUsuarioCreaJuegos;
        let nombreUsuarioCreaJuegos = req.session.usuarioCreaJuegos;
        //console.log("Nombre del usuario recien-creado getJuegos -> "+req.session.usuarioCreaJuegos);
        return (idUsuarioCreaJuegos) 
        ? inst.getJuegos(idUsuarioCreaJuegos,(error, data) =>{
            if(!error){            
                if(data.length > 0)
                    res.render('default', {titulo : 'Objeto', data : data, fecha: data.fechaCreacion});

                else
                    res.render('default', {titulo : 'Objeto', sinDatos : true, nombreUsuario : nombreUsuarioCreaJuegos });

            }
        })
        : res.redirect('/notFound');
    }

    crearJuegoGet(request, response, next)
    {
        response.render('juego/nuevoJuego',{title : 'Nuevo Juego GET'});
        console.log("Entraste a crear un juego nuevo");
    }

    crearJuegoPost(request, response, next)
    {
        console.log('Crear Juego POST');
        let juego = 
        {
            titulo: request.body.titulo,
            descripcion: request.body.descripcion,
            idUsuarioCrea: request.session.idUsuarioCreaJuegos
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
        console.log(juego);
        inst.editarJuego(juego, (error)=>{
            if(!error)
            {
                response.redirect('/default');
            }
        });
        
    }

    eliminarJuego(request, response, next)
    {
        console.log("Eliminar un Juego POST");
        let idJuego = request.params.id;
        
        console.log("Id "+idJuego);
        inst.eliminarJuego(idJuego, (error)=>{
            if(!error)
            {
                response.redirect('/default');
            }
        });
        
    }
}

module.exports = JuegosDefault;