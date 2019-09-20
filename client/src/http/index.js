import axios from "axios";
import qs from "qs";
let fetch = axios.create({
    baseURL: "", // 这里是本地express启动的服务地址
    timeout: 5000, // request timeout
    withCredentials: true
});
fetch.interceptors.request.use(
    config => {
        /* if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
                    if (typeof(config.data) !== 'string' && config.headers['Content-Type'] !== 'multipart/form-data') {
                        config.data = qs.stringify(config.data)
                    }
                } */
        let token = sessionStorage.getItem("token");
        config.headers["Authorization"] = `${token}`;
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

fetch.interceptors.response.use(
    async data => {
        return data;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 500:
                    console.log("服务器错误，请联系管理员处理");
                    break;
                case 302:
                    console.log("session过期，请重新登录");
                    break;
            }
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error);
        }
    }
);

export default fetch;