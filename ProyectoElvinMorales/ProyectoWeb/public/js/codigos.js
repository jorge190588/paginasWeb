$(document).ready(function(){
    
    function enabledLogin(){
        if($('#username').val() != "" && $('#password').val() != ""){
            $('#btn_continue').removeAttr('disabled');
        }else{
            $('#btn_continue').attr('disabled','disabled');
        }
    }

    $('#username, #password').keyup(enabledLogin);

    //para mostrar contraseña
    $('#show_pass').mousedown(function(){
        $('#password').removeAttr('type');
        $('#icon_eye').addClass('glyphicon-eye-close').removeClass('glyphicon-eye-open');
    });

    $('#show_pass').mouseup(function(){
        $('#password').attr('type','password');
        $('#icon_eye').addClass('glyphicon-eye-open').removeClass('glyphicon-eye-close');
    });

    //codigo para el tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //metodo para calificar el video
    $('input[type=radio][name=rating]').change(function(){
        var datos = {
            id_auth : $('#id_auth').val(),
            id_video : $('#id_video').val(),
            votos : this.value
        };

        console.log(datos);
        
        $.ajax({
            data: datos,
            url: '/calificar',
            type: 'post',
            beforeSend : function(){
                $('.msj').text('Procesando, espere por favor...');
            },
            success : function(response){
                $('#starRating').fadeOut("slow");
                $('.msj').delay(500).fadeIn("slow").html(" !Gracias por tu voto¡ </span><span class='label label-warning'>"+datos.votos+"</span> <span class='glyphicon glyphicon-star gl-votos'>");
                $('#total_votos').html("<span class='label label-success'> "+response.countVotos+" </span>")
            }
        });
    });

    //funcion o metodo para comentar con ajax
    function enabledComment(){
        if($('#comment').val() != ''){
            $('#btnComentar').removeAttr('disabled');
            $('#btnComentar_xs').removeAttr('disabled');
        }else{
            $('#btnComentar').attr('disabled','disabled');
            $('#btnComentar_xs').attr('disabled','disabled');
        }
    }

    //verificamos cada ves que se teclea en el campo de comentario
    $('#comment').keyup(enabledComment);

    /*$('#btnComentar, #btnComentar_xs').on('click', function(){
        $.ajax({
            data: $('#formDataComment').serialize(),
            url: '/comentar',
            type: 'post',
            success : function(){
                $('#comment').val('');
            }
        });
    });*/

    //metodos para agregar un nuevo video y su funcionalidad dinamica
    $('input[type=radio][name=categoria]').on('click', function(){
        $("#soloCategorias").slideUp('slow');
        $("#masDatos").slideDown('slow');
    });

    //metodo para regresar a seleccionar las categorias
    $('#btn_back_categoria').on('click',function(){
        $("#soloCategorias").slideDown('slow');
        $("#masDatos").slideUp('slow');
    });

    //metodo para eliminar una publicacion
    function eliminar(input){
        var eliminarOK = confirm("¿Estás seguro de elminar tu publicación?");
        return (eliminarOK) ? input.parentNode.submit() : false;
    }

    //tabs
    $('.nav-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    $('#btn_categoria_all').on('click', function(){
        
    });

    $('#search_str').on('click', function(){
        var string = $('#search').val();
        console.log(string);
    });
});