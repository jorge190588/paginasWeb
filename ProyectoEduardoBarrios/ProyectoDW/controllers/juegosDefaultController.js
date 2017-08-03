const Model = require('../models/juegosDefaultModel'),
      inst = new Model();
var moment = require('moment');      

class JuegosDefault{
    getJuegos(req, res, next){
        inst.getJuegos((error, data) =>{
            if(!error){            
                res.render('default', {titulo : 'Objeto', data : data, fecha: data.fechaCreacion});
            }
        });
    }

    crearJuegoGet(request, response, next)
    {
        response.render('juego/nuevoJuego',{title : 'Nuevo Juego GET'});
        console.log("Entraste a crear un juego nuevo");
    }

    crearJuegoPost(request, response, next)
    {
        var juego = 
        {
            titulo: request.body.titulo,
            descripcion: request.body.descripcion,
            idPreguntas: request.body.cantidad-preguntas,
            //fechaCreacion: new Date(getDate())

        }
        
        console.log(`Propiedades del juego ${juego}`);

        inst.nuevoJuego(juego, (error)=>{
            if(!error)
            {
                response.render('/default');
            }
            if(error){
                throw error;
                console.log('Este es el error ->> '+error);        
                response.render('/default',{err : 'Ha ocurrido un error '+error})
            } 
        });
    }
}

module.exports = JuegosDefault;