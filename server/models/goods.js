import * as db from '../db/db';

export default class Goods {
    constructor() {

        }
        /* 
         *  查询 商品类型
         */
    queryGoodsType() {
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM goodsType')
                    .then(rows => {
                        resolve(rows);
                    })
                    .catch(err => {

                        reject(err);
                    })
            })
        }
        /* 
         *  添加商品
         * @param  {[string]}   good_name     商品名称
         * @param  {[string]}   good_img      图片名称
         * @param  {[int]}   type_id      图片名称
         * @param  {[string]}   goods_price   商品价格
         * @param  {[string]}   create_time   创建时间
         */
    insertGoods(...arr) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO goods (good_name,good_img,type_id,goods_price,create_time) VALUES (?,?,?,?,?)',
                    arr
                )
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                })
        })
    }

    /* 
     *  修改商品
     * @param  {[string]}   good_name     商品名称
     * @param  {[string]}   good_img      图片名称
     * @param  {[int]}   type_id      图片名称
     * @param  {[string]}   goods_price   商品价格
     * @param  {[string]}   create_time   创建时间
     */
    updateGoods(...arr) {
            console.log(arr)
            return new Promise((resolve, reject) => {
                db.query('UPDATE goods SET good_name=?, good_img=?, type_id=?, goods_price=?, create_time=? WHERE id=?',
                        arr
                    )
                    .then(rows => {
                        resolve(rows);
                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }
        /* 
         *  删除商品
         * @param  {[int]}   goods_id     商品id
         *
         */
    deleteGoods(...arr) {
            return new Promise((resolve, reject) => {
                db.query('SELECT * FROM goods WHERE id = ? AND is_delete = 0',
                        arr
                    )
                    .then(rows => {
                        if (rows.length == 0) {
                            resolve(0)
                        } else {
                            db.query('UPDATE goods SET is_delete = 1 WHERE id = ?', arr)
                                .then(rows_a => {
                                    if (rows_a.affectedRows == 1) {
                                        resolve(1)
                                    } else {
                                        reject('删除失败')
                                    }
                                })
                                .catch(err => {
                                    reject(err)
                                })
                        }

                    })
                    .catch(err => {
                        reject(err);
                    })
            })
        }
        /* 
         * 查询商品
         * @param  {[int]}      type_id     商品分类id
         * @param  {[string]}   whereLink   关键字
         * @param  {[int]}      page        当前页数
         * @param  {[int]}      counts      每页显示条数
         *
         */
    async queryGoods(...arr) {
            let type, key_word;
            if (arr[0] === 0) {
                type = ''
            } else {
                type = arr[0]
            }
            if (arr[1] === '') {
                key_word = ''
            } else {
                key_word = arr[1]
            }

            let str = ` SELECT * FROM goods WHERE type_id LIKE "%${type}%" AND good_name LIKE "%${key_word}%" AND is_delete = 0`;
            return await db.query(str)
        }
        /* 
         * 查询商品详情
         * @param  {[int]}      id     商品id
         * 
         *
         */
    async queryGoodsDetail(arr) {
        let str = ` SELECT * FROM goods 
                    WHERE id = ${arr} `;
        return await db.query(str)
    }

}