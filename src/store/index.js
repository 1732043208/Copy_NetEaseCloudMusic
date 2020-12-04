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
                token: val.token,
                currentIndexRouter: val.currentIndexRouter,
                historyList: val.historyList,
                isLogin: val.isLogin
            }
        }
    })],
    state: {
        token: '',
        isLogin: false,
        currentIndexRouter: 1,
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
        addWord: '',
        searchWord: '',
        isSearchShow: false, //控制搜索框背景颜色
    },
    mutations: {
        saveToken(state, token) {
            state.token = token;
        },
        changeLogin(state, type) {
            state.isLogin = type;
        },
        changeCurrentIndexRouter(state, index) {
            state.currentIndexRouter = index;
        },
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
        showIcon(state, val) {
            if (val !== undefined) {
                state.changeIcon = val;
            } else {
                state.changeIcon = !state.changeIcon;
            }

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
            }else {
                state.searchResultShow = IsShow;
            }

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
        addWord(state, val) {
            state.addWord = val;
            console.log('addword' + state.addWord);
        },
        cutWord(state) {
            state.addWord = '';
            console.log('cutword' + state.addWord);
        },
        searchWordFunc(state, val) {
            state.searchWord = val
        },
        update_musicAllDetail(state, {type, val}) {
            state.musicAllDetail[type] = val;
        },
        isSearchShowFunc(state, val) {
            state.isSearchShow = val
        }
    },
    actions: {
        getMusicUrl(context, musicId) {
            GetMusicUrlAPI(musicId).then(res => {
                if (res.data.data[0].url !== null) {
                    context.commit('changeMusicUrl', res.data.data[0].url);
                    context.commit('NotPlaying');
                    context.commit('showIcon', false);
                    context.commit('update_musicAllDetail', {type: 'musicUrl', val: res.data.data[0].url});
                    // state.musicAllDetail.musicUrl = res.data.data[0].url;
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
                    let playList = {};
                    for (let item in musicInfo) {
                        if (musicInfo.hasOwnProperty(item)) {
                            context.commit('update_musicAllDetail', {type: item, val: musicInfo[item]});
                        }
                    }
                    //
                    for (let item in musicInfo) {
                        if (musicInfo.hasOwnProperty(item)) {
                            playList[item] = musicInfo[item];
                        }
                    }
                    context.commit('joinPlayList', playList);
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
