import express from 'express'
/* import User from '../controller/user' */

let router = express.Router();

router.post('/', (req, res, next) => {
    res.json({
        code: '200',
        msg: '哈哈啊哈哈哈'
    })
});

export default router