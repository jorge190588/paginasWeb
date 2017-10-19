'use strict';

const   videosModel     = require('../models/videos-model'),
        errors          = require('../middlewares/errors'),
        ratingModel     = require('../models/rating-model'), 
        commentModel    = require('../models/comments-model'),
        authModel       = require('../models/auth-model'),
        fs              = require('fs');



//librerias necesarias para la api de youtube
const   google = require('googleapis'), //requerimos googleapis
        OAuth2 = google.auth.OAuth2; //Definimos OAuth2

//login a google
const oauth2Client = new OAuth2(
    '156054381611-5m6927hks260t7retd95dq3ter5t1b2n.apps.googleusercontent.com', //id de cliente
    'L8aflYYx6D8PSDSavD7PvSL5' //secreto de cliente
);

oauth2Client.setCredentials({
    access_token: 'ya29.GlupBDq-f6UH0MjKnZvSIBY9hYbLEUmOxfMbS4h4A31mwBYG_dLsTiHkUlWyQ9m8IEpKqsfC_-VTyBi7OIfvJ8cf-rNkLrLWV3A6Hbfb3SNLPR0C3wS8F-H5tnRi',
    refresh_token: '1/0y6ksyz61ClP3KwCXHXaznE_Qxk3mcNWKTo2nQJl5P1ZjZckiiIJ9gXBVXP95MH2' 
});

google.options({ auth: oauth2Client}, function(error, response){
    if(error) throw error;
    console.log(response);
});

const youtube = google.youtube('v3');

function renderizar(response, view, args){
    return response.render(
        view, args
    );
}

function UpdateVisits(id_video){    
    videosModel.updateVisitas(id_video);
}

class VideosController{  
    
    getAll(request, response, next){
        return (request.session.username)
            ?   videosModel.getAll((error, data) => {
                    if(!error){
                        response.render('index', {
                            title: 'Ranking Videos',
                            user : request.session.username,
                            avatar : request.session.avatar,
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
            ?   videosModel.getOne(id, (error, data)=>{
                    if(!error){
                        response.render('edit',{
                            title: 'Editar video',
                            user: request.session.username,
                            avatar : request.session.avatar,
                            id_auth: request.session.id_auth,
                            data: data
                        });
                    }
                })
            :   errors.http401(request, response, next);
    }

    getDetails(request, response, next){
        let id_video = request.params.id;
        let id_user = request.session.id_auth;        
        return (request.session.username)
            ?   videosModel.getOne(id_video, (error, data) => {
                    if(!error){
                        UpdateVisits(id_video);
                        ratingModel.getRateOfUser(id_user, id_video, (error, rating)=>{
                            if(!error){
                                commentModel.getCommentAllVideo(id_video, (error, messageData)=>{
                                    if(!error){
                                        response.render('details',{
                                            title: 'Publicación con lujo de detalle',
                                            user: request.session.username,
                                            avatar : request.session.avatar,
                                            id_auth: id_user,
                                            full_name: request.session.full_name,
                                            data: data,
                                            rating: rating,
                                            comments: messageData
                                        });
                                    }
                                });
                                
                            }
                        })
                    }
                })
            :   errors.http401(request, response, next);
    }
    
    getProfile(request, response, next){
        let id_auth = request.session.id_auth;
        return (request.session.username)
            ?   videosModel.getAllVideosByUser(id_auth, (error, data) => {
                    if(!error){
                        authModel.getOneUser(id_auth,(error, user)=>{
                            if(!error){
                                response.render('profile',{
                                    title: 'Perfil - Publicaciones',
                                    user: request.session.username,
                                    avatar : request.session.avatar,
                                    data_user: user,
                                    data: data,
                                    error_image: request.query.error_image
                                });
                            }
                        })
                    }
                })
            :   errors.http401(request, response, next);
    }

    uploadAvatar(request, response, next){
        let formidable = require('formidable');
        var form = new formidable.IncomingForm();
        let avatar, name, extension;
        //form.uploadDir = './public/image/avatars/';
        form.keepExtensions = true;
        form.parse(request, (error, fields, files)=>{
            name = files.avatar.name.split(".").shift();
            extension = files.avatar.name.split(".").pop();
            avatar = `${name}${fields.id_auth}.${extension}`;
            if(files.avatar.type == 'image/png' || files.avatar.type == 'image/jpg' || files.avatar.type == 'image/jpeg'){
                authModel.updateAvatar(avatar,fields.id_auth, (error)=>{
                    fs.rename(files.avatar.path, './public/image/avatars/'+avatar);
                    response.redirect('/perfil');
                });
            }else{
                response.redirect('/perfil?error_image=Seleccione una imagen válida!!');
            }

        });
    }

    save(request, response, next){
        let ID_youtube;
        ID_youtube = request.body.urlVideo.split('=').pop();        
        
        let video = {
            id : parseInt((request.body.id || 0)),
            titulo : request.body.titulo,
            descripcion : request.body.descripcion,
            url : ID_youtube,
            id_auth : parseInt(request.body.id_auth),
            id_categoria : parseInt(request.body.categoria)
        };
        return (request.session.username)
            ?   videosModel.save(video, (error) => {
                    if(!error){
                        response.redirect('/perfil');
                    }else{
                        return next(new Error('Registro no salvado'));
                    }
                })
            :   errors.http401(request, response, next);
    }

    /*uploadYouTube(myTitle, myDescription, myFileLocation){
        var req = youtube.videos.insert({
            resource: {
                snippet: {
                    title: myTitle,
                    description: myDescription
                },
                status: {
                    privacyStatus: 'private'
                }
            },
            part: 'snippet,status',
            media: {
                body: fs.createReadStream(myFileLocation)
            }
        }, (error, data) => {
            console.log("Done.");
            process.exit();
        });
        return req;
    }*/

    delete(request, response, next){
        let id = request.params.id;
        console.log(id);
        return (request.session.username)
            ?   videosModel.delete(id, (error) => {
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
            ?   videosModel.getAllCategorias((error, data) => {
                    if(!error){
                        response.render('add',{
                            title: 'Agregar nuevo video',
                            user: request.session.username,
                            avatar : request.session.avatar,
                            id_auth: request.session.id_auth,
                            data: data
                        });
                    }
                })
            :   errors.http401(request, response, next);
    }

    calificarVideo(request, response, next){
        const datos = {
            votos : request.body.votos,
            id_auth : request.body.id_auth,
            id_video : request.body.id_video
        };
        console.log(datos);
        ratingModel.votar(datos, (error)=>{
            if(!error){
                ratingModel.getRateAllVideo(datos.id_video, (err, allVotos)=>{
                    if(!err){
                        var totalVotos = allVotos[0].total_votos;
                        response.status(200).json({
                            countVotos: totalVotos
                        });
                    }
                });
            }
        });
    }

    comentarVideo(request, response, next){
        const comentario = {
            mensaje : request.body.comment,
            id_auth : request.body.id_auth_comment,
            id_video : request.body.id_video_comment
        };
        commentModel.comentar(comentario, (error)=>{
            if(!error){
                response.send('Bien');
            }
        });
    }   
}

module.exports = new VideosController;