import express from "express";
import GoodsType from "../controller/goodsType";

let router = express.Router();

router.post("/addGoodsType", GoodsType.addGoodsType);
router.post("/updateGoodsType", GoodsType.updateGoodsType);
router.post("/deleteGoodsType", GoodsType.deleteGoodsType);
router.post("/queryGoodsType", GoodsType.queryGoodsType);
//商品详情
/* router.post('/queryGoodsDetail', Goods.queryGoodsDetail); */

export default router;