import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/musicHome.vue'

Vue.use(VueRouter);

// 路由按需加载写法
const Login = () => import('../views/login/login');
const Setting = () => import('../views/login/setting');
const Register = () => import('../views/login/register');
const PhoneLogin = () => import('../views/login/phone-login');
const Captcha = () => import('../views/login/captcha');
const HomeMv = () => import('../views/Home_mv/homeMv');
const MusicMV = () => import('../views/mv/musicMv');
// const Recommend = () => import('../components/music-home-child/recommend');
const DayMusic = () => import('../views/Home/everyDayRecommendDetail/dayMusic');
const DaySongList = () => import('../views/Home/everyDayRecommendDetail/daySongList');
const AllPlayList = () => import('../views/Home/allPlayList');
const Album = () => import('../views/album/album');
const Rank = () => import('../views/Home/rank');
const CommentMusic = () => import('../views/musicComment/commentMusic');
const VideoDetail = () => import('../views/video/video-detail');
const SearchDetail = () => import('../views/search/searchDetail');
const Dj = () => import('../views/dj/dj');
const DjDetail = () => import('../views/dj/djDetail');

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
        path: '/home-mv',
        name: 'home-mv',
        component: HomeMv,
        meta: {
            isShow: true
        },
    },
    {
        path: '/music-mv',
        name: 'music-mv',
        component: MusicMV,
        meta: {
            isShow: false
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
        path: '/setting',
        name: 'setting',
        component: Setting,
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
    {
        path: '/allPlayList',
        name: 'allPlayList',
        component: AllPlayList,
        meta: {
            isShow: false
        }
    },
    {
        path: '/album',
        name: 'album',
        component: Album,
        meta: {
            isShow: false
        }
    },
    {
        path: '/rank',
        name: 'rank',
        component: Rank,
        meta: {
            isShow: false
        }
    },
    {
        path: '/commentMusic',
        name: 'commentMusic',
        component: CommentMusic,
        meta: {
            isShow: false
        }
    },
    {
        path: '/videoDetail',
        name: 'videoDetail',
        component: VideoDetail,
        meta: {
            isShow: false
        }
    },
    {
        path: '/SearchDetail',
        name: 'SearchDetail',
        component: SearchDetail,
        meta: {
            isShow: false
        }
    },
    {
        path: '/DJ',
        name: 'Dj',
        component: Dj,
        meta: {
            isShow: false
        }
    },
    {
        path: '/DJ-detail',
        name: 'Dj-detail',
        component: DjDetail,
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
