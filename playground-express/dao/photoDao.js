/**
 * Created by morvenyang on 2017/7/4.
 */
const pool = require('../db').dbpool;

const insertPhoto = function (photoId, postId, circleId, userId, url) {
    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;

            }
            const photoInfo = [photoId, postId, circleId, userId, url];
            const sql = 'INSERT INTO t_photo_info (photo_id, post_id, circle_id, user_id, url) VALUES(?,?,?,?,?)';
            connection.query(sql, photoInfo,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();
                        resolve({photo_id: photoId, post_d: postId, circle_id: circleId, user_id: userId, url: url});
                    }

                });
        });
    });
};

//
const deletePhotoByPost = function (postId) {
    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const sql = 'DELETE FROM t_photo_info WHERE post_id = ?';

            connection.query(sql, postId,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();
                        resolve(rows);
                    }

                });
        });
    });
};

const deletePhotoById = function (photoId) {
    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const sql = 'DELETE FROM t_photo_info WHERE photo_id = ?';

            connection.query(sql, photoId,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();
                        resolve(photoId);
                    }

                });
        });
    });
};

//这里需要circleId作为验证，防止跨群拉错误数据
const selectPhotoByAlbumId = function (albumId, circleId) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            let sql = 'SELECT * FROM t_photo_info WHERE circle_id = ? AND album_id = ?';
            connection.query(sql, [circleId, albumId], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                    connection.release();
                }
                else
                {
                    connection.release();
                    resolve(rows);
                }

            });
        });
    });
}

const selectPhotoByPostId = function (postId) {
    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const sql = 'select * FROM t_photo_info WHERE post_id = ?';

            connection.query(sql, postId,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();
                        if (rows) {
                            resolve(rows.length);
                        } else {
                            reject('get photo info fail');
                        }
                    }

                });
        });
    });
}

// todo: 准备删除
// const selectPhotoByCircleId = function (circleId) {
//     return new Promise(function (resolve, reject) {
//
//         pool.getConnection(function (err, connection) {
//             if (err) {
//                 throw new Error('getConnection');
//             }
//             const sql = 'select * from t_photo_info where circle_id = ? order by create_time DESC';
//
//             connection.query(sql, circleId,
//                 function (err, rows, fields) {
//                     if (err) {
//                         console.error(err);
//                         throw new Error('selectPhotoByCircleId');
//                     }
//                     connection.release();
//                     resolve(rows.length);
//                 });
//         });
//     });
// }

const selectPhotoByUserId = function (userId) {

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const sql = 'select t_photo_info.*,(select circle.openGID from t_circle_info as circle where circle.circle_id = t_photo_info.circle_id) as openGID,(select t_photo_album.album_name from t_photo_album where t_photo_album.album_id = t_photo_info.album_id) as album_name  from t_photo_info  where user_id = ? order by create_time desc;';

            connection.query(sql, userId,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();
                        resolve(rows);
                    }

                });
        });
    });
}
//获取单个用户所有图片的接口 支持分页拉取
const selectUserPhoto = function (userId,lastId,reqCount,sort) {

    if(!userId)
    {
        return Promise.resolve({});
    }

    var sql = 'select t_photo_info.*,(select circle.openGID from t_circle_info as circle where circle.circle_id = t_photo_info.circle_id) as openGID,(select t_photo_album.album_name from t_photo_album where t_photo_album.album_id = t_photo_info.album_id) as album_name  from t_photo_info  where user_id = ?';

    if(lastId != 0)
    {
        if(sort == 2)//时间顺序
            sql = sql + ' and id >' + pool.escape(lastId)  + ' order by id asc';
        else //其他设为时间逆序
            sql = sql + ' and id <' + pool.escape(lastId)  + ' order by id desc';
    }
    else
    {
        if(sort == 2)//时间顺序
            sql = sql +  ' order by id asc';
        else //其他设为时间逆序
            sql = sql + ' order by id desc';
    }

    if(reqCount != 0 && reqCount <= 100)
    {
        sql = sql + ' limit 0,' + pool.escape(reqCount) ;
    }
    else
    {
        sql = sql + ' limit 0,20';
    }

    console.log(sql);

    return new Promise(function (resolve, reject) {

        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            // const sql = 'select t_photo_info.*,(select circle.openGID from t_circle_info as circle where circle.circle_id = t_photo_info.circle_id) as openGID,(select t_photo_album.album_name from t_photo_album where t_photo_album.album_id = t_photo_info.album_id) as album_name  from t_photo_info  where user_id = ? order by create_time desc;';

            connection.query(sql, userId,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();
                        resolve(rows);
                    }

                });
        });
    });
}



//根据extentId获取到相应到postId
const getPhotoPostIdWithExtendId = function (extentId) {

    return new Promise(function (resolve, reject) {

        if (!extentId) {  //参数错误处理
            resolve('null');
        }

        console.log('extentId is ' + extentId);
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const postSearchSql = 'SELECT post_id FROM t_photo_info WHERE extend_id = ?';
            connection.query(postSearchSql, extentId,
                function (err, rows, fields) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        connection.release();
                    }
                    else
                    {
                        connection.release();

                        if (!rows || rows.length === 0) {
                            resolve('null');
                        } else {
                            // const form = {
                            //     formID: rows[0].post_id,
                            // };
                            resolve(rows[0].post_id);   //promise返回postId
                        }
                    }

                });
        });
    });
};

const setPhotoAlbumId = function (photoId, newAlbumId) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                console.log(err);
                reject(err);
                return;
            }
            const sql = 'UPDATE t_photo_info SET album_id = ? WHERE photo_id = ?';

            connection.query(sql, [newAlbumId, photoId], function (err, rows, fields) {
                if (err) {
                    console.log(err);
                    reject(err);
                    connection.release();
                }
                else
                {
                    connection.release();
                    resolve(rows.length);
                }

            });
        });
    })
}


module.exports = {
    insertPhoto: insertPhoto,               //添加相片
    deletePhotoByPost: deletePhotoByPost,   //通过动态界面删除相片（多张）
    deletePhotoById: deletePhotoById,       //群相册中删除图片（单张）
    selectPhotoByPostId: selectPhotoByPostId,
    selectPhotoByAlbumId: selectPhotoByAlbumId,
    // selectPhotoByCircleId: selectPhotoByCircleId,
    selectPhotoByUserId: selectPhotoByUserId,
    getPhotoPostIdWithExtendId: getPhotoPostIdWithExtendId,
    setPhotoAlbumId: setPhotoAlbumId,
    selectUserPhoto: selectUserPhoto
};
