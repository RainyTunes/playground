var mysql   = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 20,
    host            : '127.0.0.1',
    port            : 3306,
    user            : 'root',
    password        : '123456',
    database        : 'test_db_groupzone',
    charset         : 'utf8mb4'
});


exports.dbpool = pool;