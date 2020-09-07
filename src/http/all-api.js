import {http} from './http';

// 获取登录状态
export function LoginStatusAPI() {
    return http({
        url: '/login/status',
    })
}

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

// 退出登录
export function logoutAPI() {
    return http({
        url: '/logout'
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
// export function GetRecommendSongListAPI() {
//     return http({
//         url: '/personalized',
//         params: {
//             limit: '6'
//         }
//     })
// }

// 热门歌单
export function GetHotPlayList({limit = 51, order = 'hot', cat = '全部'}) {
    return http({
        url: '/top/playlist',
        params: {
            limit,
            order,
            cat
        }
    })
}

// 精品歌单
export function GetHighqualityAPI({limit = 21, cat = '全部'}) {
    return http({
        url: '/top/playlist/highquality',
        params: {
            limit,
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

// 获取歌词
export function GetMusicLyricAPI(musicId) {
    return http({
        url: '/lyric',
        params: {
            id: musicId
        }
    })
}

// 获取歌曲评论
export function GetMusicCommentAPI(id, {limit = 20}) {
    return http({
        url: '/comment/music',
        params: {
            id,
            limit
        }
    })
}

// 获取音乐是否有版权
export function GetMusicCheck(musicId) {
    return http({
        url: '/check/music',
        params: {
            id: musicId
        }
    })
}

// 歌单详情
export function GetSongListAPI(id) {
    return http({
        url: '/playlist/detail',
        params: {
            id
        }
    })
}

// 签到
export function SignInAPI() {
    return http({
        url: '/daily_signin'
    })
}

// 专辑详情
export function GetAlbumAPI(id) {
    return http({
        url: '/album',
        params: {
            id
        }
    })
}

// 推荐视频
export function GetVideoAPI() {
    return http({
        url: '/video/timeline/recommend'
    })
}

// 给资源的评论点赞
export function GetLikeAPI({id, cid, t, type}) {
    return http({
        url: '/comment/like',
        params: {
            id,
            cid,
            t,
            type
        }
    })
}

// 资源点赞
export function GetResourceLikeAPI({type, t, id}) {
    return http({
        url: "/resource/like",
        params: {
            type,
            id,
            t
        }
    })
}

// 视频详情
export function GetVideoDetailAPI(id) {
    return http({
        url: '/video/detail',
        params: {
            id
        }
    })
}

// 相关视频推荐
export function GetVideoRelatedAPI(id) {
    return http({
        url: '/related/allvideo',
        params: {
            id
        }
    })
}

// 视频播放地址
export function GetVideoUrlAPI(id) {
    return http({
        url: '/video/url',
        params: {
            id
        }
    })
}

// 视频评论
export function GetVideoCommentAPI(id, limit) {
    return http({
        url: '/comment/video',
        params: {
            id, limit
        }
    })
}

// 视频点赞分享评论数量信息，是否已经点赞
export function GetVideoDetailInfoAPI(vid) {
    return http({
        url: '/video/detail/info',
        params: {
            vid
        }
    })
}

// 获取mv详情
export function GetMVDetailAPI(mvid) {
    return http({
        url: '/mv/detail',
        params: {
            mvid
        }
    })
}

// 获取 mv 点赞转发评论数数据
export function GetMVDetailInfoAPI(mvid) {
    return http({
        url: '/mv/detail/info',
        params: {
            mvid
        }
    })
}

// 获取mv播放地址
export function GetMVUrlAPI(id) {
    return http({
        url: '/mv/url',
        params: {
            id
        }
    })
}

// 相似MV
export function GetSiMiMvAPI(mvid) {
    return http({
        url: '/simi/mv',
        params: {
            mvid
        }
    })
}

// mv评论
export function GetMvCommentAPI(id, limit) {
    return http({
        url: '/comment/mv',
        params: {
            id,
            limit
        }
    })
}

// 默认搜索关键词
export function GetSearchGuanJianCiAPI() {
    return http({
        url: '/search/default',
    })
}

// 热搜列表(详细)
export function GetHotSearchDetailApi() {
    return http({
        url: '/search/hot/detail',
    })
}

//搜索建议
export function GetSearchSuggestApi(keywords, type) {
    return http({
        url: 'search/suggest',
        params: {
            keywords,
            type
        }
    })
}

//搜索
export function GetSearchApi(keywords,type) {
    return http({
        url: '/search',
        params: {
            keywords,
            type
        }
    })
}

// 电台推荐
export function GetDjRecommendAPI() {
    return http({
        url: '/dj/recommend'
    })
}

// 电台详情
export function GetDjDetailAPI(rid) {
    return http({
        url: '/dj/detail',
        params: {
            rid
        }
    })
}

// 电台节目
export function GetDjProgramAPI(rid, {limit = 30, asc = false}) {
    return http({
        url: '/dj/program',
        params: {
            rid,
            limit,
            asc
        }
    })
}
