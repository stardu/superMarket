<template>
    <!-- 注册 -->
    <div
        id="login"
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0; 0; 0; 0.8)"
    >
        <el-row class="box">
            <el-row type="flex" justify="center">
                <div class="title">登录</div>
            </el-row>
            <el-row>
                <el-col class="form-box">
                    <el-form ref="form" :model="form">
                        <el-form-item>
                            <el-row style="position:relative;margin-left:36px;">
                                <el-input
                                    v-model="form.phone_number"
                                    @blur="user"
                                    prefix-icon="el-icon-user"
                                    placeholder="请输入邮箱"
                                ></el-input>
                                <el-row
                                    style="position:absolute;top:33px;left:43px;color:red"
                                    v-show="user_status"
                                >{{err_text}}</el-row>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-row style="position:relative;margin-left:36px;">
                                <el-input
                                    type="password"
                                    v-model="form.password"
                                    @blur="password"
                                    show-password
                                    prefix-icon="el-icon-unlock"
                                    @keyup.enter="tologin1"
                                    placeholder="请输入密码"
                                ></el-input>
                                <el-row
                                    style="position:absolute;top:33px;left:43px;color:red"
                                    v-show="password_status"
                                >{{err_text}}</el-row>
                            </el-row>
                        </el-form-item>
                    </el-form>
                    <el-row style="margin-top:100px;" type="flex" justify="center">
                        <el-col :span="20" class="toRegister">
                            <div style="width:100%;height:100%;" @click="toLogin">立即登录</div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";
import userObj from "../api/user";
@Component({})
export default class Login extends Vue {
    form = {
        phone_number: "",
        password: ""
    };
    codeText: string = "获取验证码";
    stateCode: boolean = true;
    index: number = 1;
    user_status: boolean = false;
    password_status: boolean = false;
    phone_status: boolean = false;
    err_text: string = "";
    status: boolean = true;
    loading: boolean = false;
    group_ids: string[] = [];

    //验证用户名
    user(e: any) {
        const reg = /^\w+((.\w+)|(-\w+))@[A-Za-z0-9]+((.|-)[A-Za-z0-9]+).[A-Za-z0-9]+$/;
        if (this.form.phone_number == "") {
            this.status = false;
            this.phone_status = true;
            this.err_text = "请输入用户名";
        } else {
            if (reg.test(this.form.phone_number)) {
                this.status = true;
                this.phone_status = false;
            } else {
                this.status = false;
                this.phone_status = true;
                this.err_text = "请输入正确的用户名";
            }
        }
    }

    password() {
        if (this.form.password == "") {
            this.status = false;
            this.password_status = true;
            this.err_text = "请输入密码";
        } else {
            this.status = true;
            this.password_status = false;
        }
    }

    toLogin() {
        userObj
            .login({
                user_name: this.form.phone_number,
                pass_word: this.form.password
            })
            .then(res => {
                if (res.data.code == 200) {
                    sessionStorage.setItem("active_index", "/home/adReport");
                    this.$router.push("/home");
                }
            });
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../assets/scss/login.scss";
</style>