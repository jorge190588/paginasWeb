'use strict';

const   mysql = require('mysql'),
        conf = require('./db-conf'),
        dbOptions = {
            host : conf.mysql.host,
            user : conf.mysql.user,
            password : conf.mysql.password,
            port : conf.mysql.port,
            database : conf.mysql.database
        },
        conn = mysql.createConnection(dbOptions);

conn.connect((error) => {
    return (error)
        ? console.log(`Error al conectarse a MySQL: ${error.stack}`)
        : console.log(`Conexión establecida con MySQL N°: ${conn.threadId}`)
});

module.exports = conn;