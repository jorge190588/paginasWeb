// Juego Controller

module.exports = {
    // funciones del Juego
    nuevaEncuesta : function(req, res, next){
        res.render('juego/nuevaEncuesta',{title : 'Crear Encuesta'});
    },

    nuevoExamen: function(req, res, next){
        res.render('juego/nuevoExamen', {title : 'Crear Examen'});
    },

    nuevaDiscusion: function(req, res, next){
        res.render('juego/nuevaDiscusion', {title : 'Crear Discusion'});
    },

    nuevoRevoltijo: function(req, res, next){
        res.render('juego/nuevoRevoltijo', {title : 'Crear Revoltijo'});
    }
}