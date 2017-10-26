'use strict';
const conn = require('./conexion');

class AuthModel{
    CrearCuentaModel(usuario,Callback)
    {
        //console.log(usuario);
        conn.query("CALL sp_insertarUsuario(?,?,?,?);",[usuario.nombres,usuario.apellidos,usuario.correo,usuario.password],Callback);
    }

    Login(credenciales,Callback)
    {    
        conn.query("SELECT * FROM usuarios WHERE Email='"+credenciales.email+"' AND Password='"+credenciales.password+"'",Callback);
    }
}

module.exports = AuthModel;