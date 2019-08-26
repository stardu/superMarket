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
}