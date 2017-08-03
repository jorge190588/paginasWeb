function cargarDatos(id,titulo,descripcion,cantPreguntas)
{
    //alert(id+" "+titulo);
    $('#idJuego').val(id);
    $('#titulo').val(titulo);
    $('#descripcion').val(descripcion);
    $('#cantidadPreguntas').val(cantPreguntas);
}

function confirmarEliminacion(id)
{
    if (window.confirm("Esta seguro que desea eliminar este registro?") == true)
    {
        window.location = "/eliminar/idJuego/"+id;
    }
}