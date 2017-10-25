var conn = require('./conexion');

class homeModel{

    IndexPost(Usuario,Callback)
    {
        conn.query("CALL sp_ingresarParticipante(?,?,?);",[Usuario.nombre,Usuario.carne,Usuario.idJuego],Callback);                
    }

    GetPreguntasRespuestas(idJuego,indiceRegistro,isCorrecta,idParticipante,Callback)
    {             
        
        if(isCorrecta == null || isCorrecta == undefined || isCorrecta == NaN)
            isCorrecta = 2;
        else
            console.log(isCorrecta+" <- modelo");
        
        conn.query("CALL sp_getPreguntaRespuestas(?,?,?,?);",[idJuego,indiceRegistro,isCorrecta,idParticipante],Callback);
    }

    ValidarExisteJuego(idJuego,Callback)
    {
        conn.query("SELECT idJuego FROM juegos WHERE idJuego = ?",idJuego,Callback);
    }    

    //No usada
    SaveResultadoPreguta(registro,Callback)
    {
        conn.query("INSERT INTO resultados SET ?",registro,Callback);
    }
}

module.exports = homeModel;