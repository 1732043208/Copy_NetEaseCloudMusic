import Vue from 'vue'
import Vuex from 'vuex'
import {GetMusicDetail, GetMusicUrlAPI} from "../http/all-api";
import {createMusicInfo} from "../../model/musicInfo";
import {unique} from "../components/common/utils";

Vue.use(Vuex)

export default new Vuex.Store({
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
        musicIndex:0,
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
        changeMusicIndex(state,index){
            state.musicIndex = index;
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
                    console.log(context.state.musicAllDetail.musicUrl);
                } else {
                    this.$toast('获取音乐播放地址失败');
                    context.commit('NotPlaying');
                    context.commit('showIcon');
                    context.commit('changeMusicUrl', '')
                }
            }).catch(error => {
                console.log('获取音乐url失败');
                console.log(error);
            })
        },
        getMusicDetail(context, musicId) {
            GetMusicDetail(musicId).then(res => {
                let musicInfo = createMusicInfo(res.data.songs[0]);
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
                console.log(context.state.playList);
            }).catch(error => {
                console.log('获取音乐名字出错');
                console.log(error.message);
            })
        },
    },
    modules: {},
    getters: {}
})
