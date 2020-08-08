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
                :recommend-song-list="songListInfoList"
                :top-title="topTitle"
                :btn-more="btnMore">

        </recommended-song-list>
        <recommend-music :recommend-music="recommendMusic"></recommend-music>
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

    export default {
        name: "recommend",
        created() {
            GetHomeFindAPI().then(res => {
                this.recommendSongList = res.data.data.blocks[0];
                this.recommendMusic = res.data.data.blocks[1];
                console.log(this.recommendSongList.creatives);
                this.songListInfoList.push(...this.recommendSongList.creatives)
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
                recommendMusic: null,
            }
        },
        computed: {
            topTitle() {
                return this.recommendSongList.uiElement.subTitle.title
            },
            btnMore() {
                return this.recommendSongList.uiElement.button.text
            }
        },
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
