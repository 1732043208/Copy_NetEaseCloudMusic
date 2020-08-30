<template>
    <div class="commentMusic">
        <comm-nav :title="`评论(${totalCount})`"></comm-nav>
        <div v-show="showTop" class="ceilingNav">
            <van-cell

                    center
                    title="评论区"
                    title-class="titleText"
                    value-class="commentTypeText">
                <template #default>
                    <p :class="{'current':!isHot}" @click="isHot = false">最热</p>
                    <p :class="{'current':isHot}" @click="isHot = true">最新</p>
                </template>
            </van-cell>
        </div>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @pullingUp="pullingUp"
                @scroll="commentScroll">
            <div>
                <div class="topBox">
                    <van-cell
                            class="mc-cell"
                            :center="true"
                            :border="false"
                            label-class="ov"
                            title-class="ov titleText">
                        <!--                            :title="value.uiElement.mainTitle.title"-->
                        <template #title>
                            <p>
                                {{musicName}}
                            </p>
                        </template>
                        <template #label>
                            <p>
                                歌手：{{singer}}
                            </p>
                        </template>
                        <template #icon>
                            <van-image
                                    class="leftImage"
                                    width="5rem" height="5rem"
                                    radius="5"
                                    :src="musicPic" alt="">
                            </van-image>
                        </template>
                        <template #right-icon>
                            <van-icon size="20" name="arrow" class="rightImage"/>
                        </template>
                    </van-cell>
                </div>
                <div class="dividerBox"></div>
                <div class="CommentType">
                    <van-cell
                            center
                            title="评论区"
                            title-class="titleText"
                            value-class="commentTypeText">
                        <template #default>
                            <p :class="{'current':!isHot}" @click="hotClick">最热</p>
                            <p :class="{'current':isHot}" @click="newClick">最新</p>
                        </template>
                    </van-cell>
                </div>
                <div v-show="!isHot" class="hot">
                    <van-skeleton
                            title avatar
                            :row="3"
                            :loading="loading">
                        <div>
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
                                        <div class="valueText" :class="{'like':item.isLike}" @click="goodClick(index)">
                                            <p>{{likeCount(item.likedCount)}}</p>
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
                    </van-skeleton>


                </div>
                <div v-show="isHot" class="new">
                    <van-skeleton
                            title avatar
                            :row="3"
                            :loading="loading">
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
                                        <div class="valueText" :class="{'like':item.isLike}" @click="goodClick(index)">
                                            <p>{{likeCount(item.likedCount)}}</p>
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
                    </van-skeleton>

                </div>
            </div>
        </scroll>


    </div>
</template>

