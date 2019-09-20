var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

import fs from "fs";

import session from "express-session";
import router from "./routes/index";
import bodPrase from "body-parser";

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//生成日志文件
/* let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a"
});
app.use(logger("combined", { stream: accessLogStream })); */
app.use(logger("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
/* app.use(bodPrase.json()); */
app.use(bodPrase.urlencoded({ extended: false }));
app.use(bodPrase.json());

app.use(
    session({
        //参数配置
        secret: "luckystar", //加密字符串
        name: "session_id", //返回客户端key的名称，默认为connect_sid
        resave: false, //强制保存session，即使它没有变化
        saveUninitialized: false, //强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
        cookie: { maxAge: 1000 * 60 * 60 }
        //rolling: true //在每次请求时进行设置cookie，将重置cookie过期时间
        // store:new mongoStore({//将session数据存储到mongo数据库中
        // 	url:'mongodb://127.0.0.1/admin', //数据库地址
        // 	touchAfter:24*3600  //多长时间往数据库中更新存储一次，除了在会话数据上更改了某些数据除外
        // })
    })
);
app.use(express.static(path.join(__dirname, "public")));

router(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;