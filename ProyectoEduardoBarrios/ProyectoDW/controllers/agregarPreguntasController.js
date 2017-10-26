const Model = require('../models/agregarPreguntasModel');
var inst = new Model();

class addPreguntas
{
    getOneGame(req, res, next){
        var idJuego = req.params.id;
        //console.log("Id "+idJuego);
        return(req.session.emailUserAdmin)
        ? inst.getOneGameQuestionsModel(idJuego,(error, data) =>{            
            if(!error){            
                if(data.length < 1){
                    console.log("Data viene vacío :(");
                    inst.getOneGameModel(idJuego,(error,data)=>{
                        res.render('juego/agregarPreguntas',{data : data, sesion : req.session.emailUserAdmin});
                    });                    
                }                    
                else{
                    console.log("Data NO viene vacio :)");
                    res.render('juego/agregarPreguntas',{data : data, sesion : req.session.emailUserAdmin});
                }                
            }
          })
        : res.redirect('/notFound');

        /*inst.getPreguntasDeJuegos(idJuego,(err,data)=>{
            if(!err)
            {
                res.render("juego/agregarPreguntas",{preguntas : data});
            }
        });*/

    }

    nuevaPreguntaGet(req, res, next)
    {
        return(req.session.emailUserAdmin)
        ? res.render('juego/insertarNuevaPregunta', {title : 'Nueva pregunta', sesion : req.session.emailUserAdmin})
        : res.redirect('/notFound');
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
    }

    // este metodo solo es test 
    getPreguntas(req,res,next)
    {
        var idJuego = 5;
        inst.getPreguntasDeJuegos(idJuego,(err,data)=>{
            if(!err)
            {
                console.log(data);
                //console.log("Id del juego en Controller ->> "+idJuego)
                res.render("juego/prueba",{data : data});
            }
        });
    }
}

module.exports = addPreguntas;