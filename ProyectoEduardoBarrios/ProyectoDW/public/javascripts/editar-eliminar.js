function cargarDatos(id,titulo,descripcion,cantPreguntas)
{
    //alert(id+" "+titulo);
    $('#idJuego').val(id);
    $('#titulo').val(titulo);
    $('#descripcion').val(descripcion);
    $('#cantidadPreguntas').val(cantPreguntas);
}

function confirmarEliminacion(input)
{
    if (window.confirm("Esta seguro que desea eliminar este registro?") == true)
    {
        input.parentNode.submit();
    }
}