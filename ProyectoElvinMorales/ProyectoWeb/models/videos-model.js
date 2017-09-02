'use strict';

const conn = require('./conexion');

class VideosModel{

    //metodo para obtener todos los videos con el total de votos, visitas y comentarios obtenidos
    getAll(cb){
        conn.query('SELECT *, '+
        '(SELECT SUM(r.votos) FROM rating r WHERE r.id_video=v.id) votos, '+
        '(SELECT COUNT(c.id) FROM comments c WHERE c.id_video=v.id) comentarios '+
        'FROM videos v '+
        'ORDER BY votos DESC', cb);
    }

    //metodo para obetner los videos subidos por el usuario y mostrar su lista de videos en el perfil
    getAllVideosByUser(id_auth, cb){
        conn.query('SELECT * FROM videos v WHERE v.id_auth=? ORDER BY v.visitas DESC', id_auth, cb);
    }

    //metodo para consultar el detalle de un video segun su id
    getOne(id, cb){
        conn.query('SELECT v.id id_video, titulo, descripcion, url, fecha_publicacion, visitas, '+
        '(SELECT SUM(r.votos) FROM rating r WHERE r.id_video=v.id) votos, '+
        'name, '+
        'last_name '+
        'FROM videos v '+
        'INNER JOIN auth a ON v.id_auth=a.id '+
        'WHERE v.id = ?', id, cb);
    }

    //metodo para guardar o actualizar el registro segun sea el caso
    save(data, cb){
        conn.query('SELECT * FROM videos WHERE id = ?', data.id, (error, rows) => {
            console.log(`Número de registros: ${rows.length}`);
            if(!error){
                return (rows.length == 1)
                    ? conn.query('UPDATE videos SET ? WHERE id = ?',[data, data.id], cb)
                    : conn.query('INSERT INTO videos SET ?',data, cb);
            }
        })
    }

    updateVisitas(id, cb){
        conn.query('UPDATE videos SET visitas=visitas+1 WHERE id=?', id, cb);
    }

    delete(id, cb){
        conn.query('DELETE FROM videos WHERE id = ?', id, cb);
    }

    getAllCategorias(cb){
        conn.query('SELECT * FROM categorias', cb);
    }
}

module.exports = VideosModel;