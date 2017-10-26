var Model = require('../models/jugarModel');
var modelo = new Model();

class Jugar{
    Index(request, response, next){
        var idJuego = request.params.id;
        //console.log("Id del juego REQUEST.PARAMS.ID "+idJuego);
        //Guardo el id del juego en una variable de sesion porque se usara para el resultado final
        request.session.idJuegoAdmin = idJuego;
        
        var sesionUsuario = request.session.emailUserAdmin;

        return(request.session.emailUserAdmin)
            ? modelo.jugarIndexGetParticipantes(idJuego,(error,data)=>{
                if(!error)
                {
                    console.log;
                    if(data.length > 0){
                        response.render('juego/jugarIndex',{data : data, idJuego : idJuego, sesion : sesionUsuario});
                    }
                    else{
                        response.render('juego/jugarIndex',{sinDatos : true, idJuego : idJuego, sesion : sesionUsuario});
                    }
                        
                }            
            })
            : response.redirect('/notFound');        
    }

    IniciarJuego(req,res,next)
    {
        var idJuego = req.params.id;
        let iniciado = 0;
        modelo.IniciarJuego(idJuego,(error,data)=>{
            if(!error)
            {                
                if(data.length > 0){
                    //console.log(data[0][0].juegoIniciado);
                    iniciado = data[0][0].juegoIniciado;
                    res.send(data);
                }                    
            }
        });
    }

    ResultadoFinalJuego(req,res,next)
    {
        //verificar que exista el idJuego en session
        console.log("idJuegoAdmin-Session: "+req.session.idJuegoAdmin);
        modelo.ResultadoFinalJuego(req.session.idJuegoAdmin,(error,data)=>{
            (!error)
            {
                res.send(data);
            }
        });
    }
}

module.exports = Jugar;