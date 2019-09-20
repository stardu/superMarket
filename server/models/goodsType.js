import * as db from "../db/db";

export default class Goods {
    constructor() {}
        /*
         *  添加商品类型
         * @param  {[string]}   type_name     商品类型名称
         * @param  {[string]}   create_time   创建时间
         */
    insertGoodsType(...arr) {
        return new Promise((resolve, reject) => {
            db.query(
                    "INSERT INTO goodsType (type_name,create_time,is_abled) VALUES (?,?,?)",
                    arr
                )
                .then(rows => {
                    resolve(rows);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }

    /*
     *  修改商品类型
     * @param  {[string]}   type_name     商品名称
     */
    updateGoodsType(...arr) {
            return new Promise((resolve, reject) => {
                db.query(
                        "UPDATE goodsType SET type_name=?, create_time=? WHERE id=?",
                        arr
                    )
                    .then(rows => {
                        resolve(rows);
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
        /*
         *  删除商品类型
         * @param  {[int]}   id     商品id
         *
         */
    deleteGoodsType(...arr) {
            return new Promise((resolve, reject) => {
                db.query("SELECT * FROM goodsType WHERE id = ? AND is_abled = 1", arr)
                    .then(rows => {
                        if (rows.length == 0) {
                            resolve(0);
                        } else {
                            db.query("UPDATE goodsType SET is_abled = 0 WHERE id = ?", arr)
                                .then(rows_a => {
                                    if (rows_a.affectedRows == 1) {
                                        resolve(1);
                                    } else {
                                        reject("删除失败");
                                    }
                                })
                                .catch(err => {
                                    reject(err);
                                });
                        }
                    })
                    .catch(err => {
                        reject(err);
                    });
            });
        }
        /*
         * 查询商品类型
         * @param  {[int]}      type_id     商品分类id
         * @param  {[string]}   whereLink   关键字
         * @param  {[int]}      page        当前页数
         * @param  {[int]}      counts      每页显示条数
         *
         */
    async queryGoodsType(...arr) {
            let type, key_word;
            if (arr[0] === 0) {
                type = "";
            } else {
                type = arr[0];
            }
            if (arr[1] === "") {
                key_word = "";
            } else {
                key_word = arr[1];
            }

            let str = ` SELECT * FROM goodsType WHERE id LIKE "%${type}%" AND type_name LIKE "%${key_word}%" AND is_abled = 1`;
            return await db.query(str);
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
        return await db.query(str);
    }
}