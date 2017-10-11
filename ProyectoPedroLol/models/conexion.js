const mysql = require('mysql'),
    dbOptions = {
        host : 'localhost',
        user : 'root',
        password : '',
        port : 3306,
        database : 'juego'
    },
    connection = mysql.createConnection(dbOptions);

    connection.connect((error) => {
        if(error){
            console.log('Error en la conexion');
        }else{
            console.log('Conexion Exitosa');        }
    });

    module.exports = connection;