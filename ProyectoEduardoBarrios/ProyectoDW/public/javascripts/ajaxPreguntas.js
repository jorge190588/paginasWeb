$(function(){
    $("#enviar-pregunta").click(function(){        
        //var idJuego = ("$idPregunta");
        var idJuego = 19 
        var idPregunta = 1;
        nextQuestion(idJuego,idPregunta)
    });
    
});

function nextQuestion(idJuego,idPregunta)
{   
    $.ajax({        
        type: 'GET',
        url: '/ProcesarJuego/'+idJuego+'/'+idPregunta
    }).done(function(resp){
        //console.log(resp);
        //alert(resp);
        //$('#contenedor-preguntas').html(resp);
    });
}
