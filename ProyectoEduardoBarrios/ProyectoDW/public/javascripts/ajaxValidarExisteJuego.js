$(document).ready(function(){
    //Evento al cambiar el foco del input del idJuego
    $('#pin').blur(()=>{
        let IdJuego = $('#pin').val();
        
        if(IdJuego == '')
            IdJuego = 0;

        //alert(IdJuego);
        existeJuego(IdJuego);
    });
});

function existeJuego(idJuego)
{
    $.ajax
    (
        {
            url : "ValidarExisteJuego/"+idJuego,
            type : "GET"
        }
    ).done(function(resp){
        //alert(resp);
        if(resp == false)
            $('#noExisteJuego').show();
        
        else
        $('#noExisteJuego').hide();
    });
}
