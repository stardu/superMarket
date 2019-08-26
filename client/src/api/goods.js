import req from '../http'

export default class Goods {
    //获取商品分类
    getGoodsType(data) {
            return req({
                method: 'post',
                url: '/api/goodsType',
                data
            })
        }
        //添加商品
    addGoods(data) {
            return req({
                method: 'post',
                url: '/api/goods/addGoods',
                data
            })
        }
        //查询商品
    queryGoods(data) {
            return req({
                method: 'post',
                url: '/api/goods/queryGoods',
                data
            })
        }
        //查询商品详情
    queryGoodsDetail(data) {
            return req({
                method: 'post',
                url: '/api/goods/queryGoodsDetail',
                data
            })
        }
        //修改商品
    updateGoods(data) {
            return req({
                method: 'post',
                url: '/api/goods/updateGoods',
                data
            })
        }
        //删除商品
    deleteGoods(data) {
        return req({
            method: 'post',
            url: '/api/goods/deleteGoods',
            data
        })
    }
}