
class Resultados{
    getResultados(req, res, next)
    {
        res.render('graficasResultados/resultados',{title : 'Resultados '});
    }
}

module.exports = Resultados;