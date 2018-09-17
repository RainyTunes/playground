/**
 * Created by rainywan on 2017/8/8.
 */

const pool = require('../db').dbpool;

//创建新的相册
const createAlbum = function (album_id, album_name, circle_id, user_id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err)
            {
                reject(err)
                return;
            }
            const sqlCode = 'INSERT INTO t_photo_album(album_id, album_name, circle_id, user_id) VALUES (?, ?, ?, ?)'
            connection.query(sqlCode, [album_id, album_name, circle_id, user_id], function (err, rows, fields) {
                if (err)
                {
                    connection.release()
                    reject(err)
                    return;
                }
                else
                {
                    connection.release()
                    resolve(rows)
                }

            })
        })
    });
}

//根据circleId获取群内所有相册
const selectAlbumByCircleId = function (circle_id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                return;
            }
            const sqlCode = 'SELECT * FROM t_photo_album WHERE circle_id = ?'
            connection.query(sqlCode, circle_id, function (err, rows, fields) {
                if (err)
                {
                    connection.release()
                    reject(err)
                    return;
                }
                else
                {
                    connection.release()
                    resolve(rows)
                }

            })
        })
    });
}

//查询某群内是否有同名相册
const selectAlbumByCircleIdAndName = function (circle_id, album_name) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                return;
            }
            const sqlCode = 'SELECT * FROM t_photo_album WHERE circle_id = ? and album_name = ?'
            connection.query(sqlCode, [circle_id, album_name], function (err, rows, fields) {
                if (err)
                {
                    connection.release()
                    reject(err)
                    return;
                }
                connection.release()
                if (!rows || rows.length === 0) {
                    resolve()
                } else {
                    reject({
                        'code': '-1',
                        'msg': 'the album_name has already been used',
                        'album': rows[0]
                    })
                }
            })
        })
    });
}

//查询是否有同ID相册
// const selectAlbumByAlbumId = function (album_id) {
//     return new Promise(function (resolve, reject) {
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 reject(err)
//             }
//             const sqlCode = 'SELECT COUNT(*) FROM t_photo_album WHERE album_id = ?'
//             connection.query(sqlCode, album_id, function (err, rows, fields) {
//                 if (err) {
//                     reject(err)
//                 }
//                 connection.release()
//                 if (rows[0]['COUNT(*)'] === 0) {
//                     resolve()
//                 } else {
//                     reject('the album_name has already been used')
//                 }
//             })
//         })
//     });
// }

const deleteAlbumByAlbumId = function (album_id) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                return;
            }
            const sqlCode = 'DELETE FROM t_photo_album WHERE album_id = ?'
            connection.query(sqlCode, [album_id], function (err, rows, fields) {
                if (err) {
                    connection.release()
                    reject(err)
                }
                else
                {
                    connection.release()
                    resolve(rows)
                }

            })
        })
    })
}

const renameAlbumByAlbumId = function (albumId, albumName) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
                return;
            }
            const sqlCode = 'UPDATE t_photo_album SET album_name = ? WHERE album_id = ?'
            connection.query(sqlCode, [albumName, albumId], function (err, rows, fields) {
                if (err) {
                    connection.release()
                    reject(err)
                }
                else
                {
                    connection.release()
                    resolve(rows)
                }

            })
        })
    })
}

module.exports = {
    createAlbum: createAlbum,
    selectAlbumByCircleId: selectAlbumByCircleId,
    selectAlbumByCircleIdAndName: selectAlbumByCircleIdAndName,
    renameAlbumByAlbumId: renameAlbumByAlbumId,
    deleteAlbumByAlbumId: deleteAlbumByAlbumId,
};
