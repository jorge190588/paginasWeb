'use strict';

let authModel = require('../models/auth-model'),
    errors  = require('../middlewares/errors'),
    express = require('express'),
    crypto = require('crypto');

function encriptar(user, pass) {
   // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
   var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
   return hmac
}

class AuthController{

    //dependiendo si se esta logueado se renderiza la vista inicio sino la vista login-form
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

    //es llamado atravez de la ruta .get('/login', ac.logInGet) para su respectiva redireccion al login
    logInGet(request, response, next){
        response.redirect('/');
    }

    //Metodo para loguearse en el sistema
    logInPost(request, response, next){
        let cryptoPassword = encriptar(request.body.email,request.body.password);
        let user = {
            email : request.body.email,
            password : cryptoPassword
        };
        authModel.getUser(user, (error, data) => {
            if(!error){
                if(data.length != 0){
                    request.session.username = (data.length != 0) ? user.email : null;
                    request.session.id_auth = (data.length != 0) ? data[0].id : null;
                    request.session.name = (data.length != 0) ? `${data[0].name}` : null;
                    request.session.full_name = (data.length != 0) ? `${data[0].name} ${data[0].last_name}` : null;
                    request.session.avatar = (data.length != 0) ? `${data[0].avatar}` : null;
                    //console.log(request.session, '---', data);
                    if(request.session.username){                        
                        response.redirect('/inicio');                        
                    }else{
                        response.redirect('/?error=Error en la autenticación verifique sus datos')
                    }
                }else{                    
                    response.redirect('/?error=Error en la autenticación verifique sus datos');
                }
            }
        });
    }

    //invoca el formulario para el registro
    signInGet(request, response, next){
        response.render('signin-form',{title: 'Registro de usuarios'});
    }

    //metodo para insertar los registros recopilados a la db
    signInPost(request, response, next){
        let avatar = '';
        let gender = '';
        let cryptoPassword = encriptar(request.body.email,request.body.password);
        if(parseInt(request.body.gender) == 1){
            avatar = 'male.png';
            gender = 'Hombre';
        }else{
            avatar = 'female.png';
            gender = 'Mujer';
        }
        let user = {
            id : 0,
            name : request.body.name,
            last_name : request.body.last_name,
            gender : gender,
            avatar : avatar,
            email : request.body.email,
            password : cryptoPassword
        };
        authModel.setUser(user, (error) => {
            if(!error){
                response.redirect(`/?message=El registro ha sido creado exitosamente`);
            }
        });
    }

    logOut(request, response, next){
        request.session.destroy((error) => {
            if(error){
                errors.http500(request, response, next)
            }else{
                response.redirect('/');                
            }
        });
    }

    chat(request, response, next){
        if(request.session.username){
            response.render('chatUsersOnline',{
                title: 'Mensajeria',
                user: request.session.username,
                avatar : request.session.avatar,
                id_auth: request.session.id_auth
            });
        }else{
            errors.http401(request, response, next);
        }
    }
}

module.exports = AuthController;