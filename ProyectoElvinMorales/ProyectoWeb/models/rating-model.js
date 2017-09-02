const conexion = require('./conexion');

class RatingModel{
    votar(datos, cb){
        conexion.query('INSERT INTO rating SET ?', datos, cb);
    }

    getRateOfUser(id_user, id_video, cb){
        conexion.query('SELECT votos FROM rating WHERE id_auth=? AND id_video=?', [id_user, id_video], cb);
    }

    getRateAllVideo(id_video, cb){
        conexion.query('SELECT SUM(r.votos) total_votos FROM rating r WHERE r.id_video=?',id_video, cb);
    }
}

module.exports = new RatingModel;