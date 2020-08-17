import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/musicHome.vue'

Vue.use(VueRouter);

// 路由按需加载写法
const Login = () => import('../views/login/login');
const Register = () => import('../views/login/register');
const PhoneLogin = () => import('../views/login/phone-login');
const Captcha = () => import('../views/login/captcha');
const MusicMine = () => import('../views/Mine/musicMine');
const MusicMV = () => import('../views/mv/musicMv');
const Recommend = () => import('../components/music-home-child/recommend');
const DayMusic = () => import('../views/Home/everyDayRecommend/dayMusic');
const DaySongList = () => import('../views/Home/everyDayRecommend/daySongList')

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            isShow: true
        }
    },
    {
        path: '/music-mine',
        name: 'music-mine',
        component: MusicMine,
        meta: {
            isShow: true
        },
        // children:[
        //     {
        //         path:'recommend',
        //         name:'recommend',
        //         component:Recommend
        //     }
        // ]
    },
    {
        path: '/music-mv',
        name: 'music-mv',
        component: MusicMV,
        meta: {
            isShow: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            isShow: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            isShow: false
        }
    },
    {
        path: '/phone-login',
        name: 'phone-login',
        component: PhoneLogin,
        meta: {
            isShow: false
        }
    },
    {
        path: '/captcha',
        name: 'captcha',
        component: Captcha,
        meta: {
            isShow: false
        }
    },
    {
        path: '/dayMusic',
        name: 'dayMusic',
        component: DayMusic,
        meta: {
            isShow: false
        }
    },
    {
        path: '/daySongList',
        name: 'daySongList',
        component: DaySongList,
        meta: {
            isShow: false
        }
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
