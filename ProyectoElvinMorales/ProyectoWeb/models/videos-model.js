'use strict';

const conn = require('./conexion');

class VideosModel{

    getAll(cb){
        conn.query('SELECT * FROM videos', cb)
    }

    getOne(id, cb){
        conn.query('SELECT * FROM videos WHERE id = ?', id, cb);
    }

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

    delete(id, cb){
        conn.query('DELETE FROM videos WHERE id = ?', id, cb);
    }
}

module.exports = VideosModel;