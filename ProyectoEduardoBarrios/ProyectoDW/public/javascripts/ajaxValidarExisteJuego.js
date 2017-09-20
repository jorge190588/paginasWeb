$(document).ready(function(){
    //Evento al cambiar el foco del input del idJuego
    $('#pin').blur(()=>{
        let IdJuego = $('#pin').val();
        
        if(IdJuego == ''){
            $('#btn-entrarJuego').attr('disabled',true);
            IdJuego = 0;
        }
        else{
            $('#btn-entrarJuego').attr('disabled',false);
        }
            

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
        if(resp == false){
            $('#noExisteJuego').show();
            $('#btn-entrarJuego').attr('disabled',true);
        }
        else{
            $('#noExisteJuego').hide();
            $('#btn-entrarJuego').attr('disabled',false);
        }        
    });
}

// funcion para validar que solo ingresen numeros en el nit
function validarCarne(e)
{
    key = e.keyCode || e.which;
    teclado = String.fromCharCode(key);
    caracteres = "0123456789";
    especiales = "8-37-38-46-164";
    teclado_especial = false;

        for(var i in especiales)
        {
            if(key==especiales[i])
            {
                teclado_especial = true;
                break;
            }
        }

        if(caracteres.indexOf(teclado) == -1 && !teclado_especial)
        {
            return false;
        }
}