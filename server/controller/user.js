import userModel from "../models/user";
import crypto from "crypto";
import jwt from "jsonwebtoken";

class User {
    /*
     * @param  {[string]}   user_name      用户名称
     * @param  {[string]}   pass_word      密码
     */
    register(req, res, next) {
            let user_name = req.body.user_name;
            let create_time = Date.now();
            let a = crypto.createHash("md5");
            let pass_word = a.update(req.body.pass_word).digest("base64");

            let _userModel = new userModel(user_name, pass_word, create_time);
            userModel
                .queryUser(user_name)
                .then(result => {
                    if (result.length != 0) {
                        res.json({
                            code: 300,
                            err_msg: "用户已经存在"
                        });
                    } else {
                        return _userModel.insertUser();
                    }
                })
                .then(rows => {
                    if (rows.affectedRows == 0) {
                        res.json({
                            code: 300,
                            err_msg: "添加失败"
                        });
                    } else {
                        res.json({
                            code: 200,
                            err_msg: "添加成功"
                        });
                    }
                })
                .catch(err => {
                    res.json({
                        code: 300,
                        err_msg: err.msg
                    });
                });
        }
        /*
         * @param  {[string]}   user_name      用户名称
         * @param  {[string]}   pass_word      密码
         */
    login(req, res, next) {
            let user_name = req.body.user_name;
            let a = crypto.createHash("md5");
            let pass_word = a.update(req.body.pass_word).digest("base64");

            userModel
                .queryUser(user_name)
                .then(rows => {
                    if (rows.length == 0) {
                        res.json({
                            code: 301,
                            err_msg: "用户不存在"
                        });
                        return;
                    }
                    if (rows[0].pass_word != pass_word) {
                        res.json({
                            code: 301,
                            err_msg: "密码错误"
                        });
                        return;
                    }
                    let content = { name: "jwt" }; // 要生成token的主题信息
                    let secretOrPrivateKey = user_name; // 这是加密的key（密钥）
                    let token = jwt.sign(content, secretOrPrivateKey, {
                        expiresIn: 60 * 60 * 2 // 2小时过期
                    });

                    req.session.userName = user_name;
                    res.json({
                        code: 200,
                        err_msg: "登录成功",
                        data: [{
                            token
                        }]
                    });
                })
                .catch(err => {
                    res.json({
                        code: 301,
                        err_msg: err.msg
                    });
                });
        }
        //登出
    loginOut(req, res, next) {
        req.session.destroy(err => {
            console.log(err);
        });
        res.json({
            code: "200",
            err_msg: "已退出登录"
        });
    }
}

export default new User();