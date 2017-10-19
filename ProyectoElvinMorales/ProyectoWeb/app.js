'use strict';

const   express         = require('express'),
        http            = require('http'),
        socketIO        = require('./routes/socket_server.js'),
        pug             = require('pug'),
        bodyParser      = require('body-parser'),
        session         = require('express-session'),
        errors          = require('./middlewares/errors'),
        moment          = require('moment'),
        auth            = require('./routes/auth-router'),
        routes          = require('./routes/videos-router'),
        serveFavicon    = require('serve-favicon')(`${__dirname}/public/image/favicon.png`),
        publicDir       = express.static(`${__dirname}/public`),
        viewDir         = `${__dirname}/views`,
        sessionMiddleware = session({
                secret : 'shhhhhhh',
                resave: true,
                saveUninitialized: false
        }),
        port = (process.env.PORT || 8080);

let app = express();
let server = http.createServer(app);
socketIO.handle(server, sessionMiddleware);

app
        .set('views', viewDir)
        .set('view engine', 'pug')
        .set('port', port)

        .use(sessionMiddleware)
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({ extended: false }))
        .use(publicDir)
        .use(serveFavicon)
        
        .use(auth)
        .use(routes)
        .use(errors.http404);

app.locals.moment = require('moment');
moment.locale('es');

server.listen(app.get('port'), () => {
        console.log(`Express y MYSQL server listening on port ${app.get('port')}`);
});