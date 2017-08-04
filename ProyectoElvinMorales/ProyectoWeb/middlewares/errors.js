'use strict'

class Errors{
    http401(request, response, next) {
        let error = new Error();
        error.status = 401;
        error.statusText = 'UNAUTHORIZED :(';
        response.render('error', {
                error : error
        });
    }

    http404(request, response, next) {
        let error = new Error();
        error.status = 404;
        error.statusText = 'Página no encontrada. Por favor, compruebe la url :(';
        response.render('error', {
                error : error
        });
    }

    http500(request, response, next) {
        let error = new Error();
        error.status = 500;
        error.statusText = 'INTERNAL SERVER ERROR';
        response.render('error', {
                error : error
        });
    }
}

module.exports = new Errors();