import Vue from 'vue'
import Vuex from 'vuex'
import {GetMusicDetail, GetMusicUrlAPI} from "../http/all-api";
import {createMusicInfo} from "../../model/musicInfo";
import {unique} from "../components/common/utils";
import {Toast} from 'vant'
import persistedState from 'vuex-persistedstate'

Vue.use(Toast);
Vue.use(Vuex)


export default new Vuex.Store({
    plugins: [persistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
                historyList: val.historyList
            }
        }
    })],
    state: {
        isLogin: false,
        musicId: null,
        musicUrl: null,
        isPlay: false,
        isShowDrawer: false,
        changeIcon: false,
        userInfo: {},
        currentTimer: 0,
        maxTimer: 0,
        musicAllDetail: {},
        playList: [],
        musicIndex: 0,
        commentCount: 0,
        audioEl: null,
        historyList: [],
        searchResult: [],
        searchResultShow: false,
        searchResultList: [],
        guanjianci: '',
        niubi: ''
    },
    mutations: {
        // musicId
        changeMusicId(state, newId) {
            state.musicId = newId;
        },
        changeMusicUrl(state, newUrl) {
            state.musicUrl = newUrl;
        },
        // 正在播放
        IsPlaying(state) {
            state.isPlay = true;
        },
        NotPlaying(state) {
            state.isPlay = false;
        },
        showIcon(state) {
            state.changeIcon = !state.changeIcon;
        },
        toggleDrawer(state) {
            state.isShowDrawer = !state.isShowDrawer
        },
        joinPlayList(state, data) {
            state.playList.push(data);
            state.playList = unique(state.playList);
        },
        changeMusicIndex(state, index) {
            state.musicIndex = index;
        },
        changeCommentCount(state, count) {
            state.commentCount = count;
        },
        changeAudioEl(state, el) {
            state.audioEl = el;
        },
        historyBianLiList(state, haha) {

            state.historyList = haha
        },
        historyClean(state) {
            state.historyList = []
        },
        searchResult(state, result) {

            state.searchResult = result
        },
        searchResultShow(state, IsShow, Value) {
            if (Value === '') {
                state.searchResultShow = false
            }
            state.searchResultShow = IsShow;
        },
        searchResultList(state, lists) {
            state.searchResultList = lists;
        },
        guanjianci(state, item) {
            state.guanjianci = item
        },
        searchWord(state, val) {
            state.guanjianci = val;
        },
        niubi(state, val) {
            state.niubi = val
        },
        shabi(state) {
            state.niubi = '';
            console.log(state.niubi);
        }
    },
    actions: {
        getMusicUrl(context, musicId) {
            GetMusicUrlAPI(musicId).then(res => {
                if (res.data.data[0].url !== null) {
                    context.commit('changeMusicUrl', res.data.data[0].url);
                    context.commit('NotPlaying');
                    context.state.changeIcon = false;
                    context.state.musicAllDetail.musicUrl = res.data.data[0].url;
                } else {
                    Toast('获取音乐播放地址失败');
                    context.commit('NotPlaying');
                    context.commit('showIcon');
                    context.commit('changeMusicUrl', '')
                }
            }).catch(error => {
                console.dir(Vue);
                Toast('获取音乐播放地址失败');
                console.log('获取音乐url失败');
                console.log(error);
            })
        },
        getMusicDetail(context, musicId) {
            GetMusicDetail(musicId).then(res => {
                let musicInfo;
                res.data.songs.forEach(item => {
                    musicInfo = createMusicInfo(item);
                    let musicAllDetail = context.state.musicAllDetail;
                    let test = {};
                    let {album, albumId, id, mvId, name, picUrl, singer, singerId} = musicInfo;
                    musicAllDetail.album = album;
                    musicAllDetail.albumId = albumId;
                    musicAllDetail.id = id;
                    musicAllDetail.mvId = mvId;
                    musicAllDetail.name = name;
                    musicAllDetail.picUrl = picUrl;
                    musicAllDetail.singer = singer;
                    musicAllDetail.singerId = singerId;
                    //
                    test.album = album;
                    test.albumId = albumId;
                    test.musicUrl = musicAllDetail.musicUrl;
                    test.id = id;
                    test.mvId = mvId;
                    test.name = name;
                    test.picUrl = picUrl;
                    test.singer = singer;
                    test.singerId = singerId;
                    test.isColor = false;
                    context.commit('joinPlayList', test);
                })
            }).catch(error => {
                console.log('获取音乐名字出错');
                console.log(error.message);
            })
        },

    },
    modules: {},
    getters: {}
})
