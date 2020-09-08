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
                        @fullscreen="handleFullscreen"/>

                <div class="videoInfo" @click="ToDetail(index)">
                    <p class="videoTitle">{{videoList[index].title}}</p>
                    <p class="platTimeText">{{playCount(videoList[index].playTime)}}播放</p>
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
                            <p @click.stop="goodClick(index)" :class="{'like':item.isLike}">
                                {{item.isLike?`已点赞(${playCount(videoList[index].praisedCount)})`
                                : `点赞(${playCount(videoList[index].praisedCount)})`}}

                            </p>
                            <p>评论({{videoList[index].commentCount}})</p>
                        </template>
                    </van-cell>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {GetResourceLikeAPI, GetVideoAPI, GetVideoDetailInfoAPI} from "../../http/all-api";
    import {createVideo} from "../../../model/videoInfo";
    import {Cell, Image as VanImage} from "vant";

    export default {
        name: "videoHome",
        created() {
            this.getVideoData();
            if (this.$store.state.audioEl) {
                this.$store.state.audioEl.pause();
                if (!this.$store.state.changeIcon) this.$store.commit('showIcon');

            }
        },
        mounted() {
            let video1 = document.getElementsByTagName('video');
            video1.forEach(item => {
                item.autoplay = false;
            })

        },
        computed: {
            $video() {
                return this.$refs.vueMiniPlayer.$video;
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
            },
            goodClick(index) {
                let vid = this.videoList[index].vid;
                let t;
                let typeC = this.videoList[index];
                if (this.videoList[index].isLike) {
                    // 取消点赞
                    t = 0
                } else {
                    // 点赞
                    t = 1
                }
                GetResourceLikeAPI({id: vid, t: t, type: 5}).then(res => {
                    console.log(res);
                    if (t === 1) {
                        this.videoList[index].praisedCount++;
                        typeC.isLike = true
                    } else {
                        typeC.isLike = false;
                        this.videoList[index].praisedCount--

                    }
                    console.log(typeC);
                    console.log('点赞成功');
                }).catch(error => {
                    console.log('点赞失败');
                    console.log(error)
                })
            },
            playCount(num) {
                let numInt = parseInt(num);
                if (numInt >= 100000000) {
                    numInt = Math.round(numInt / 10000000) / 10 + '亿'
                } else if (numInt >= 10000) {
                    numInt = Math.round(numInt / 1000) / 10 + '万'
                }
                return numInt;
            },
            ToDetail(index) {
                console.log('跳转');
                this.$router.push({
                    path: '/videoDetail',
                    query: {
                        vid: this.videoList[index].vid,
                    }
                })
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
        background: #fff !important;
    }

    .qun-base-controls {
        padding: 20px 40px !important;
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

                .platTimeText {
                    font-size: 36px;
                    color: rgb(179, 179, 179);
                    padding-bottom: 30px;
                }

                .myCell {
                    padding: 0;

                    .avatarPic {
                        padding-right: 15px;
                    }

                    .valueText {
                        display: flex;
                        justify-content: space-around;
                    }

                    .like {
                        color: #c2463a;
                    }
                }

            }

        }
    }
</style>
