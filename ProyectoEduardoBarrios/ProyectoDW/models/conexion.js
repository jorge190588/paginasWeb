const mysql = require('mysql'),
      conf = require('../config/config'),
      dbOptions = {
        host: conf.host,
        user: conf.user,
        password: conf.password,
        port: conf.port,
        database: conf.database
      },

      conn = mysql.createConnection(dbOptions);

conn.connect((error) => {
    return (error)
        ? console.log(`Error al conectarse a Mysql: ${error.stack}`)
        : console.log(`Conexión establecida con Mysql: ${conn.threadId}`)
});    

module.exports = conn;