// home controller
var Model = require('../models/homeModel');
var obj = new Model();

var url = require('url');

class Index{
    // funciones del controller
    // mostrar el panel para ingresar a jugar
    IndexGet(req,res,next){
        res.render('index', {title : 'Proyecto DW'});
    }

    // procesar los datos del panel con datos para jugar
    IndexPost(req,res,next){
        var usuario = {
            idJuego : req.body.pin,
            carne : req.body.carne,
            nombre : req.body.nombre
        };

        // almacenando el nombre del usuario en una variable de session
        req.session.nombre = req.body.nombre;
        console.log(req.session.nombre);
        obj.IndexPost(usuario,(error,data)=>{
            if(!error){            
                var rowCount = data[1][0].rc;

                console.log(rowCount);                
                if(rowCount <= 0){                
                    res.render('index',{mensaje : "El pin del juego no existe o es incorrecto"});
                    //console.log('incorrecto');
                    
                }
                else{
                    res.redirect("/ProcesarJuego/"+usuario.idJuego+"/1");
                    //console.log('correcto');
                }
            }
        });
    }

    JuegoEnEspera(req,res,next)
    {
        // variable para parsear un parametro que venga por get de un form
        var queryString = url.parse(req.url,true).query;

        var correcta;
        var indiceRegistro = 0;
        var idJuego = req.params.id;                
        var respuesta = queryString.respuesta;
        var indiceGet = parseInt(queryString.incremento);
        var numeroPreguntas = queryString.numPreguntas;

        
        if(indiceRegistro < parseInt(numeroPreguntas)){                                     
            indiceRegistro++;
            console.log("Indice Registro -> "+(indiceRegistro));  
        }        
        
        //console.log("Indice Registro -> "+(indiceRegistro));
        //console.log("Valor incremento get -> "+(incremento));
        console.log("Respuesta escogida -> "+respuesta);
        
        obj.GetPreguntasRespuestas(idJuego,indiceRegistro,(error,data)=>{
            if(!error)
            {
                console.log(data[4][0].respuesta);
                if(indiceRegistro == 0)
                {
                    correcta = undefined;
                }
                else{
                    correcta = data[4][0].respuesta == respuesta ? true : false;
                }
                res.render('juego/juegoEnEspera',{title:'Juego',data : data, correct : correcta });
            }
        });
        
    }

    ProcesarJuego(req,res,next){
        //res.send('<h1>Prueba de procesar juego</h1>'+req.params.idJuego+" id Pregunta "+req.params.idPregunta);
        var idJuego = req.params.idJuego;
        var idPregunta = parseInt(req.params.idPregunta)-1;
        var preguntaSiguiente = parseInt(req.params.idPregunta)+1;
        //console.log(idJuego);
        console.log("Id Pregunta -> "+idPregunta);    

        // este valor almacena si es correcta o no la respuesta y es un campo oculto en el form
        var queryString = url.parse(req.url,true).query;
        var isCorrecta = queryString.isCorrect;
        console.log(isCorrecta+" <- controlador");

        return (req.session.nombre) 
            ? obj.GetPreguntasRespuestas(idJuego,idPregunta,isCorrecta,(error,data)=>{
                if(!error){
                    //console.log(data);
                    //res.send(data);
                    //res.send(data[0].length.toString());                
                    let respuestaCorrecta = data[4][0].respuesta.toLowerCase();

                    
                                    

                    if(data[0].length > 0){                                    
                        console.log("RESPUESTA CORRECTA ->"+respuestaCorrecta);                
                        //console.log("CANTIDAD CORRECTAS -> "+data[6][0].cantCorrectas+" CANTIDAD INCORRECTAS -> "+data[6][0].cantIncorrectas);

                        
                        res.render('juego/juegoEnEspera',{data : data, idPreguntaSiguiente : preguntaSiguiente , correcta : respuestaCorrecta});
                    }                    

                    else{
                        //cantidad de correctas e incorrrectas
                        //console.log("Resp Correctas -> "+data[6].length);
                        var cantCorrectas = 1;
                        var cantIncorrectas = 1;
                        // si no hay respuestas aun se incian en cero
                        if(data[6].length > 0){
                            cantCorrectas = data[6][0].cantCorrectas;
                            cantIncorrectas = data[6][0].cantIncorrectas;                                        
                        }
                        else{
                            cantCorrectas = 0;
                            cantIncorrectas = 0;
                        }
                        res.render('juego/juegoEnEspera',{terminado : true, usuario : req.session.nombre ,cantidadCorrectas : cantCorrectas, cantidadIncorrectas : cantIncorrectas});
                    }
                        
                }                
                
                else
                    res.redirect('/notFound');

                
            })
            : res.redirect('/notFound');              
    }

    // Cambiar a null el usuario en req.session.nombre
    CerrarSesion(req,res,next)
    {
        req.session.nombre = null;
        res.redirect('/');
    }

    default(req,res,next){
        res.render('default', {titulo : 'Default'});
    }

    new(req,res,next){
        res.render('optionNew');
    }
}

module.exports = Index;