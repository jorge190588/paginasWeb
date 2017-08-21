// home controller
var Model = require('../models/homeModel');
var obj = new Model();

class Index{
    // funciones del controller
    IndexGet(req,res,next){
        res.render('index', {title : 'Proyecto DW'});
    }

    IndexPost(req,res,next){
        var usuario = {
            idJuego : req.body.pin,
            carne : req.body.carne,
            nombre : req.body.nombre
        };
        //console.log(usuario);
        obj.IndexPost(usuario,(error,data)=>{
            if(!error){            
                var rowCount = data[1][0].rc;

                console.log(rowCount);                
                if(rowCount <= 0){                
                    res.render('index',{mensaje : "El pin del juego no existe o es incorrecto"});
                    //console.log('incorrecto');
                    
                }
                else{
                    res.redirect("/jugar");
                    //console.log('correcto');
                }
            }
        });
    }

    default(req,res,next){
        res.render('default', {titulo : 'Default'});
    }

    new(req,res,next){
        res.render('optionNew');
    }
}

module.exports = Index;