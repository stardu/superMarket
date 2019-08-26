import GoodsModel from '../models/goods'

let goodsObj = new GoodsModel();

class Goods {
    getGoodsType(req, res, next) {
            goodsObj.queryGoodsType()
                .then(results => {
                    res.json({
                        code: 200,
                        msg: 'ok',
                        data: results
                    })
                })
                .catch(err => {
                    res.json({
                        code: 200,
                        msg: 'ok',
                        data: err.msg
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
    addGoods(req, res, next) {
        let create_time = Date.now();
        goodsObj.insertGoods(
                req.body.good_name,
                req.body.good_img,
                req.body.type_id,
                req.body.goods_price,
                create_time,
                req.body.id,
            )
            .then(results => {
                if (results.affectedRows == 1) {
                    res.json({
                        code: 200,
                        msg: '商品添加成功',

                    })
                } else {
                    res.json({
                        code: 300,
                        msg: ['商品添加失败'],

                    })
                }

            })
            .catch(err => {
                res.json({
                    code: 300,
                    msg: err.msg
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
     * @param  {[string]}   goods_id   商品ID
     */
    updateGoods(req, res, next) {
            let create_time = Date.now();
            goodsObj.updateGoods(
                    req.body.good_name,
                    req.body.good_img,
                    req.body.type_id,
                    req.body.goods_price,
                    create_time,
                    req.body.id,
                )
                .then(results => {
                    if (results.affectedRows == 1) {
                        res.json({
                            code: 200,
                            msg: '商品修改成功',

                        })
                    } else {
                        res.json({
                            code: 300,
                            msg: ['商品修改失败'],

                        })
                    }

                })
                .catch(err => {
                    console.log(err)
                    res.json({
                        code: 300,
                        msg: err.msg
                    })
                })
        }
        /* 
         *  删除商品
         * @param  {[int]}   goods_id     商品id
         *
         */
    deleteGoods(req, res, next) {
            goodsObj.deleteGoods(req.body.goods_id)
                .then(results => {
                    if (results == 1) {
                        res.json({
                            code: 200,
                            msg: '删除成功'
                        })
                    }
                    if (results == 0) {
                        res.json({
                            code: 300,
                            msg: ['商品已经删除']
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
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
    queryGoods(req, res, next) {
            goodsObj.queryGoods(
                    req.body.type_id,
                    req.body.whereLink,
                    req.body.page,
                    req.body.counts,
                )
                .then(results => {
                    let arr = results.slice((req.body.page - 1) * req.body.counts, req.body.page * req.body.counts)
                    res.json({
                        code: 200,
                        data: {
                            page: req.body.page,
                            total: results.length,
                            data: arr,
                            count: req.body.counts
                        },
                        msg: 'success'
                    })
                })
                .catch(error => {
                    res.json({
                        code: 302,
                        msg: error
                    })
                })
        }
        /* 
         * 查询商品详情
         * @param  {[int]}      id     商品id
         *
         */
    queryGoodsDetail(req, res, next) {
        goodsObj.queryGoodsDetail(
                req.body.id,
            )
            .then(results => {
                res.json({
                    code: 200,
                    data: results,
                    msg: 'success'
                })
            })
            .catch(error => {
                res.json({
                    code: 302,
                    msg: error
                })
            })
    }
}

export default new Goods();