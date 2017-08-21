var Model = require('../models/jugarModel');
var modelo = new Model();

class Jugar{
    Index(request, response, next){
        var idJuego = request.params.id;
        //console.log("Id del juego REQUEST.PARAMS.ID "+idJuego);
        modelo.jugarIndexGetParticipantes(idJuego,(error,data)=>{
            if(!error)
            {
                response.render('juego/jugarIndex',{data : data});
            }            
        });        
    }
}

module.exports = Jugar;