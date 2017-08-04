'use strict';

const videosModel = require('../models/videos-model'),
    errors = require('../middlewares/errors'),
    vm = new videosModel();

class VideosController{
    
    getAll(request, response, next){
        return (request.session.username)
            ?   vm.getAll((error, data) => {
                    if(!error){
                        response.render('index', {
                                title: 'Ranking Videos',
                                user : request.session.username,
                                data: data
                        });
                    }
                })
            :   errors.http401(request, response, next);
    }

    getOne(request, response, next){
        let id = request.params.id;
        console.log(id);
        return (request.session.username)
            ?   vm.getOne(id, (error, data)=>{
                    if(!error){
                        response.render('edit',{
                            title: 'Editar video',
                            user: request.session.username,
                            data: data
                        });
                    }
                })
            :   errors.http401(request, response, next);
    }

    getDetails(request, response, next){
        let id = request.params.id;
        console.log(id);
        return (request.session.username)
            ?   vm.getOne(id, (error, data) => {
                    if(!error){
                        response.render('details',{
                            title: 'Publicación con lujo de detalle',
                            user: request.session.username,
                            data: data
                        });
                    }
                })
            :   errors.http401(request, response, next);
    }
    
    getProfile(request, response, next){
        return (request.session.username)
            ?   vm.getAll((error, data) => {
                    if(!error){
                        response.render('profile',{
                            title: 'Perfil - Publicaciones',
                            user: request.session.username,
                            data: data
                        });
                    }
                })
            :   errors.http401(request, response, next);
    }

    save(request, response, next){
        let video = {
            id : (request.body.id || 0),
            titulo : request.body.titulo,
            descripcion : request.body.descripcion,
            url : request.body.urlVideo
        };
        console.log(video);
        return (request.session.username)
            ?   vm.save(video, (error) => {
                    if(!error){
                        response.redirect('/');
                    }else{
                        return next(new Error('Registro no salvado'));
                    }
                })
            :   errors.http401(request, response, next);
    }

    delete(request, response, next){
        let id = request.params.id;
        console.log(id);
        return (request.session.username)
            ?   vm.delete(id, (error) => {
                    if(!error){
                        response.redirect('/');
                    }else{
                        return next(new Error('Registro no encontrado'));
                    }
                })
            :   errors.http401(request, response, next);
    }

    addForm(request, response, next){
        return (request.session.username)
            ?   response.render('add',{
                    title: 'Agregar nuevo video',
                    user: request.session.username
                })
            :   errors.http401(request, response, next);
    }
    
}

module.exports = VideosController;