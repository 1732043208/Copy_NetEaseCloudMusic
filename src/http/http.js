import axios from 'axios';

import Vue from "vue";
import router from "../router";
import store from '../store'

let token = '';

export function http(config) {
    const instance = axios.create({
        // 跨域请求，使用代理
        // NetEaseCloudMusicApi代表 http://localhost:3000
        baseURL: 'NetEaseCloudMusicApi',
        timeout: 5000,
        withCredentials: true
    });
    instance.interceptors.request.use(config => {
        token = sessionStorage.token !== '' ? sessionStorage.token : token;
        config.headers['token'] = token;
        return config
    }, error => {
        console.log('请求出错' + error);
        return Promise.reject(error.response);
    });

    instance.interceptors.response.use(response => {
        if (response.config.headers.token) {
            token = response.data.token;
            sessionStorage.setItem("token", response.data.token);
            store.commit('changeLogin', true);
        }
        return response
    }, error => {
        console.log('响应出错');
        console.dir(error);
        if (error.response.status) {
            switch (error.response.status) {
                case 401:
                    sessionStorage.removeItem('token');
                    router.push({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    });
                    Vue.prototype.$toast('登陆过期');
                    break;
                case 404:
                    Vue.prototype.$toast('请求不存在');
                    break;
                case 400:
                    Vue.prototype.$toast('参数错误');
                    break;
                case 403:
                    Vue.prototype.$toast('没有权限');
                    setTimeout(() => {
                        router.replace({
                            path: '/',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, 1000)
                    break;
                default:
                    console.error(error.response)

            }
            return Promise.reject(error.response)
        }
        // if (error.response) {
        //     if (error.response.status === 404) {
        //         error.message = '请求出错404';
        //         console.log(error.response);
        //         if (error.response.data) Vue.prototype.$toast(error.response.data.message);
        //         return error.message
        //     }
        //     if (error.response.status === 400) console.log('参数错误400');
        //     if (error.response.status === 500) console.log('服务器错误500');
        // } else {
        //     error.message = '连接服务器失败'
        // }
        return error.message;

    });
    return instance(config);
}
