/* var express = require('express');
var router = express.Router(); */
import jwt from "jsonwebtoken";

import upload from "../multer";
import register from "./register";
import login from "./login";
import loginOut from "./loginOut";
import test from "./test";
import goodsType from "./goodsType";
import goodsTypeList from "./goodsTypeList";

import goods from "./goods";

export default app => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "localhost:3000");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Content-Type", "application/json;charset=utf-8");
        next();
    });

    app.use("/api/register", register);
    app.use("/api/login", login);
    app.use("/api/loginOut", loginOut);

    //验证session
    /* app.use((req, res, next) => {
          if (req.session.userName) {
              next();
          } else {
              res.json({
                  code: 302,
                  err_msg: "session过期"
              });
          }
      }); */

    //验证token
    /* app.use(function(req, res, next) {
          jwt.verify(req.headers.authorization, req.session.userName, function(
              err,
              decode
          ) {
              if (err) {
                  //  时间失效的时候/ 伪造的token
                  res.json({
                      code: 402,
                      msg: ["token无效"]
                  });
              } else {
                  console.log(decode);
                  next();
              }
          });
      }) */
    app.use(
        "/api/loginOut",
        loginOut
    );
    app.use("/api/goodsType", goodsType);
    app.use("/api/goods", upload.single(), goods);
    app.use("/api/goodsTypeList", goodsTypeList);

    //上传图片
    app.use("/api/upload", upload.single("img"), function(req, res, next) {
        res.json({ code: "200", data: req.file.path, message: "ok" });
    });

    app.use("/api/test", test);
};