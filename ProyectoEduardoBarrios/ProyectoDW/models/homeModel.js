var conn = require('./conexion');

class homeModel{

    IndexPost(Usuario,Callback)
    {
        conn.query("CALL sp_ingresarParticipante(?,?,?);",[Usuario.nombre,Usuario.carne,Usuario.idJuego],Callback);                
    }
}

module.exports = homeModel;