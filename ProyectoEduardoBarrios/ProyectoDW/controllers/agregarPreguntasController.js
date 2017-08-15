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

    nuevaPreguntaPost(req,res,next)
    {
        var pregunta = {
            pregunta : req.body.pregunta,
            tiempo : req.body.tiempo,
            idJuego : req.body.idJuego
        };

        var respuestas = {
            //respuesta : req.body.respuesta1
            resp1 : req.body.respuesta1,
            resp2 : req.body.respuesta2,
            resp3 : req.body.respuesta3,
            resp4 : req.body.respuesta4,
            correcta : req.body.optionsRadios 
        };

        var respCorrectas = {
            respCorrecta1 : respuestas.correcta == 1 ? true : false,
            respCorrecta2 : respuestas.correcta == 2 ? true : false,
            respCorrecta3 : respuestas.correcta == 3 ? true : false,
            respCorrecta4 : respuestas.correcta == 4 ? true : false,
        };

        console.log(pregunta);
        console.log(respuestas);
        console.log(respCorrectas);

        inst.nuevaPreguntaPost(pregunta,respuestas,respCorrectas,(err,result)=>{
            if(!err){
                res.redirect('/juegoCreado/'+pregunta.idJuego);                    
            }         
        });
        
        
        

        /*inst.nuevaPreguntaPost(pregunta,respuestas,respCorrectas,(error)=>{
            if(!error)
            {
                res.redirect('/juegoCreado/'+pregunta.idJuego);
            }
        });*/
    }
}

module.exports = addPreguntas;