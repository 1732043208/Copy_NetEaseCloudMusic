<template>
    <div class="videoDetail">
        <comm-nav title="视频详情"></comm-nav>
        <scroll
                class="content"
                ref="scroll"
                :pull-up-load="true"
                @pullingUp="pullingUp">
            <div>
                <vue-mini-player
                        ref="vueMiniPlayer"
                        :mutex="true"
                        :video="playerOptions"
                        @videoPlay="onVideoPlay"
                        @fullscreen="handleFullscreen"/>
                <div class="info">
                    <h4>{{videoDetail.title}}</h4>
                    <p>{{$route.query.playTime|playCount}}播放
                        <span>{{videoDetail.publishTime|formatDate}}</span>
                    </p>

                    <div class="orderInfo">
                        <div class="musicSort-item" :class="{'like':videoDetailInfo.liked}" @click="goodClick">
                            <van-icon size="24" name="good-job-o"/>
                            <p>{{videoDetailInfo.likedCount|playCount}}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="send-gift-o"/>
                            <p>{{videoDetail.subscribeCount|playCount}}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="comment-o"/>
                            <p>{{videoDetailInfo.commentCount|playCount}}</p>

                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="cluster-o"/>
                            <p>{{videoDetailInfo.shareCount|playCount}}</p>
                        </div>
                    </div>
                    <van-cell
                            class="myCell"
                            center
                            :title="videoDetail.nickname"
                            value-class="valueText">
                        <template #icon>
                            <van-image
                                    class="avatarPic"
                                    width="2rem"
                                    height="2rem"
                                    round
                                    :src="videoDetail.avatarUrl">
                            </van-image>
                        </template>
                    </van-cell>
                </div>
                <div class="divider"></div>
                <div class="relatedVideo">
                    <h4>相关视频</h4>
                    <div class="topBox">
                        <van-cell
                                v-for="(item,index) in videoRelated"
                                class="mc-cell"
                                :center="true"
                                :border="false"
                                title-class="titleText"
                                @click="ToDetail(index)">
                            <!--                            :title="value.uiElement.mainTitle.title"-->
                            <template #title>
                                <p>
                                    {{item.title}}
                                </p>
                            </template>
                            <template #label>
                                <p class="labelTextStyle">
                                    {{item.durationms|formatDuring}}&nbsp; by &nbsp;
                                    {{item.userName}}
                                </p>
                            </template>
                            <template #icon>
                                <van-image
                                        class="leftImage"
                                        width="6rem" height="4.2rem"
                                        radius="5"
                                        :src="item.coverUrl" alt="">
                                </van-image>
                            </template>

                        </van-cell>
                    </div>
                </div>
                <div class="marvellousVideo">
                    <h4>精彩评论</h4>
                    <div class="hot">

                        <div
                                v-for="(item,index) in hotComment"
                                :key="index">
                            <van-cell
                                    :border="false"
                                    center
                                    title-class="titleText"
                                    value-class="likeCountText"
                                    label-class="timeText">
                                <template #title>
                                    <p>{{item.nickname}}</p>
                                </template>
                                <template #label>
                                    <p>{{item.time|formatDate}}</p>
                                </template>
                                <template #icon>
                                    <van-image
                                            class="avatarPic"
                                            round
                                            width="2.3rem"
                                            height="2.3rem"
                                            :src="item.avatarUrl">
                                    </van-image>
                                </template>
                                <template #default>
                                    <div class="valueText" :class="{'like':item.isLike}"
                                         @click="goodCommentClick(index,0)">
                                        <p>{{item.likedCount|playCount}}</p>
                                        <van-icon size="20" name="good-job-o"/>
                                    </div>
                                </template>
                            </van-cell>
                            <div class="contentText">
                                <p>{{item.content}}</p>
                            </div>
                            <van-divider></van-divider>
                        </div>
                    </div>
                    <h4>最近评论</h4>
                    <div class="new">
                        <div>
                            <div
                                    v-for="(item,index) in newComment"
                                    :key="index">
                                <van-cell
                                        :border="false"
                                        center
                                        title-class="titleText"
                                        value-class="likeCountText"
                                        label-class="timeText">
                                    <template #title>
                                        <p>{{item.nickname}}</p>
                                    </template>
                                    <template #label>
                                        <p>{{item.time|formatDate}}</p>
                                    </template>
                                    <template #icon>
                                        <van-image
                                                class="avatarPic"
                                                round
                                                width="2.3rem"
                                                height="2.3rem"
                                                :src="item.avatarUrl">
                                        </van-image>
                                    </template>
                                    <template #default>
                                        <div class="valueText" :class="{'like':item.isLike}"
                                             @click="goodCommentClick(index,1)">
                                            <p>{{item.likedCount|playCount}}</p>
                                            <van-icon size="20" name="good-job-o"/>
                                        </div>
                                    </template>
                                </van-cell>
                                <div class="contentText">
                                    <p>{{item.content}}</p>
                                </div>
                                <van-divider></van-divider>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from "../../components/scroll";
    import commNav from "../../components/nav/commNav";
    import {
        GetVideoDetailAPI,
        GetVideoDetailInfoAPI,
        GetVideoRelatedAPI,
        GetVideoUrlAPI,
        GetVideoCommentAPI, GetResourceLikeAPI, GetLikeAPI
    } from "../../http/all-api";
    import {createVideoDetailInfo} from "../../../model/videoDetailInfo";
    import {createVideoRelated} from "../../../model/videoRelatedInfo";
    import {formatDate, unique, formatDuring} from "../../components/common/utils";
    import {Cell, Divider, Icon, Image as VanImage} from "vant";
    import {createCommentHotInfo} from "../../../model/commentInfo";

    export default {
        name: "video-detail",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0

            });
        },
        created() {
            GetVideoUrlAPI(this.$route.query.vid).then(res => {
                let videoUrl = res.data.urls[0].url;
                console.log(videoUrl);
                if (videoUrl !== null) {
                    this.playerOptions.url = videoUrl;
                    this.$refs.vueMiniPlayer.$video.src = videoUrl;
                    this.$refs.vueMiniPlayer.$video.autoplay = true;
                }
            })
                .catch(error => {
                    console.log('跳转获取视频url失败');
                    console.log(error);
                });
            this.getVideoDetailData(this.$route.query.vid);
            this.getVideoDetailInfoData(this.$route.query.vid);
            this.getVideoRelatedData(this.$route.query.vid);
            this.getVideoCommentData({id: this.$route.query.vid, limit: this.newLimit});
            this.$toast.clear();
        },
        computed: {
            srcUrl() {
                return this.$route.query.srcUrl
            },
            vid() {
                return this.$route.query.vid
            },
            coverUrl() {
                return this.$route.query.coverUrl
            },
        },
        data() {
            return {
                playerOptions: {
                    url: this.$route.query.srcUrl,
                    cover: this.$route.query.coverUrl,
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    volume: 1,
                    autoplay: true,
                    mutex: true,
                },
                videoDetail: {},
                videoDetailInfo: {},
                videoRelated: [],
                hotComment: [],
                newComment: [],
                newLimit: 20,

            }
        },
        methods: {
            // 视频详情
            getVideoDetailData(id) {
                GetVideoDetailAPI(id).then(res => {
                    let result = res.data.data;
                    this.videoDetail = createVideoDetailInfo(result);
                    console.log(this.videoDetail);
                }).catch(error => {
                    console.log('获取视频详情失败');
                    console.log(error);
                })

            },
            getVideoDetailInfoData(vid) {
                GetVideoDetailInfoAPI(vid).then(res => {
                    let data = res.data;
                    this.videoDetailInfo.likedCount = data.likedCount;
                    this.videoDetailInfo.shareCount = data.shareCount;
                    this.videoDetailInfo.commentCount = data.commentCount;
                    this.videoDetailInfo.liked = data.liked;

                }).catch(error => {
                    console.log('获取点赞信息失败');
                    console.log(error);
                })
            },
            goodClick(index) {
                let vid = this.vid;
                let t;
                if (this.videoDetailInfo.liked) {
                    // 取消点赞
                    t = 0
                } else {
                    // 点赞
                    t = 1
                }
                GetResourceLikeAPI({id: vid, t: t, type: 5}).then(res => {
                    console.log('点赞成功');
                }).catch(error => {
                    console.log('点赞失败');
                    console.log(error)
                })
            },
            // 视频相关视频
            getVideoRelatedData(id) {
                GetVideoRelatedAPI(id).then(res => {
                    console.log(res.data.data);
                    let result = res.data.data;
                    result.forEach(item => {
                        this.videoRelated.push(createVideoRelated(item))
                    });
                    console.log(this.videoRelated);
                }).catch(error => {
                    console.log('相关视频请求失败');
                    console.log(error);
                })
            },
            // 视频评论
            getVideoCommentData({id, limit}) {
                GetVideoCommentAPI(id, limit).then(res => {
                    let resultHot = res.data.hotComments;
                    let resultNew = res.data.comments;
                    resultHot.forEach(item => {
                        this.hotComment.push(createCommentHotInfo(item))
                    });
                    resultNew.forEach(item => {
                        this.newComment.push(createCommentHotInfo(item))
                    });
                    if (this.newComment.length !== 0) {
                        this.newComment = unique(this.newComment);
                        if (this.newComment.length >= 20) this.$refs.scroll.finishPullUp();

                    }

                }).catch(error => {
                    console.log('视频评论请求失败');
                    console.log(error);
                })
            },
            pullingUp() {
                this.newLimit += 20;
                this.getVideoCommentData({id: this.$route.query.vid, limit: this.newLimit})
            },
            onVideoPlay() {
                console.log('开始播放');
            },
            handleFullscreen() {
                console.log('全屏播放');
            },
            ToDetail(index) {
                let videoUrl = null;
                GetVideoUrlAPI(this.videoRelated[index].vid).then(res => {
                    videoUrl = res.data.urls[0].url;
                    console.log(videoUrl);
                    if (videoUrl !== null) {
                        this.playerOptions.url = videoUrl;
                        this.$refs.vueMiniPlayer.$video.src = videoUrl;
                        this.$refs.vueMiniPlayer.$video.autoplay = true;
                        this.playerOptions.cover = this.videoRelated[index].coverUrl;
                        this.getVideoDetailData(this.videoRelated[index].vid);
                        this.getVideoRelatedData(this.videoRelated[index].vid);
                        this.getVideoDetailInfoData(this.videoRelated[index].vid)
                    }
                })
                    .catch(error => {
                        console.log('跳转获取视频url失败');
                        console.log(error);
                    });

            },
            goodCommentClick(index, type) {
                // 0 热门   1 新评论
                let cid = type === 1 ? this.newComment[index].id : this.hotComment[index].id;
                let t;
                let typeC;
                if (type === 1) {
                    if (this.newComment[index].isLike) {
                        // 取消点赞
                        t = 0
                    } else {
                        // 未点赞
                        t = 1
                    }
                    typeC = this.newComment[index];
                } else {
                    if (this.hotComment[index].isLike) {
                        // 取消点赞
                        t = 0
                    } else {
                        // 未点赞
                        t = 1
                    }
                    typeC = this.hotComment[index];

                }
                GetLikeAPI({id: this.vid, cid: cid, t: t, type: 5}).then(res => {
                    if (t === 1) {
                        typeC.likedCount++;
                        typeC.isLike = true
                    } else {
                        typeC.likedCount--;

                        typeC.isLike = false;
                    }
                    console.log(typeC);
                    console.log('点赞成功');
                }).catch(error => {
                    console.log('点赞失败');
                    console.log(error)
                })
            }
        },
        components: {
            Scroll,
            commNav,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [VanImage.name]: VanImage,
            [Divider.name]: Divider,

        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日')
            },
            playCount(num) {
                if (num >= 100000000) {
                    num = Math.round(num / 10000000) / 10 + '亿'
                } else if (num >= 10000) {
                    num = Math.round(num / 1000) / 10 + '万'
                }
                return num;
            },
            formatDuring(mss) {
                return formatDuring(mss);
            }
        }
    }
