import axios from 'axios';

import Vue from "vue";

export function http(config) {
    const instance = axios.create({
        // 跨域请求，使用代理
        // NetEaseCloudMusicApi代表 http://localhost:3000
        baseURL: 'NetEaseCloudMusicApi',
        timeout: 5000,
        withCredentials: true
    });
    instance.interceptors.request.use(config => {
        return config
    }, error => {
        console.log('请求出错' + error);
    });
    instance.interceptors.response.use(result => {
        return result
    }, error => {
        console.log('响应出错');
        if (error.response) {
            if (error.response.status === 404) {
                error.message = '请求出错404';
                console.log(error.response);
                if (error.response.data) Vue.prototype.$toast(error.response.data.message);
                return error.message
            }
            if (error.response.status === 400) console.log('参数错误400');
            if (error.response.status === 500) console.log('服务器错误500');
        } else {
            error.message = '连接服务器失败'
        }
        return error.message;

    });
    return instance(config);
}
