import express from 'express'
import Goods from '../controller/goods'


let router = express.Router();

router.post('/addGoods', Goods.addGoods);
router.post('/updateGoods', Goods.updateGoods);
router.post('/deleteGoods', Goods.deleteGoods);
router.post('/queryGoods', Goods.queryGoods);
//商品详情
router.post('/queryGoodsDetail', Goods.queryGoodsDetail);

export default router