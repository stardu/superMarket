import request from '../axios/index'

interface UserInfo {
    user_name: string,
    pass_word: string
}
class User {
    constructor() { }


    //登录
    login(data: UserInfo) {
        return request({
            url: '/api/login',
            method: 'post',
            data
        })
    }
}

export default new User()
