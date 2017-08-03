// home controller
module.exports = {
    // funciones del controller
    index: function(req,res,next){
        res.render('index', {title : 'Proyecto DW'});
    },

    default: function(req,res,next){
        res.render('default', {titulo : 'Default'});
    },

    new: function(req,res,next){
        res.render('optionNew');
    }
}