// AuthController --> controlador para login y createAccount
module.exports = {
    // funciones 
    loginGet : function(req , res, next){
        res.render('ingreso/login', {title : 'Login'});
    },
    
    createAccountGet: function(req, res, next){
        res.render('ingreso/crearCuenta', {title : 'Crear Cuenta'});
    }
};

