npm
<template>
    <div class="home">
        <tab-control
                :title="['推荐','视频']"
                @tabClick="tabClick"
                ref="tabControl1">
        </tab-control>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @scroll="homeScroll"
                :pull-down-refresh="{
                         threshold: 10,
                        stop: 20
                }"
                @pullingDown="pullingDown">
            <div>
                <div class="load" v-if="isLoading">
                    <van-loading size="24px" color="#c2463a">加载中...</van-loading>
                </div>
                <recommend
                        v-if="this.currentType==='recommend'"
                        :bannerList="bannerList"
                        :songListInfoList="songListInfoList"
                        :recommendMusic="recommendMusic"
                        :topTitle1="topTitle1"
                        :btnMore1="btnMore1"
                        :officialSongList="officialSongList"
                        :officialSongInfoList="officialSongInfoList"
                        :topTitle2="topTitle2"
                        :btnMore2="btnMore2"
                        :yunCun="yunCun"
                        :liveList="liveList"
                        :liveInfoList="liveInfoList"
                        :topTitle3="topTitle3"
                        :btnMore3="btnMore3"
                        :newMusic="newMusic"
                        :newDisc="newDisc"
                />
                <video-home
                        v-if="this.currentType==='video'"
                        :video-list="videoList"
                        :player-options="playerOptions"
                />
            </div>
        </scroll>
    </div>
</template>

