<!--每日歌曲推荐-->
<template>
    <div class="dayMusic" v-if="musicInfo.length!==0">
        <div ref="topNav" class="topNav">
            <van-icon size="24" @click="goBack" color="#fff" name="arrow-left"/>
            <p class="navTitle">每日推荐</p>
        </div>
        <div v-show="isShowTop" class="musicTop">
            <div class="leftBox" @click="allPlayBtn">
                <van-icon size="24" name="play-circle-o"/>
                <p class="musicTopTitle">全部播放</p>
            </div>
            <div class="rightBox">
                <p>多选</p>
            </div>
        </div>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                :bounce="false"
                @scroll="musicListScroll">

            <div>
                <van-image
                        height="200"
                        cover
                        :src="musicInfo[1].picUrl" alt="">
                </van-image>
                <div ref="tabControl" class="musicTop">
                    <div class="leftBox" @click="allPlayBtn">
                        <van-icon size="24" name="play-circle-o"/>
                        <p class="musicTopTitle">全部播放</p>
                    </div>
                    <div class="rightBox">
                        <p>多选</p>
                    </div>
                </div>
                <van-cell-group :border="false">
                    <van-cell
                            class="mc-cell"
                            :center="true"
                            :border="false"
                            v-for="(value,index) in musicInfo"
                            :key="index"
                            label-class="ov"
                            title-class="ov titleText"
                            @click="getMusicId(value.id)">
                        <!--                            :title="value.uiElement.mainTitle.title"-->
                        <template #title>
                            <p class="ov titleText">
                                {{value.name}}
                            </p>
                        </template>
                        <template #label>
                            <p class="ov">
                                <span class="mvBox" v-if="value.mvId!==0&value.mvId!==null">mv</span>
                                {{value.singer}}—
                                <span class="titleAlias">
                            {{value.album}}</span>
                            </p>
                        </template>
                        <template #icon>
                            <van-image
                                    class="leftImage"
                                    width="50" height="50"
                                    radius="5"
                                    :src="value.picUrl" alt="">
                            </van-image>
                        </template>
                        <template #right-icon>
                            <van-icon @click.stop="musicDetailShow(index)" name="ellipsis" class="rightImage"/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>
        </scroll>
        <van-action-sheet v-model="isShowDetail">
            <div class="musicDetail">
                <van-cell-group>
                    <van-cell
                            class="mc-cell"
                            :center="true"
                            :border="false"
                            label-class="ov"
                            title-class="ov titleText">
                        <template #title>
                            <p class="ov titleText">
                                歌曲:{{musicDetail.name}}
                            </p>
                        </template>
                        <template #label>
                            <p class="ov">
                                {{musicDetail.singer}}
                            </p>
                        </template>
                        <template #icon>
                            <van-image
                                    class="leftImage"
                                    width="50" height="50"
                                    radius="5"
                                    :src="musicDetail.picUrl" alt="">
                            </van-image>
                        </template>
                    </van-cell>
                    <van-cell
                            class="cellItem"
                            size="large"
                            :center="true"
                            v-for="(item,index) in cellItem1"
                            :icon="item.icon"
                            :value="item.title"
                            :key="index"
                            value-class="cellText"
                            @click.stop="musicDetailClick(index)">
                    </van-cell>
                </van-cell-group>

            </div>
        </van-action-sheet>
    </div>
</template>

