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
                                {{singer}}
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
                            <p :class="{'current':!isHot}" @click="isHot = false">最热</p>
                            <p :class="{'current':isHot}" @click="isHot = true">最新</p>
                        </template>
                    </van-cell>
                </div>
                <div v-show="!isHot" class="hot">
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
                                <div class="valueText">
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
                <div v-show="isHot" class="new">
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
                                <div class="valueText">
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
            </div>
        </scroll>

    </div>
</template>

<script>
    import CommNav from "../../components/nav/commNav";
    import Scroll from "../../components/scroll";
    import {Cell, CellGroup, Icon, Image as VanImage, Divider} from "vant";
    import {GetMusicCommentAPI} from "../../http/all-api";
    import {createCommentHotInfo} from "../../../model/commentInfo";
    import {formatDate} from "../../components/common/utils";

    export default {
        name: "commentMusic",
        created() {
            this.getCommentData(this.musicId)
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
            }
        },
        methods: {
            getCommentData(id) {
                GetMusicCommentAPI(id, {limit: 20}).then(res => {
                    this.total = res.data.total;
                    let resultHot = res.data.hotComments;
                    let resultNew = res.data.comments;
                    resultHot.forEach(item => {
                        this.hotComment.push(createCommentHotInfo(item))
                    });
                    this.$store.commit('changeCommentCount', this.total);
                    resultNew.forEach(item => {
                        this.newComment.push(createCommentHotInfo(item))
                    });
                    console.log(this.hotComment);
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
                console.log(position);
                this.showTop = position.y < -123;
            }
        },
        components: {
            CommNav,
            Scroll,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            [Divider.name]: Divider,
        },
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
