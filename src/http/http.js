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
        console.log('响应出错' + error);
        Vue.prototype.$toast('网络出错');
    });
    return instance(config);
}
