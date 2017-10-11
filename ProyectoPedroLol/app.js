'use strict';

const express = require('express'),
      pug     = require('pug'),
      bodyparser = require('body-parser'),
      encuestaRoutes  = require ('./routes/encuesta-route'),
      publicDir = express.static(`${__dirname}/public`),
      viewDir = `${__dirname}/views`,
      port = (process.env.PORT || 3000);

let app = express();

app 
        .set('views',viewDir)
        .set('view engine', 'pug')
        .set('port',port)

        .use(bodyparser.json())
        .use(bodyparser.urlencoded({ extended: false }))
        .use(publicDir)
        .use(encuestaRoutes);

module.exports = app;