</script>

<style scoped lang="less">
    .comm() {
        .mc-cell {
            width: 100vw;
            margin: 30px 15px 0 0;
        }

        .leftImage {
            margin-left: 30px;
            margin-right: 30px;
        }

        .rightImage {
            padding-right: 40px;
        }

        .titleText {
            width: 500px;
            font-weight: 600;
            font-size: 36px;

            p {
                width: 700px;
                white-space: pre-wrap;

            }
        }
        .labelTextStyle {
            width: 500px;
            font-size: 30px;
            color: rgb(175, 175, 175);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }

    .cellComm() {
        .avatarPic {
            padding: 30px;
        }

        .timeText {
            font-size: 26px;
        }

        .valueText {
            display: flex;
            justify-content: flex-end;
            padding-right: 15px;
        }
        .like {
            color: #c2463a;
        }
        .contentText {
            white-space: pre-wrap;
            padding: 0 50px 20px 150px;
            font-size: 38px;
        }
    }

    .videoDetail {
        .content {
            overflow: hidden;
            position: absolute;
            top: 120px;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 0;
            touch-action: none;

            .info {
                padding: 30px;

                p {
                    padding-top: 30px;
                    color: #a7a6a7;
                    font-size: 36px;
                }

                h4 {
                    white-space: pre-wrap;
                }

                .orderInfo {
                    width: 95vw;
                    display: flex;
                    justify-content: space-around;
                    margin-top: 50px;

                    .musicSort-item {
                        text-align: center;
                        margin: 0 15px;
                        font-size: 36px;
                    }

                    .like {
                        color: #c2463a;
                    }
                }

                .myCell {
                    padding: 0;
                    margin-top: 50px;

                    .avatarPic {
                        padding-right: 15px;
                    }

                    .valueText {
                        display: flex;
                        justify-content: space-around;
                    }
                }
            }

            .divider {
                width: 100vw;
                height: 30px;
                background-color: rgb(245, 245, 245);
            }

            .relatedVideo {
                padding: 30px;

                .topBox {
                    .comm()
                }
            }
        }

        .marvellousVideo {
            padding: 30px;


            .hot {
                .cellComm();
            }

            .new {
                .cellComm();
            }
        }
    }
</style>
