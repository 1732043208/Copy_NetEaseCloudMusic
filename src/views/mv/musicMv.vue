<template>
    <div class="musicMv">
        <comm-nav title="MV详情"></comm-nav>
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
                    <h4>{{mvDetail.title}}</h4>
                    <p>{{mvDetail.playCount|playCount}}播放
                        <span>{{mvDetail.publishTime}}发布</span>
                    </p>
                    <p class="desc">
                        {{mvDetail.desc}}
                    </p>
                    <div class="orderInfo">
                        <div class="musicSort-item" :class="{'like':mvDetailInfo.liked}" @click="goodClick">
                            <van-icon size="24" name="good-job-o"/>
                            <p>{{mvDetailInfo.likedCount|playCount}}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="send-gift-o"/>
                            <p>{{mvDetail.subCount|playCount}}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="comment-o"/>
                            <p>{{mvDetailInfo.commentCount|playCount}}</p>

                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="cluster-o"/>
                            <p>{{mvDetailInfo.shareCount|playCount}}</p>
                        </div>
                    </div>
                    <van-cell
                            class="myCell"
                            center
                            :title="mvDetail.singer"
                            value-class="valueText">
                        <template #icon>
                            <van-image
                                    class="avatarPic"
                                    width="2rem"
                                    height="2rem"
                                    round
                                    :src="mvDetail.img1v1Url">
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
                            <template #title>
                                <p>
                                    {{item.title}}
                                </p>
                            </template>
                            <template #label>
                                <p class="labelTextStyle">
                                    {{item.durationms|formatDuring}}&nbsp; by &nbsp;
                                    {{item.userName}}
                                    <span>{{}}</span>
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
    import {Cell, Divider, Icon, Image as VanImage} from "vant";
    import {formatDate, formatDuring, unique} from "../../components/common/utils";
    import {
        GetMVDetailAPI,
        GetMVDetailInfoAPI,
        GetMVUrlAPI,
        GetResourceLikeAPI,
        GetVideoRelatedAPI,
        GetMvCommentAPI, GetVideoUrlAPI, GetLikeAPI,
    } from "../../http/all-api";
    import {createMvInfo} from "../../../model/mvInfo";
    import {createVideoRelated} from "../../../model/videoRelatedInfo";
    import {createCommentHotInfo} from "../../../model/commentInfo";

    export default {
        name: "music-mv",
        created() {
            this.getMvUrlData(this.$route.query.mvId);
            this.getMvDetailData(this.$route.query.mvId);
            this.getMvDetailInfoData(this.$route.query.mvId);
            this.getVideoRelatedData(this.$route.query.mvId);
            this.getMvCommentData({id: this.$route.query.mvId, limit: this.newLimit})
        },
        data() {
            return {
                playerOptions: {
                    url: '',
                    cover: '',
                    muted: false,
                    loop: false,
                    preload: 'auto',
                    volume: 1,
                    autoplay: true,
                    mutex: true,
                },
                mvDetail: {},
                mvDetailInfo: {},
                videoRelated: [],
                hotComment: [],
                newComment: [],
                newLimit: 20,
            }
        },
        methods: {
            getMvUrlData(id) {
                GetMVUrlAPI(id).then(res => {
                    let mvUrl = res.data.data.url;
                    this.playerOptions.url = mvUrl;
                    this.$refs.vueMiniPlayer.$video.src = mvUrl;
                    this.$refs.vueMiniPlayer.$video.autoplay = true;
                }).catch(error => {
                    console.log('获取播放地址失败');
                    this.$toast.fail({
                        message: '获取mv数据失败'
                    });
                    console.log(error);
                })
            },
            getMvDetailData(id) {
                GetMVDetailAPI(id).then(res => {
                    // console.log(res);
                    this.mvDetail = createMvInfo(res.data.data);
                    console.log(this.mvDetail);
                }).catch(error => {
                    console.log('获取mv详情失败');
                    console.log(error);
                })
            },
            getMvDetailInfoData(id) {
                GetMVDetailInfoAPI(id).then(res => {
                    let data = res.data;
                    this.mvDetailInfo.likedCount = data.likedCount;
                    this.mvDetailInfo.shareCount = data.shareCount;
                    this.mvDetailInfo.commentCount = data.commentCount;
                    this.mvDetailInfo.liked = data.liked;
                    console.log(this.mvDetailInfo);

                }).catch(error => {
                    console.log('获取点赞信息失败');
                    console.log(error);
                })
            },
            getVideoRelatedData(id) {
                GetVideoRelatedAPI(id).then(res => {
                    console.log(res.data.data);
                    let result = res.data.data;
                    result.forEach(item => {
                        console.log(item.durationms);
                        this.videoRelated.push(createVideoRelated(item))
                    });
                    console.log(this.videoRelated);
                }).catch(error => {
                    console.log('相关视频请求失败');
                    console.log(error);
                })
            },
            getMvCommentData({id, limit}) {
                GetMvCommentAPI(id, limit).then(res => {
                    let resultHot = res.data.hotComments;
                    let resultNew = res.data.comments;
                    if (this.hotComment.length < 15)
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
            onVideoPlay() {
                console.log('开始播放');
            },
            handleFullscreen() {
                console.log('全屏播放');
            },
            pullingUp() {
                this.newLimit += 20;
                this.getMvCommentData({id: this.$route.query.mvId, limit: this.newLimit})
            },
            ToDetail(index) {
                let mvUrl = null;
                // console.log(this.videoRelated[index]);
                this.$router.push({
                    path: '/videoDetail',
                    query: {
                        vid: this.videoRelated[index].vid,
                    }
                })
            },
            goodClick(index) {
                let vid = this.$route.query.mvId;
                let t;
                if (this.mvDetailInfo.liked) {
                    // 取消点赞
                    t = 0
                } else {
                    // 点赞
                    t = 1
                }
                GetResourceLikeAPI({id: vid, t: t, type: 1}).then(res => {
                    console.log('点赞成功');
                }).catch(error => {
                    console.log('点赞失败');
                    console.log(error)
                })
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
                GetLikeAPI({id: this.$route.query.mvId, cid: cid, t: t, type: 1}).then(res => {
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

    .musicMv {
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

                .desc {
                    white-space: pre-wrap;
                    line-height: 50px;
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