<script>
    import CommNav from "../../components/nav/commNav";
    import Scroll from "../../components/scroll";
    import {Cell, CellGroup, Icon, Image as VanImage, Divider, Skeleton} from "vant";
    import {GetMusicCommentAPI, GetLikeAPI} from "../../http/all-api";
    import {createCommentHotInfo} from "../../../model/commentInfo";
    import {formatDate, unique} from "../../components/common/utils";

    export default {
        name: "commentMusic",
        created() {
            this.getCommentData(this.musicId, this.hotLimit)
        },
        computed: {
            musicId() {
                return this.$route.query.id
            },
            musicName() {
                return this.$route.query.musicName
            },
            singer() {
                return this.$route.query.singer
            },
            musicPic() {
                return this.$route.query.musicPic
            },
            totalCount() {
                return this.playCount(this.total)
            },
            likeCount(time) {
                return function (time) {
                    return this.playCount(time)
                }
            }
        },
        data() {
            return {
                total: 0,
                isHot: false,
                hotComment: [],
                newComment: [],
                showTop: false,
                loading: true,
                hotLimit: 15,
                newLimit: 20,
            }
        },
        methods: {
            getCommentData(id, limit) {
                GetMusicCommentAPI(id, {limit: limit}).then(res => {
                    this.total = res.data.total;
                    console.log(res.data.hotComments);
                    let resultHot = res.data.hotComments;
                    let resultNew = res.data.comments;
                    this.$store.commit('changeCommentCount', this.total);
                    if (!this.isHot) resultHot.forEach(item => {
                        this.hotComment.push(createCommentHotInfo(item))
                    });
                    console.log(this.isHot);
                    if (this.isHot) {
                        resultNew.forEach(item => {
                            this.newComment.push(createCommentHotInfo(item))
                        });
                        if (this.newComment.length !== 0) this.newComment = unique(this.newComment);
                    }
                    this.$refs.scroll.refresh();
                    this.loading = false;
                })
            },
            playCount(num) {
                if (num >= 100000000) {
                    num = Math.round(num / 10000000) / 10 + '亿'
                } else if (num >= 10000) {
                    num = Math.round(num / 1000) / 10 + '万'
                }
                return num;
            },
            commentScroll(position) {
                this.showTop = position.y < -123;
            },
            async pullingUp() {
                if (this.isHot) {
                    this.newLimit += 20;
                    this.$toast.loading({
                        message: '加载中',
                        forbidClick: true,
                        duration: 0
                    });
                    await this.getCommentData(this.musicId, this.newLimit);
                    this.$toast.clear();
                    setTimeout(() => {
                        this.$refs.scroll.finishPullUp();
                    }, 1000);
                } else {
                    this.$toast({
                        message: '没有更多热门评论',

                    });
                    this.$refs.scroll.finishPullUp();
                }

            },
            hotClick() {
                this.isHot = false;
            },
            newClick() {
                this.isHot = true;
                console.log(this.newComment.length);
                if (this.newComment.length < 20) {
                    console.log('真就');
                    this.getCommentData(this.musicId, this.newLimit)
                }
            },
            goodClick(index) {
                let cid = this.isHot ? this.newComment[index].id : this.hotComment[index].id;
                let t;
                let typeC;
                if (this.isHot) {
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
                GetLikeAPI({id: this.musicId, cid: cid, t: t, type: 0}).then(res => {
                    t === 1 ? typeC.isLike = true : typeC.isLike = false;
                    console.log(typeC);
                    console.log('点赞成功');
                }).catch(error => {
                    console.log('点赞失败');
                    console.log(error)
                })
            }
        }
        ,
        components: {
            CommNav,
            Scroll,
            [Cell.name]:
            Cell,
            [CellGroup.name]:
            CellGroup,
            [VanImage.name]:
            VanImage,
            [Icon.name]:
            Icon,
            [Divider.name]:
            Divider,
            [Skeleton.name]:
            Skeleton
        }
        ,
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy年MM月dd日')
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
            width: 800px;
            font-weight: 600;
            font-size: 40px;
            letter-spacing: 2px;
        }
        .ov() {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .labelTextStyle {
            width: 500px;
            font-size: 30px;
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

    .commentMusic {
        .ceilingNav {
            position: relative;
            z-index: 999;

            .titleText {
                padding: 30px;
                font-size: 42px;
                font-weight: bold;
                letter-spacing: 2px;
            }

            .commentTypeText {
                display: flex;
                text-align: right;
                justify-content: flex-end;
                margin-right: 15px;

                p {
                    padding: 0 20px;
                }

                .current {
                    color: black;
                    font-weight: bold;
                    font-size: 40px;
                }
            }
        }

        .content {
            overflow: hidden;
            position: absolute;
            top: 120px;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 0;
            touch-action: none;

            .topBox {
                .comm()
            }

            .dividerBox {
                width: 100vw;
                height: 30px;
                margin-top: 50px;
                background-color: rgba(247, 247, 247);
            }

            .CommentType {
                .titleText {
                    padding: 30px;
                    font-size: 42px;
                    font-weight: bold;
                    letter-spacing: 2px;
                }

                .commentTypeText {
                    display: flex;
                    text-align: right;
                    justify-content: flex-end;
                    margin-right: 15px;

                    p {
                        padding: 0 20px;
                    }

                    .current {
                        color: black;
                        font-weight: bold;
                        font-size: 40px;
                    }
                }
            }
        }

        .hot {
            .cellComm();
        }

        .new {
            .cellComm();

        }
    }
</style>
