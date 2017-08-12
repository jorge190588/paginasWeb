const mysql = require('mysql'),
    dbOptions = {
        host : 'localhost',
        user : 'root',
        password : '',
        port : 3306,
        database : 'db_quiz'
    }
    connection = mysql.createConnection(dbOptions);

    connection.connect((error) => {
        return (error)
            ? console.log('Conexion fallida')
            : console.log('Conexion Exitosa')
    });

    module.exports = connection; 