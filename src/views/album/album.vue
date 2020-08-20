<template>
    <div class="album">
        <div ref="topNav" class="topNav">
            <van-icon size="24" @click="goBack" color="#fff" name="arrow-left"/>
            <p class="navTitle">专辑</p>
        </div>
        <div v-show="isShowTop" class="musicTop">
            <div class="leftBox">
                <van-icon size="24" name="play-circle-o"/>
                <p class="musicTopTitle">全部播放<span>(共{{albumMusic.length}}首)</span></p>
            </div>
            <div class="rightBox">
                <van-button
                        class="subscribedBtn"
                        round
                        type="danger"
                        color="rgb(253,59,59)"
                > + 收藏
                </van-button>
            </div>
        </div>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                :bounce="false"
                @scroll="musicListScroll">

            <div id="content">
                <div class="bg"
                     :style="{'background':`url(${albumInfo.albumPic})`}"></div>
                <div>
                    <div class="songListInfo">
                        <div>
                            <!--                            <div class="playCount">-->
                            <!--                                <van-icon name="service-o" color="#eee"/>-->
                            <!--                                {{songListData.playCount|playCount1}}-->
                            <!--                            </div>-->
                            <van-image
                                    class="leftImage"
                                    width="130" height="120"
                                    radius="5"
                                    :src="albumInfo.albumPic" alt="">
                            </van-image>
                        </div>
                        <div class="songListTitle">
                            <h4>{{albumInfo.albumName}}</h4>
                            <div class="avatarInfo">
                                <!--                                <van-image-->
                                <!--                                        round-->
                                <!--                                        width="30" height="30"-->
                                <!--                                        :src="albumInfo.avatarUrl" alt="">-->
                                <!--                                </van-image>-->
                                <p>歌手:{{albumInfo.songer}}</p>
                            </div>
                            <div class="subTitle">
                                <p>{{albumInfo.description}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="orderInfo">
                        <div class="musicSort-item">
                            <van-icon size="24" name="comment-o"/>
                            <p>{{albumInfo.commentCount|playCount1}}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="cluster-o"/>
                            <p>{{albumInfo.shareCount|playCount1}}</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="down"/>
                            <p>下载</p>
                        </div>
                        <div class="musicSort-item">
                            <van-icon size="24" name="certificate"/>
                            <p>多选</p>
                        </div>
                    </div>
                </div>


                <div ref="tabControl" class="musicTop">
                    <div class="leftBox">
                        <van-icon size="24" name="play-circle-o"/>
                        <p class="musicTopTitle">全部播放<span>(共{{albumMusic.length}}首)</span></p>
                    </div>
                    <div class="rightBox">
                        <van-button
                                class="subscribedBtn"
                                round
                                type="danger"
                                color="rgb(253,59,59)"
                        >+收藏
                        </van-button>
                    </div>
                </div>
                <van-cell-group :border="false">
                    <van-cell
                            class="mc-cell"
                            :center="true"
                            :border="false"
                            v-for="(value,index) in albumMusic"
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
                            <div class="leftIcon">
                                {{index}}
                            </div>
                            <!--                            <van-image-->
                            <!--                                    class="leftImage"-->
                            <!--                                    width="50" height="50"-->
                            <!--                                    radius="5"-->
                            <!--                                    :src="value.picUrl" alt="">-->
                            <!--                            </van-image>-->
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
    import scroll from "../../components/scroll";
    import {Icon, Cell, CellGroup, Image as VanImage, Button} from 'vant'
    import {GetAlbumAPI} from "../../http/all-api";
    import {createAlbumInfo} from "../../../model/albumInfo";
    import {createMusicInfo} from "../../../model/musicInfo";

    export default {
        name: "album",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        async created() {
            await this.getAlbumData(this.$route.query.id);
            this.$toast.clear();
        },
        data() {
            return {
                albumInfo: {},
                albumMusic: [],
                isShowTop: false,
            }
        },
        computed: {
            songListPic() {
                return this.songListData.picUrl + '?param=120y120'
            }
        },
        methods: {
            async getAlbumData(id) {
                await GetAlbumAPI(id).then(res => {
                    let result = res.data.songs;
                    this.albumInfo = createAlbumInfo(res.data.album);
                    result.forEach(item => {
                        this.albumMusic.push(createMusicInfo(item))
                    });
                    console.log(this.albumMusic);
                }).catch(error => {
                    console.log('获取专辑详情出错');
                    console.log(error);
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
                this.isShowTop = position.y <= -220;
            }
        },
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            [Button.name]: Button,
            scroll
        },
        filters: {
            playCount1(num) {
                if (num >= 100000000) {
                    num = Math.round(num / 10000000) / 10 + '亿'
                } else if (num >= 10000) {
                    num = Math.round(num / 1000) / 10 + '万'
                }
                return num;
            }
        }
    }
</script>

<style scoped lang="less">
    .ovtext() {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .album {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: center;

            .navTitle {
                color: white;
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

            #content {
                position: relative;

                .bg {
                    width: 100vw;
                    height: 700px;
                    filter: blur(50px);
                    backdrop-filter: blur(10px);
                }

                .songListInfo {
                    width: 90vw;
                    display: flex;
                    position: absolute;
                    top: 200px;
                    left: 30px;
                    justify-content: space-around;
                }

                .orderInfo {
                    width: 95vw;
                    position: absolute;
                    display: flex;
                    top: 550px;
                    left: 30px;
                    color: white;
                    justify-content: space-around;

                    .musicSort-item {
                        text-align: center;
                        margin: 0 15px;
                        font-size: 30px;
                    }

                }

                .songListTitle {
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    color: white;
                }


                .playCount {
                    position: absolute;
                    top: 8px;
                    right: 620px;
                    z-index: 200;
                    font-size: 30px;
                    color: #eeeeee;
                }

                .avatarInfo {
                    margin-top: 20px;
                    display: flex;
                    align-items: center;

                    p {
                        padding-left: 20px;
                        font-size: 34px;
                    }
                }

                .subTitle {
                    p {
                        line-height: 52px;
                        font-size: 30px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding: 10px;
                        word-wrap: break-word;
                        white-space: pre-wrap;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                    }
                }

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
                        font-size: 28px;
                    }
                }

                .leftIcon {
                    width: 150px;
                    height: 150px;
                    line-height: 150px;
                    text-align: center;
                    font-weight: bold;
                    color: rgb(197, 197, 197);
                }

                .labelTextStyle {
                    width: 500px;
                    font-size: 30px;
                }

            }
        }

    }

    .ov {
        .ovtext();
        font-size: 28px;
    }

    .musicTop {
        position: relative;
        z-index: 200;
        display: flex;
        padding: 20px 30px;
        align-items: center;
        justify-content: space-between;
        background-color: #fff;

        .leftBox {
            display: flex;
            align-items: center;

            .musicTopTitle {
                padding-left: 30px;

                span {
                    font-size: 36px;
                    color: #a7a6a7;
                }
            }
        }

        .rightBox {
            .subscribedBtn {
                padding: 15px 30px;
            }
        }
    }
</style>
