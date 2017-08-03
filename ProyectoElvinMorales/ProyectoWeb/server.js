'use strict';
const app = require('./app'),
    server = app.listen(app.get('port'), () => {
        console.log(`Iniciando el servidor con MySQL y Express en el puerto ${app.get('port')}`);
    });