<!--每日歌曲推荐-->
<template>
    <div class="dayMusic">
        <div ref="topNav" class="topNav">
            <van-icon size="24" @click="goBack" color="#fff" name="arrow-left"/>
            <p class="navTitle">每日推荐</p>
        </div>
        <div v-show="isShowTop" class="musicTop">
            <div class="leftBox">
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
                        src="http://pic.netbian.com/uploads/allimg/200808/000233-1596816153ef00.jpg" alt="">
                </van-image>
                <div ref="tabControl" class="musicTop">
                    <div class="leftBox">
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
                                {{value.singer}}&nbsp--&nbsp
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
                            <van-icon name="ellipsis" class="rightImage"/>
                        </template>
                    </van-cell>
                </van-cell-group>
            </div>

        </scroll>
    </div>
</template>

<script>
    import scroll from "../../../components/scroll";
    import musicPlay from "../../../components/common/musicPlay";
    import {GetRecommendSongAPI} from "../../../http/all-api";
    import {createMusicInfo} from "../../../../model/musicInfo";
    import {Cell, CellGroup, Image as VanImage, Icon} from 'vant';

    export default {
        name: "dayMusic",
        created() {
            this.getMusicInfo();
        },
        computed: {
            isMusicPlay() {
                return this.$store.state.musicId !== null
            }
        },
        data() {
            return {
                musicInfo: [],
                isShowTop: false
            }
        },
        methods: {
            getMusicInfo() {
                GetRecommendSongAPI().then(res => {
                    // todo 每日推荐歌曲接通
                    const result = res.data.data.dailySongs;
                    result.forEach(item => {
                        this.musicInfo.push(createMusicInfo(item));
                    });

                    // this.musicInfo = new musicReModel();
                    console.log(this.musicInfo);
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
            },
            goBack() {
                this.$router.go(-1);
            },
            musicListScroll(position) {
                let opacity = Math.abs(Math.round(position.y) / 100);
                this.$refs.topNav.style.background = `rgba(114,114,114,${opacity})`;
                this.$refs.topNav.style.color = `rgba(255,255,255,${opacity})`;
                this.isShowTop = position.y <= -153;
            }
        },
        components: {
            scroll,
            musicPlay,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
        }
    }
</script>

<style scoped lang="less">
    .ovtext() {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .dayMusic {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: center;

            .navTitle {
                padding-left: 30px;
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
            }

            .labelTextStyle {
                width: 500px;
                font-size: 30px;
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
