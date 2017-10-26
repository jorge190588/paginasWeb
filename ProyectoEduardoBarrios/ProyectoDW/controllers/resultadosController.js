
class Resultados{
    getResultados(req, res, next)
    {
        return(req.session.emailUserAdmin)
        ? res.render('graficasResultados/resultados',{title : 'Resultados', sesion : req.session.emailUserAdmin})
        : res.redirect('/notFound');
    }
}

module.exports = Resultados;