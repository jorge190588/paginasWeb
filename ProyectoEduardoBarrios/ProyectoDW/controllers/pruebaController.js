const pruebaModel = require('../models/modelo'),
      inst = new pruebaModel();

class pruebaController{
    getAll(req, res, next){
        inst.getAll((error, data) =>{
            if(!error){            
                res.render('juego/prueba', {data : data, title : 'datos'});
            }
        });
    }
}

module.exports = pruebaController;