import {http} from './http';

//手机号码登录
export function PhoneLoginAPI(phone, md5_password) {
    return http({
        url: '/login/cellphone',
        params: {
            phone,
            md5_password
        }
    })
}

// 验证手机号是否存在
export function CheckPhoneAPI(phone) {
    return http({
        url: '/cellphone/existence/check',
        params: {
            phone
        }
    })
}

// 发送验证码
export function SendCaptchaAPI(phone) {
    return http({
        url: '/captcha/sent',
        params: {
            phone
        }
    })
}

// 检验 验证码
export function CheckCaptchaAPI(phone, captcha) {
    return http({
        url: '/captcha/verify',
        params: {
            phone,
            captcha
        }
    })

}

// 注册
export function RegisterAPI(captcha, phone, password, nickname) {
    return http({
        url: '/register/cellphone',
        params: {
            captcha,
            phone,
            password,
            nickname
        }
    })
}

// 轮播图
export function GetBannerAPI(type) {
    return http({
        url: '/banner',
        params: {
            type
        }
    })
}

// 首页-发现
export function GetHomeFindAPI() {
    return http({
        url: '/homepage/block/page',
    })
}

// 首页-发现-圆形图标入口列表
export function GetHomeIconAPI() {
    return http({
        url: '/homepage/dragon/ball',
    })
}

// 私人FM
export function GetFmAPI() {
    return http({
        url: '/personal_fm',
    })
}

// 每日推荐歌曲
export function GetRecommendSongAPI() {
    return http({
        url: '/recommend/songs'
    })
}

// 每日推荐歌单
export function GetRecommendSongListAPI() {
    return http({
        url: '/personalized',
        params: {
            limit: '6'
        }
    })
}

// 热门歌单
export function GetHotPlayList(limit = 50, order = 'hot', cat = '全部') {
    return http({
        url: '/top/playlist',
        params: {
            limit,
            order,
            cat
        }
    })
}

// 所有榜单内容
export function GetTopListAPI() {
    return http({
        url: '/toplist/detail'
    })
}

// 获取音乐详情
export function GetMusicDetail(musicId) {
    return http({
        url: '/song/detail',
        params: {
            ids: musicId
        }
    })
}

// 获取音乐MP3文件
export function GetMusicUrlAPI(musicId) {
    return http({
        url: '/song/url',
        params: {
            id: musicId
        }
    })
}

// 获取音乐是否又版权
export function GetMusicCheck(musicId) {
    return http({
        url: '/check/music',
        params: {
            id: musicId
        }
    })
}
