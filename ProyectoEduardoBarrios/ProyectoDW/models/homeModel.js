var conn = require('./conexion');

class homeModel{

    IndexPost(Usuario,Callback)
    {
        conn.query("CALL sp_ingresarParticipante(?,?,?);",[Usuario.nombre,Usuario.carne,Usuario.idJuego],Callback);        
        //conn.query("SELECT ROW_COUNT();",Callback);
    }
}

module.exports = homeModel;