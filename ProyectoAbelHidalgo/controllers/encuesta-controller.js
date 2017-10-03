'use strict';
const modelEncuesta = require('../models/encuesta-model'),
    objEncuesta = new modelEncuesta();

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function trim(){ 
        return this.replace(/^\s+|\s+$/g, ""); 
    };

class EncuestaController {

    index(request, response, next){
        objEncuesta.obtenerTodasLasEncuestas((error, data) => {
            if(!error){
                response.render('index',{
                    title : 'DirectQuiz',
                    data : data
                });
            }else{
                console.log('error ',error)
            }
        });
    }

    ingresar_preguntas(request, response, next){
        var id_encuesta = parseInt(request.params.id);
        objEncuesta.obtenerUnaEncuesta(request.params.id,(error,data) => {
            objEncuesta.obtenerPreguntasEncuesta(id_encuesta, (error,respuestas)=>{
                response.render('preguntas',{
                    title : 'PREGUNTAS',
                    data : data,
                    id_encuesta: id_encuesta,
                    respuestas: respuestas
                })
            });
        });
    }

    verificando_pin(request, response, next){
        var pin = request.body.pin;
        objEncuesta.verificar_pin(pin, (error,data)=>{
            
            if(data.length != 0){
                objEncuesta.obtenerPreguntasPlay(data[0].ID, (error, questions)=>{
                    response.render('play',{
                        titulo: data[0].TITULO,
                        data: questions
                    });
                });
            }else{
                response.render('pin_no_found');
            }
        });
    }

    mostrarTodasLasEncuestas(request, response, next){
        objEncuesta.obtenerTodasLasEncuestas((error,data) => {
            response.render('crear_encuesta',{
                title : 'CREAR QUIZ',
                data: data
            });
        });
    }

    guardar_encuesta(request, response, next){
        var codigo = getRandomArbitrary(1,1000);
        var id_encuesta = 0;
        objEncuesta.obtenerIdMaximoEncuestaGuardada((error, rows, fields)=>{
            if(rows[0].id == null){
                id_encuesta = 1;
            }else{
                id_encuesta = rows[0].id;
            }
            var PIN = `${id_encuesta}${codigo}`;

            var encuesta={
                ID : 0,
                TITULO : request.body.titulo,
                CODIGO_ACCESO : PIN
            };
            objEncuesta.guardar_encuesta(encuesta, (error) => {
                response.redirect('/crear_encuesta');
            })
        });
    }

    guardar_pregunta(request, response, next){
        var pregunta = {
            ID_ENCUESTA: request.body.id_encuesta,
            PREGUNTA: request.body.pregunta,
            PUNTAJE: 10
        };

        objEncuesta.guardar_pregunta(pregunta, (error)=>{
            objEncuesta.obtenerIdMaximoPreguntaGuardada((error, rows, fields)=>{
                var respuesta = {
                    ID_PREGUNTA: rows[0].id,
                    RESPUESTA: request.body.respuesta
                };
                objEncuesta.guardar_respuesta(respuesta, (error)=>{
                    response.redirect('/preguntas/'+pregunta.ID_ENCUESTA);
                });
            });
        });
    }

    delete(request, response, next){
        let id = request.params.id;

        objEncuesta.delete(id, (error)=>{
            if(!error){
                objEncuesta.delete_question(id);
                response.redirect('/crear_encuesta');
            }
        });
    }
}
module.exports = EncuestaController;