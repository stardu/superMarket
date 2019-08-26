/* var express = require('express');
var router = express.Router(); */
import upload from '../multer'
import register from './register'
import login from './login'
import loginOut from './loginOut'
import test from './test'
import goodsType from './goodsType'

import goods from './goods'


export default app => {
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', 'localhost:3000');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Content-Type', 'application/json;charset=utf-8');
        next();
    });

    app.use('/api/register', register);
    app.use('/api/login', login);
    app.use('/api/loginOut', loginOut);
    app.use('/api/goodsType', goodsType);
    app.use('/api/goods', upload.single(), goods);

    //上传图片
    app.use('/api/upload', upload.single('img'), function(req, res, next) {
        res.json({ code: '200', data: req.file.path, message: "ok" });
    });

    /* app.use((req, res, next) => {
        console.log(req.session)
        if (req.session.userName) {
            next();
        } else {
            res.json({
                code: 302,
                err_msg: 'session过期',
            })
        }
    }) */

    app.use('/api/test', test);
}