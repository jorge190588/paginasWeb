'use strict';

const   authController      = require('../controllers/auth-controller'),
        express             = require('express'),
        router              = express.Router(),
        ac                  = new authController();

router
    .get('/', ac.index)
    .get('/login', ac.logInGet)
    .post('/login', ac.logInPost)
    .get('/signin', ac.signInGet)
    .post('/signin', ac.signInPost)
    .get('/logout', ac.logOut)
    .get('/message', ac.chat);

module.exports = router;