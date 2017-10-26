// AuthController --> controlador para login y createAccount
const Model = require('../models/authModel'),
inst = new Model();

class Auth{
    loginGet(req, res, next)
    {
        res.render('ingreso/login', {title : 'Login'});
    }

    loginPost(req, res, next)
    {
        var credencialesUsuario = {
            email: req.body.correo,
            password: req.body.password
        };    

        req.session.emailUserAdmin = credencialesUsuario.email;
        //console.log(credencialesUsuario);
        inst.Login(credencialesUsuario,(error,results)=>{
            if(!error)
            {
                //console.log("Controller ->"+results[0].Nombres);
                if(results.length > 0){
                    req.session.idUsuarioCreaJuegos = results[0].idUsuario;
                    res.redirect('/default');
                } 
                else
                {
                    res.redirect('/login');
                    //res.send("<h1>Su usuario no existe</h1>");
                }               
            }
            else
                res.send(error);

        });
    }

    createAccountGet(request, response, next)
    {
        response.render('ingreso/crearCuenta', {title : 'Crear Cuenta'});
    }

    createAccountPost(req, res, next)
    {
        var usuario = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            correo: req.body.correo,
            password: req.body.password
        };
        //console.log(usuario);
        req.session.usuarioCreaJuegos = usuario.nombres+' '+usuario.apellidos;
        inst.CrearCuentaModel(usuario,(error,results)=>{
            if(!error)
            {
                //console.log(results[0][0].idUsuarioCreado);
                //res.send(`<h1>Id del usuario Creado -> ${results.idUsuarioCreado}</h1`)
                req.session.idUsuarioCreaJuegos = results[0][0].idUsuarioCreado;
                res.redirect('/default')
            }
                
        });
    }
}
module.exports = Auth;

