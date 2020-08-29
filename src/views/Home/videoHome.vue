<template>
    <div class="videoHome">
        <ul>
            <li class="videoLi"
                v-if="videoList.length !== 0 && playerOptions.length!==0"
                v-for="(item,index) in videoList"
                :key="index">
                <vue-mini-player
                        ref="vueMiniPlayer"
                        :video="playerOptions[index]"
                        :mutex="true"
                        @videoPlay="onVideoPlay"
                        @fullscreen="handleFullscreen"/>
                <div class="videoInfo">
                    <p class="videoTitle">{{videoList[index].title}}</p>
                    <van-cell
                            class="myCell"
                            center
                            :title="videoList[index].nickname"
                    value-class="valueText">
                        <template #icon>
                            <van-image
                                    class="avatarPic"
                                    width="2rem"
                                    height="2rem"
                                    round
                                    :src="videoList[index].avatarUrl">

                            </van-image>
                        </template>
                        <template #default>
                            <p>点赞({{videoList[index].praisedCount}})</p>
                            <p>评论({{videoList[index].commentCount}})</p>
                        </template>
                    </van-cell>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {GetVideoAPI} from "../../http/all-api";
    import {createVideo} from "../../../model/videoInfo";
    import {Cell, Image as VanImage} from "vant";

    export default {
        name: "videoHome",
        created() {
            this.getVideoData();
        },
        mounted() {

        },
        computed: {
            video() {
                return this.$refs.vueMiniPlayer;
            }
        },
        data() {
            return {
                videoList: [],
                playerOptions: [],
            }
        },
        methods: {
            async getVideoData() {
                await GetVideoAPI().then(res => {
                    let result = res.data.datas;
                    console.log(result);
                    result.forEach(item => {
                        this.videoList.push(createVideo(item.data))
                    });
                    console.log(this.videoList);
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

            handleFullscreen() {
            },
            onVideoPlay() {
                console.log('播放了');
            }
        },
        components: {
            [Cell.name]: Cell,
            [VanImage.name]: VanImage,
        },

    }
</script>

<style lang="less">
    .qun-player {
        border-radius: 15px;
    }

    .qun-base-controls {
        padding: 0 40px !important;
    }

    ._vol {
        display: none;
    }

    ._slider-btn {
        background-color: #c2463a !important;
    }

    ._slider-cur {
        background-color: #c2463a !important;
    }

    .videoHome {
        width: 100vw;

        .videoLi {
            width: 95vw;

            padding: 0 30px;
            border-radius: 15px;
            margin-top: 100px;

            .videoInfo {
                .videoTitle {
                    white-space: pre-wrap;
                    padding: 30px 15px;
                    letter-spacing: 2px;
                    font-size: 38px;
                }

                .myCell {
                    padding: 0;

                    .avatarPic {
                        padding-right: 15px;
                    }
                    .valueText{
                        display: flex;
                        justify-content: space-around;
                    }
                }

            }

        }
    }
</style>
