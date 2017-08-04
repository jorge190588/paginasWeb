const Model = require('../models/agregarPreguntasModel');
var inst = new Model();

class addPreguntas
{
    getOneGame(req, res, next){
        var idJuego = req.params.id;
        console.log("Id "+idJuego);
        inst.getOneGameModel(idJuego,(error, data) =>{
            if(!error){            
                res.render('juego/agregarPreguntas',{data : data});
            }
        });
    }

    nuevaPreguntaGet(req, res, next)
    {
        res.render('juego/insertarNuevaPregunta', {title : 'Nueva pregunta'});
    }
}

module.exports = addPreguntas;