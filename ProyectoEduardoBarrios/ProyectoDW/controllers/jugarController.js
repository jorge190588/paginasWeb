var Model = require('../models/jugarModel');
var modelo = new Model();

class Jugar{
    Index(request, response, next){
        response.render('juego/jugarIndex',{title : 'Iniciar Juego'});
    }
}

module.exports = Jugar;