<script>
    import scroll from "../../../components/scroll";
    import musicPlay from "../../../components/common/musicPlay";
    import {GetRecommendSongAPI} from "../../../http/all-api";
    import {createMusicInfo} from "../../../../model/musicInfo";
    import {Cell, CellGroup, Image as VanImage, Icon, ActionSheet} from 'vant';

    export default {
        name: "dayMusic",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        async created() {
            await this.getMusicInfo();
            this.$toast.clear();
          if (this.isMusicPlay)  this.$refs.scroll.$el.style.height = 92 + '%';
            this.$refs.scroll.refresh();
        },
        computed: {
            isMusicPlay() {
                return this.$store.state.musicId !== null
            },
            getLength: {
                get() {
                    return this.$store.state.playList.length + 1
                }
            }
        },
        data() {
            return {
                musicInfo: [],
                musicDetail: {},
                isShowTop: false,
                isShowDetail: false,
                cellItem1: [
                    {
                        icon: 'comment-o',
                        title: '查看评论'
                    }, {
                        icon: 'cluster-o',
                        title: '分享'
                    }, {
                        icon: 'user-o',
                        title: '查看mv'
                    }, {
                        icon: 'smile-o',
                        title: '查看专辑'
                    }
                ],
            }
        },
        methods: {
            async getMusicInfo() {
                await GetRecommendSongAPI().then(res => {
                    const result = res.data.data.dailySongs;
                    result.forEach(item => {
                        this.musicInfo.push(createMusicInfo(item));
                    });
                    return res;
                }).catch(err => {
                    console.log(err);
                })
            },
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
                this.$refs.scroll.$el.style.height = 92 + '%';
                this.$refs.scroll.refresh();
                this.$store.commit('changeMusicIndex', this.getLength);

            },
            goBack() {
                this.$router.go(-1);
            },
            musicListScroll(position) {
                let opacity = Math.abs(Math.round(position.y) / 200);
                this.$refs.topNav.style.background = `rgba(0,0,0,${opacity})`;
                // this.$refs.topNav.style.color = `rgba(255,255,255,${opacity})`;
                if (position.y === 0) {
                    this.$refs.topNav.style.height = 185 + 'px'
                } else {
                    this.$refs.topNav.style.height = 'auto'
                }
                this.isShowTop = position.y <= -153;
            },
            allPlayBtn() {
                let allId = [];

                this.musicInfo.forEach(item => {
                    allId.push(item.id);
                });
                this.getMusicId(allId[0]);
                allId = allId.join(',');
                this.$store.state.musicIndex = 0;
                this.$store.dispatch('getMusicUrl', allId);
                this.$store.dispatch('getMusicDetail', allId);
            },
            musicDetailShow(index) {
                this.musicDetail = this.musicInfo[index];
                this.isShowDetail = !this.isShowDetail;
                console.log(this.musicDetail);
            },
            musicDetailClick(index) {
                this.isShowDetail = !this.isShowDetail;
                switch (index) {
                    case 0:
                        this.$router.push({
                            path: '/commentMusic',
                            query: {
                                musicName: this.musicDetail.name,
                                singer: this.musicDetail.singer,
                                musicPic: this.musicDetail.picUrl,
                                id: this.musicDetail.id
                            }
                        });
                        break;
                    case 1:
                        console.log('分享');
                        break;
                    case 2:
                        console.log('查看mv');
                        console.log(this.musicDetail.mvId);
                        if (this.musicDetail.mvId !== 0 && this.musicDetail.mvId !== null) {
                            this.$router.push({
                                path: '/music-mv',
                                query: {
                                    mvId: this.musicDetail.mvId
                                }
                            });
                        } else {
                            this.$toast('抱歉,暂无MV')
                        }

                        break;
                    case 3:
                        console.log('查看专辑');
                        this.$router.push({
                            path: '/album',
                            query: {id: this.musicDetail.albumId}
                        });
                        break;
                }
            }
        },
        components: {
            scroll,
            musicPlay,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            [ActionSheet.name]: ActionSheet,
        }
    }
</script>

<style scoped lang="less">
    .ovtext() {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

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
            font-size: 38px;

            .titleAlias {
                color: #a7a6a7;
                font-size: 36px;
            }

            .mvBox {
                display: inline-block;
                padding: 0 8px;
                color: #c2463a;
                border: 1px solid #c2463a;
                border-radius: 6px;
            }
        }

        .labelTextStyle {
            width: 500px;
            font-size: 30px;
        }
    }

    .dayMusic {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: flex-start;
            backdrop-filter: blur(10px);
            background-color: rgba(0, 0, 0, 0.2);
            height: 465px;

            .navTitle {
                padding-top: 3px;
                padding-left: 30px;
                color: #f7f8fa;

            }
        }

        .content {
            width: 100vw;
            /*height: 92%;*/
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 0;
            touch-action: none;
            .comm();
        }

        .musicDetail {
            padding: 16px 16px 30px;
            .comm();

            .cellItem {
                padding: 30px 30px;
            }

            .cellText {
                font-weight: bold;
                padding-left: 20px;
                font-size: 38px;
            }
        }
    }

    .ov {
        .ovtext();
    }

    .musicTop {
        position: relative;
        z-index: 200;
        display: flex;
        padding: 40px 30px;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;

        .leftBox {
            display: flex;
            align-items: center;

            .musicTopTitle {
                padding-left: 30px;

            }
        }

    }

</style>
