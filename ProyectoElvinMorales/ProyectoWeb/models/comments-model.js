const conexion = require('./conexion');

class CommentModel{
    comentar(datos, cb){
        conexion.query('INSERT INTO comments SET ?', datos, cb);
    }

    getCommentAllVideo(id_video, cb){
        conexion.query('SELECT *, a.name user_name, a.last_name user_lastName ' +
            'FROM comments c '+
            'INNER JOIN auth a ON c.id_auth=a.id '+
            'WHERE c.id_video=? '+
            'ORDER BY c.id DESC',id_video, cb);
    }

    addComment(comment, cb){
        conexion.query('INSERT INTO comments SET ?', comment, cb);
    }

    getCommentUser(id, cb){
        conexion.query('SELECT * FROM auth WHERE id=?', id, cb);
    }
}

module.exports = new CommentModel;