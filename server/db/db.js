import mysql from 'mysql'

const pool = mysql.createPool({
    host: '39.106.93.134', //mysql地址127.0.0.1
    user: 'root', //连接mysql的用户名和密码
    password: 'star11130403',
    database: 'express_test', //数据库名
    port: '3306', //mysql端口号
});


export const query = (sql, params) => new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
        if (err) {
            return reject(err)
        }
        connection.query(sql, params, (err, rows) => {
            connection.release();
            if (err) {
                return reject(err)
            }
            resolve(rows);
        });
    });
});