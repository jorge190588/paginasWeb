var mysql   = require('mysql');
var config  = require('../database/db-conf');

var dbOptions = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    port: config.mysql.port,
    database: config.mysql.database
};

var connection = mysql.createConnection(dbOptions);
connection.connect((error)=>{
    if(error){
        console.log(`Error al conectarse a MySQL: ${error.stack}`)
    }else{
        console.log(`Conexión establecida con MySQL N°: ${connection.threadId}`)
    }
});

module.exports = connection;