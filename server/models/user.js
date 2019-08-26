/* 
 *
 *注册、登录业务实现
 *
 */
import * as db from '../db/db';

export default class User {
    constructor(user_name, pass_word, create_time) {
        this.user_name = user_name;
        this.pass_word = pass_word;
        this.create_time = create_time
    }

    //查询user
    /* 
     * @param  {[string]}   user_name      用户名称
     */
    static queryUser(user_name) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM user WHERE user_name = ?', [user_name])
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    //添加user
    /* 
     * @param  {[string]}   user_name      用户名称
     * @param  {[string]}   pass_word      密码
     * @param  {[string]}   create_time      时间
     */
    insertUser() {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO user (user_name,pass_word,create_time) VALUES (?,?,?)', [
                    this.user_name,
                    this.pass_word,
                    this.create_time
                ]).then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }
}