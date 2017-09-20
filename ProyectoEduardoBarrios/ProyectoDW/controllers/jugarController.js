var Model = require('../models/jugarModel');
var modelo = new Model();

class Jugar{
    Index(request, response, next){
        var idJuego = request.params.id;
        //console.log("Id del juego REQUEST.PARAMS.ID "+idJuego);
        modelo.jugarIndexGetParticipantes(idJuego,(error,data)=>{
            if(!error)
            {
                console.log;
                if(data.length > 0){
                    response.render('juego/jugarIndex',{data : data});
                }
                else{
                    response.render('juego/jugarIndex',{sinDatos : true});
                }
                    
            }            
        });        
    }
}

module.exports = Jugar;