<script>
    // @ is an alias to /src
    import TabControl from "../../components/music-home-child/tabControl";
    import Scroll from "../../components/scroll";
    import Recommend from "../../components/music-home-child/recommend";
    import VideoHome from "../video/video-home";
    import {GetBannerAPI, GetHomeFindAPI, GetVideoAPI, GetVideoDetailInfoAPI} from "../../http/all-api";
    import {Loading} from 'vant'
    import {createVideo} from "../../../model/videoInfo";

    export default {
        name: 'Home',
        beforeCreate() {
            // console.log(this.$store.state.token);
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        async created() {
            await this.getBannerData();
            await this.getHomeData();
            this.$toast.clear();
        },

        data() {
            return {
                active: 0,
                currentType: 'recommend',
                toChangeHeight: false,
                bannerList: [],
                // 推荐歌单
                // recommendSongList: [],
                // 推荐歌单详情 图片/文案
                songListInfoList: [],
                // 推荐歌曲
                recommendMusic: {},
                // 推荐歌单的标题
                topTitle1: '',
                // 推荐歌单更多按钮文案
                btnMore1: '',
                // 官方歌单
                officialSongList: {},
                officialSongInfoList: [],
                // 官方歌单顶部标题
                topTitle2: '',
                // 官方歌单更多按钮文案
                btnMore2: '',
                // 云村
                yunCun: {},
                // 直播
                liveList: {},
                liveInfoList: [],
                topTitle3: '',
                btnMore3: '',
                // 新歌，新碟
                newMusic: [],
                newDisc: [],

                videoList: [],
                playerOptions: [],

                isLoading: false,
            }
        },
        methods: {
            // 为下拉刷新初始化数据
            initData() {
                // 推荐歌单
                // recommendSongList: [],
                // 推荐歌单详情 图片/文案
                this.songListInfoList = [];
                // 推荐歌曲
                this.recommendMusic = {};
                // 推荐歌单的标题
                this.topTitle1 = '';
                // 推荐歌单更多按钮文案
                this.btnMore1 = '';
                // 官方歌单
                this.officialSongList = {};
                this.officialSongInfoList = [];
                // 官方歌单顶部标题
                this.topTitle2 = '';
                // 官方歌单更多按钮文案
                this.btnMore2 = '';
                // 云村
                this.yunCun = {};
                // 直播
                this.liveList = {};
                this.liveInfoList = [];
                this.topTitle3 = '';
                this.btnMore3 = '';
                // 新歌，新碟
                this.newMusic = [];
                this.newDisc = [];
            },
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'recommend';
                        break;
                    case 1:
                        this.currentType = 'video';
                        this.getVideoData();
                        break;
                }
            },
            homeScroll(position) {
                if (this.$store.state.musicId !== null && !this.toChangeHeight) {
                    this.toChangeHeight = true;
                    this.$refs.scroll.$el.style.height = 80 + 'vh';
                    this.$refs.scroll.refresh();
                }
            },
            async getBannerData() {
                this.bannerList = [];
                await GetBannerAPI(1).then(res => {
                    if (res.data.banners.length !== 0) {
                        // 将接口返回时轮播图数据解构加入新数组中
                        this.bannerList.push(...res.data.banners);
                    }
                }).catch(err => {
                    console.log('轮播图网络请求失败');
                    console.log(err);
                });
            },
            async getHomeData() {
                await GetHomeFindAPI().then(res => {
                    this.initData();
                    let recommendSongList = res.data.data.blocks[0];
                    this.recommendMusic = res.data.data.blocks[1];
                    let officialSongList = res.data.data.blocks[2];
                    this.yunCun = res.data.data.blocks[3].extInfo;
                    this.songListInfoList.push(...recommendSongList.creatives);
                    this.officialSongInfoList.push(...officialSongList.creatives);
                    // 新歌新碟
                    this.newMusic.push(res.data.data.blocks[4].creatives[0], res.data.data.blocks[4].creatives[1]);
                    this.newDisc.push(res.data.data.blocks[4].creatives[2], res.data.data.blocks[4].creatives[3]);

                    // this.liveList = res.data.data.blocks[4];
                    // this.liveInfoList.push(...this.liveList.creatives);

                    if (recommendSongList.uiElement !== undefined) {
                        this.topTitle1 = recommendSongList.uiElement.subTitle.title;
                        this.btnMore1 = recommendSongList.uiElement.button.text;
                    } else {
                        return ''
                    }
                    if (officialSongList.uiElement !== undefined) {
                        this.topTitle2 = officialSongList.uiElement.subTitle.title;
                        this.btnMore2 = officialSongList.uiElement.button.text;
                    } else {
                        return ''
                    }
                    // 直播
                    // if (this.liveList.uiElement !== undefined) {
                    //     this.topTitle3 = this.liveList.uiElement.mainTitle.title;
                    //     // this.btnMore3 = this.liveList.uiElement.button.text;
                    // } else {
                    //     return ''
                    // }
                    return res;
                }).catch(error => {
                    console.log('首页-发现出错');
                    console.dir(error);
                });

            },
            async getVideoData() {
                this.videoList = [];
                await GetVideoAPI().then(res => {
                    let result = res.data.datas;
                    console.log(result);
                    result.forEach(item => {
                        this.videoList.push(createVideo(item.data))
                    });
                    if (this.videoList.length !== 0) {
                        this.videoList.forEach(item => {
                            GetVideoDetailInfoAPI(item.vid).then(res => {
                                let data = res.data;

                                item.praisedCount = data.likedCount;
                                item.shareCount = data.shareCount;
                                item.commentCount = data.commentCount;
                                item.isLiked = data.liked;

                            }).catch(error => {
                                console.log('获取点赞信息失败');
                                console.log(error);
                            })
                        })
                    }
                });
                for (let i = 0; i < this.videoList.length; i++) {
                    let arr = {
                        url: this.videoList[i].srcUrl,
                        cover: this.videoList[i].coverUrl,
                        muted: false,
                        loop: false,
                        preload: 'auto',
                        volume: 1,
                        autoplay: false,
                        mutex: true,

                    };
                    this.playerOptions.push(arr);
                }
            },
            async pullingDown() {
                this.isLoading = true;
                if (this.currentType === 'recommend') {
                    await this.getBannerData();
                    await this.getHomeData();
                } else {
                    await this.getVideoData();
                }
                this.$refs.scroll.finishPullDown();
                this.$refs.scroll.refresh();
                this.isLoading = false;
                console.log('刷新');
            }
        },
        components: {
            TabControl,
            Scroll,
            Recommend,
            VideoHome,
            [Loading.name]: Loading
        },
    }
</script>
<style scoped lang="less">
    .load {
        padding-top: 15px;
        text-align: center;
    }

    .content {
        width: 100vw;
        overflow: hidden;
        position: absolute;
        top: 220px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        touch-action: none;
    }
</style>
