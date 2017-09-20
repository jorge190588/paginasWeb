'use strict';
const conn = require('./conexion');

class AuthModel{
    CrearCuentaModel(usuario,Callback)
    {
        //console.log(usuario);
        conn.query("CALL sp_insertarUsuario(?,?,?,?);",[usuario.nombres,usuario.apellidos,usuario.correo,usuario.password],Callback);
    }
}

module.exports = AuthModel;