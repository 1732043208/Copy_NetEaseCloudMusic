<template>
    <div class="recommendPage">
        <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="#c2463a"
        >
            <van-swipe-item
                    v-for="(item,index) in bannerList"
                    :key="index">
                <div class="bannerBox">
                    <span
                            class="text"
                            :style="{'color':'white',
                            'background-color':'#c2463a'}"
                    >{{item.typeTitle}}</span>
                    <img
                            class="bannerImg"
                            :src="item.pic"
                            @click="BannerImgClick(item)"
                            alt="">

                </div>

            </van-swipe-item>

        </van-swipe>
        <!--        轮播图下面的推荐-->
        <music-sort></music-sort>
        <!--        推荐歌单-->
        <recommended-song-list
                v-if="songListInfoList.length>0"
                :recommend-song-list="songListInfoList"
                :top-title="topTitle1"
                :btn-more="btnMore1"></recommended-song-list>
        <!--        推荐音乐-->
        <recommend-music
                v-if="Object.keys(recommendMusic).length>0"
                :recommend-music="recommendMusic"
        ></recommend-music>
        <!--   官方歌单-->
        <official-song-list
                v-if="officialSongInfoList.length>0"
                :official-song-list="officialSongInfoList"
                :top-title="topTitle2"
                :btn-more="btnMore2"
        >

        </official-song-list>
        <yun-cun
                v-if="Object.keys(yunCun).length>0"
                :yun-cun="yunCun"></yun-cun>
    </div>

</template>

<script>
    // 引入vant组件的轮播图
    import {Swipe, SwipeItem} from 'vant';

    // 引入网络请求方法
    import {GetBannerAPI, GetHomeFindAPI} from "../../http/all-api";

    // 引入组件
    import MusicSort from "./musicSort";
    import RecommendedSongList from './recommendedSongList';
    import Scroll from '../scroll'
    import HorizontalScroll from '../horizontalScroll'
    import RecommendMusic from "./recommendMusic";
    import OfficialSongList from "./officialSongList";
    import YunCun from "./yunCun";

    export default {
        name: "recommend",
        created() {
            GetHomeFindAPI().then(res => {
                this.recommendSongList = res.data.data.blocks[0];
                this.recommendMusic = res.data.data.blocks[1];
                this.officialSongList = res.data.data.blocks[2];
                this.songListInfoList.push(...this.recommendSongList.creatives);
                this.officialSongInfoList.push(...this.officialSongList.creatives);
                if (this.recommendSongList.uiElement !== undefined) {
                    this.topTitle1 = this.recommendSongList.uiElement.subTitle.title;
                    this.btnMore1 = this.recommendSongList.uiElement.button.text;
                } else {
                    return ''
                };
                if (this.officialSongList.uiElement !== undefined) {
                    this.topTitle2 = this.officialSongList.uiElement.subTitle.title;
                    this.btnMore2 = this.officialSongList.uiElement.button.text;
                } else {
                    return ''
                };
                this.yunCun=res.data.data.blocks[3].extInfo;
            }).catch(error => {
                console.log('首页-发现出错');
                console.log(error);
            });
        },
        mounted() {
            GetBannerAPI(1).then(res => {
                if (res.data.banners.length !== 0) {
                    // 将接口返回时轮播图数据解构加入新数组中
                    this.bannerList.push(...res.data.banners);
                }
            }).catch(err => {
                console.log('轮播图网络请求失败');
                console.log(err);
            });

        },
        data() {
            return {
                bannerList: [],
                // 推荐歌单
                recommendSongList: [],
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
                yunCun:{},
            }
        },
        computed: {},
        methods: {
            BannerImgClick(item) {
                if (item.url !== null) {
                    window.location.href = item.url
                } else {
                    this.$toast('暂无数据');
                }
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
            MusicSort,
            RecommendedSongList,
            Scroll,
            HorizontalScroll,
            RecommendMusic,
            OfficialSongList,
            YunCun
        }
    }
</script>

<style scoped lang="less">
    .my-swipe .van-swipe-item {
        margin-top: 30px;
        height: 500px;
    }

    .van-swipe-item {
        position: relative;
    }

    .bannerBox {
        width: 80vw;

        .bannerImg {
            margin: 0 15px 0 20px;
            width: 96vw;
            height: 500px;
        }

        .text {
            display: block;
            position: absolute;
            bottom: 0;
            right: 21px;
            font-size: 34px;
            padding: 10px;
            border-top-left-radius: 15px;
        }
    }

    .cont {
        list-style: none;
        white-space: nowrap;
        font-size: 12px;
        text-align: center;
        padding-right: .24rem;

        .cont-item {
            position: relative;
            display: inline-block;
            padding: .06rem 0 .2rem;
            width: 600px;
            margin: 0 .1rem;

            .cont-img {
                overflow: hidden;
                /*width: 600px;*/
                height: 0;
                padding-bottom: 100%;

                .img {
                    width: 100%;
                }
            }

        }
    }

</style>
