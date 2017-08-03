'use strict';

const authModel = require('../models/auth-model'),
    errors  = require('../middlewares/errors'),
    am = new authModel();

class AuthController{
    index(request, response, index){
        if(request.session.username){
            response.redirect('/inicio');
        }else{
            response.render('login-form',{
                title: 'Iniciar sesión',
                message: request.query.message,
                error: request.query.error
            });
        }
    }

    logInGet(request, response, next){
        response.redirect('/');
    }

    logInPost(request, response, next){
        let user = {
            username : request.body.username,
            password : request.body.password
        };
        console.log(user);
        am.getUser(user, (error, data) => {
            if(!error){
                request.session.username = (data.length != 0) ? user.username : null;
                console.log(request.session, '---', data);
                return (request.session.username) 
                    ? response.redirect('/inicio') 
                    : response.redirect('/?error=Error en la autenticación verifique sus datos')
            }
        });
    }

    signInGet(request, response, next){
        response.render('signin-form',{title: 'Registro de usuarios'});
    }

    signInPost(request, response, next){
        let user = {
            id : 0,
            username : request.body.username,
            password : request.body.password
        };
        console.log(user);
        am.setUser(user, (error) => {
            if(!error){
                response.redirect(`/?message=El usuario ${user.username} ha sido creado`);
            }
        });
    }

    logOut(request, response, next){
        request.session.destroy((error) => {
            return (error)
                ? errors.http500(request, response, next)
                : response.redirect('/');
        });
    }
}

module.exports = AuthController;