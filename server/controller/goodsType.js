import GoodsModel from "../models/goodsType";

let goodsObj = new GoodsModel();

class Goods {
    getGoodsType(req, res, next) {
            goodsObj
                .queryGoodsType()
                .then(results => {
                    res.json({
                        code: 200,
                        msg: "ok",
                        data: results
                    });
                })
                .catch(err => {
                    res.json({
                        code: 200,
                        msg: "ok",
                        data: err.msg
                    });
                });
        }
        /*
         *  添加商品类型
         * @param  {[string]}   type_name     商品类型名称
         * @param  {[string]}   create_time   创建时间
         */
    addGoodsType(req, res, next) {
        let create_time = Date.now();
        let is_abled = 1;
        goodsObj
            .insertGoodsType(req.body.type_name, create_time, is_abled)
            .then(results => {
                if (results.affectedRows == 1) {
                    res.json({
                        code: 200,
                        msg: "商品类型添加成功"
                    });
                } else {
                    res.json({
                        code: 300,
                        msg: "商品类型添加失败"
                    });
                }
            })
            .catch(err => {
                console.log(err);
                res.json({
                    code: 300,
                    msg: err.msg
                });
            });
    }

    /*
     *  修改商品类型
     * @param  {[string]}   type_name     商品名称
     */
    updateGoodsType(req, res, next) {
            let create_time = Date.now();
            goodsObj
                .updateGoodsType(req.body.type_name, create_time, req.body.id)
                .then(results => {
                    if (results.affectedRows == 1) {
                        res.json({
                            code: 200,
                            msg: "商品修改成功"
                        });
                    } else {
                        res.json({
                            code: 300,
                            msg: "商品修改失败"
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        code: 300,
                        msg: err.msg
                    });
                });
        }
        /*
         *  删除商品类型
         * @param  {[int]}   goods_id     商品id
         *
         */
    deleteGoodsType(req, res, next) {
            goodsObj
                .deleteGoodsType(req.body.id)
                .then(results => {
                    if (results == 1) {
                        res.json({
                            code: 200,
                            msg: "删除成功"
                        });
                    }
                    if (results == 0) {
                        res.json({
                            code: 300,
                            msg: ["商品已经删除"]
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
        /*
         * 查询商品类型
         * @param  {[int]}      type_id     商品类型分类id
         * @param  {[string]}   whereLink   关键字
         * @param  {[int]}      page        当前页数
         * @param  {[int]}      counts      每页显示条数
         *
         */
    queryGoodsType(req, res, next) {
            goodsObj
                .queryGoodsType(
                    req.body.type_id,
                    req.body.whereLink,
                    req.body.page,
                    req.body.counts
                )
                .then(results => {
                    let arr = results.slice(
                        (req.body.page - 1) * req.body.counts,
                        req.body.page * req.body.counts
                    );
                    res.json({
                        code: 200,
                        data: {
                            page: req.body.page,
                            total: results.length,
                            data: arr,
                            count: req.body.counts
                        },
                        msg: "success"
                    });
                })
                .catch(error => {
                    res.json({
                        code: 302,
                        msg: error
                    });
                });
        }
        /*
         * 查询商品详情
         * @param  {[int]}      id     商品id
         *
         */
    queryGoodsDetail(req, res, next) {
        goodsObj
            .queryGoodsDetail(req.body.id)
            .then(results => {
                res.json({
                    code: 200,
                    data: results,
                    msg: "success"
                });
            })
            .catch(error => {
                res.json({
                    code: 302,
                    msg: error
                });
            });
    }
}

export default new Goods();