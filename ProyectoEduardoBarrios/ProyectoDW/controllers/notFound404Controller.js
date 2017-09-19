class notFound{
    getNotFound(req,res,next)
    {
        res.render('noAuth/notFound',{title : 'No Encontrado'});
        //res.send("<h1>Vista de mierda</h1>");        
    }
}

module.exports = notFound;