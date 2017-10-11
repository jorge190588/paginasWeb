'use strict';
const modelEncuesta = require('../models/encuesta-model'),
    objEncuesta = new modelEncuesta();

class EncuestaController {

    index(request, response, next){
        objEncuesta.obtenerTodasLasEncuestas((error, data) => {
            if(!error){
                response.render('index',{
                    title : 'ENCUESTAS',
                    data : data
                });
            }else{
                console.log('error ',error)
            }
        });
    }
    ingresar_preguntas(request, response, next){
        var id = request.params.id;
        objEncuesta.obtenerPreguntasSegunEncuesta(id, (error,data) => {
            response.render('cuestionario',{
                title : 'PREGUNTAS',
                data : data,
                id_encuesta: id
            }) 
        })  
    }
    crear_encuesta(request, response, next){
        objEncuesta.obtenerUnaEncuesta(request.params.id,(error,data) => {
            response.render('crear_encuesta',{
                title : 'CREAR ENCUESTA',
            }) 
        })  

    }
    guardar_encuesta(request, response, next){
        var encuesta={
            ID : 0,
            TITULO : request.body.titulo,
            DESCRIPCION :request.body.descripcion,
            CODIGO_ACCESO : request.body.acceso
        };
        objEncuesta.guardar_encuesta(encuesta, (error) => {
            response.redirect('/');
        });
    }
    eliminar_encuesta(request, response, next){ 
        objEncuesta.eliminar_encuesta(request.params.id, (error) => {
            response.redirect('/')
        })
    }
    guardar_pregunta(request, response, next){
        var id = request.body.id_encuesta;
        console.log(id);
        var pregunta = {
            ID_ENCUESTA : id,
            PREGUNTA : request.body.pregunta
        };
        objEncuesta.guardar_pregunta(pregunta, ()=>{
            response.redirect('/preguntas/'+id);
        });
    }
    login(reuqest,response,next){
        response.render('login');
         
    }
    Respuestas(request, response, next){
            response.render('Respuestas',{
                title : 'INGRESANDO RESPUESTAS',
            }) 
    }
    jugando(request, response, next){
            response.render('jugando',{
                title : 'Jugando !!!!',
            }) 
    }
    eliminar_preguntas(request, response, next){
        objEncuesta.eliminar_preguntas(request.params.id, (error) => {
            response.redirect('/cuestionario/')
        })
    }
}
module.exports = EncuestaController;