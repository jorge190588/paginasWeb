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
            email : request.body.email,
            password : request.body.password
        };
        console.log(user);
        am.getUser(user, (error, data) => {
            if(!error){
                if(data.length != 0){
                    request.session.username = (data.length != 0) ? user.email : null;
                    request.session.id_auth = (data.length != 0) ? data[0].id : null;
                    //console.log(request.session, '---', data);
                    if(request.session.username){
                        response.redirect('/inicio');
                        socketUsersConnect();
                        socketGetCountVideos();
                    }else{
                        response.redirect('/?error=Error en la autenticación verifique sus datos')
                    }
                }else{
                    response.redirect('/?error=Error en la autenticación verifique sus datos');
                }
            }
        });
    }

    signInGet(request, response, next){
        response.render('signin-form',{title: 'Registro de usuarios'});
    }

    signInPost(request, response, next){
        let user = {
            id : 0,
            name : request.body.name,
            last_name : request.body.last_name,
            email : request.body.email,
            password : request.body.password
        };
        console.log(user);
        am.setUser(user, (error) => {
            if(!error){
                response.redirect(`/?message=El registro ha sido creado exitosamente`);
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