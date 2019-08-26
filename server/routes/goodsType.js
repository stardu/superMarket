import express from 'express'
import Goods from '../controller/goods'

let router = express.Router();

router.post('/', Goods.getGoodsType);

export default router
