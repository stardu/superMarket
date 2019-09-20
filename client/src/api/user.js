import req from '../http'

export default class Login {
    //登录
    login(data) {
            return req({
                method: 'post',
                url: '/api/login',
                data
            })
        }
        //登出
    loginOut(data) {
        return req({
            method: 'post',
            url: '/api/loginOut',
            data
        })
    }
}