const express = require('express'),
    pug = require('pug'),
    bodyParser = require('body-parser'),
    quizRoute = require('./routes/quiz-route'),
    publicDir = express.static(`${__dirname}/public`),
    viewDir = `${__dirname}/views`,
    port = (process.env.PORT || 3000);

let app = express();

app
    .set('views',viewDir)
    .set('view engine','pug')
    .set('port', port)

    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: false }))
    .use(publicDir)
    .use(quizRoute)

module.exports = app;