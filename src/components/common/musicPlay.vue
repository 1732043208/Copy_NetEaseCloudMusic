<template>
    <div class="musicPlay">
        <audio-com
                ref="audio"
                :audio-src="changeMusicUrls">

        </audio-com>
        <div @click.stop="minOrMax" v-show="!isMinOrMax" class="audio-com-box-min">
            <van-image
                    round
                    width="30px"
                    height="30px"
                    :src="musicInfo.picUrl"
            />
            <div class="musicName">
                <p>{{musicInfo.name}}</p>
                <p class="tip">左右滑动可切换上下首</p>
            </div>
            <div class="musicIcon">
                <van-icon
                        v-show='changeIcons'
                        name="play-circle-o"
                        size="24px"
                        color="#c2463a"
                        @click.stop="$refs.audio.startPlayOrPause(-1),ChangeIcon()"
                />
                <van-icon
                        v-show='!changeIcons'
                        name="pause-circle-o"
                        size="24px"
                        color="#c2463a"
                        @click.stop="$refs.audio.startPlayOrPause(-1),ChangeIcon()"
                />
            </div>
        </div>
        <transition name="move">
            <div
                    ref="bigPlayer"
                    v-show="isMinOrMax"
                    :style="{'background-image':`url(${musicInfo.picUrl})`,
                    'animation-play-state':animationShow}"
                    class="audio-com-box-max">
                <div class="musicContent">
                    <div class="nav">
                        <van-cell
                                class="mc-cell"
                                :center="true"
                                :border="false"
                                :title="musicInfo.name"
                                :label="musicInfo.singer"
                                title-class="titleText"
                                label-class="labelText">
                            <template #icon>
                                <van-icon @click="minOrMax" color="#fff" size="24" name="arrow-down"/>
                            </template>
                        </van-cell>
                    </div>
                    <div class="albumPic isrotate"
                         :style="{'animation-play-state':animationShow}">
                        <van-image
                                class="pic"
                                round
                                width="12rem"
                                height="12rem"
                                :src="musicInfo.picUrl"
                        />
                    </div>
                    <div class="musicController">
                        <div class="musicSlider">
                            <p class="currentTime">{{getCurrentTime|formatSecond}}</p>
                            <van-slider
                                    active-color="#c2463a"
                                    v-model="currentTime2"
                                    :max="getMaxTime"
                                    @change="onChangeTime"
                                    @input="onChanging">
                                <template #button>
                                    <div class="custom-button"></div>
                                </template>
                            </van-slider>
                            <p class="maxTime">{{getMaxTime|formatSecond}}</p>
                        </div>
                        <div class="musicAllBtn">
                            <img src="../../assets/cycle_list.png" height="32" width="32"/>
                            <img src="../../assets/previous.png" height="32" width="32"/>
                            <van-icon
                                    v-show='changeIcons'
                                    name="play-circle-o"
                                    size="32px"
                                    color="#bfbfbf"
                                    @click.stop="$refs.audio.startPlayOrPause(-1),ChangeIcon()"/>
                            <van-icon
                                    v-show='!changeIcons'
                                    name="pause-circle-o"
                                    size="32px"
                                    color="#bfbfbf"
                                    @click.stop="$refs.audio.startPlayOrPause(-1),ChangeIcon()"/>
                            <img src="../../assets/next.png" height="32" width="32"/>
                            <img src="../../assets/more.png" height="32" width="32"/>
                        </div>

                    </div>
                </div>
            </div>
        </transition>

    </div>
</template>

<script>
    // 格式化音乐时间
    import {realFormatSecond} from '../common/utils'
    import {Icon, Image as VanImage, Slider, Cell} from 'vant';
    import {GetMusicDetail, GetMusicUrlAPI} from "../../http/all-api";
    import AudioCom from "./audioCom";
    import {createMusicInfo} from "../../../model/musicInfo";

    export default {
        name: "musicPlay",
        props: {
            musicId: {
                type: String | Number,
                default: null
            }
        },
        mounted() {
            // changeI保存vuex里面的全局播放按钮状态
            this.getMusicUrl(this.musicId);
            this.getMusicDetail(this.musicId);
        },
        data() {
            return {
                audio: {
                    currentTime: 0,// 音频当前播放时长
                    maxTime: 0// 音频最大播放时长
                },
                sliderTime: 0,
                musicInfo: {},
                isMinOrMax: false, // 展示迷你播放器还是大播放器
                MusicCurrentTime: 0,
                currentTime2: 0,
                changeTime: false,
                animationShow: 'paused'
            }
        },

        watch: {
            // 监听音乐id的变化
            musicId: {
                deep: true,
                handler(nv, ov) {
                    this.getMusicUrl(nv);
                    this.getMusicDetail(nv);
                    this.$store.commit('NotPlaying');
                }
            }
        },
        computed: {
            // 需要使用到vuex数据并且随时修改vuex数据时
            // 使用get/set 获取和修改
            changeIcons: {
                get() {
                    console.log('执行get');
                    return this.$store.state.changeIcon
                },
                set(nv) {
                    return !this.$store.state.changeIcon
                }
            },
            changeMusicUrls: {
                get() {
                    return this.$store.state.musicUrl;
                },
                set(nv) {
                    return this.$store.state.musicUrl = nv;
                }
            },
            getCurrentTime: {
                get() {
                    if (!this.changeTime) this.currentTime2 = this.$store.state.currentTimer;
                    return this.$store.state.currentTimer
                },
                set(nv) {
                    return this.$store.state.currentTimer = nv
                }
            },
            getMaxTime: {
                get() {
                    return this.$store.state.maxTimer
                },
                set(nv) {
                    return this.$store.state.maxTimer = nv
                }
            }
        },
        methods: {
            ChangeIcon() {
                this.animationShow = this.$store.state.changeIcon ? 'running' : 'paused'
                this.$store.commit('showIcon');
            },
            getMusicUrl(musicId) {
                GetMusicUrlAPI(musicId).then(res => {
                    if (res.data.data[0].url !== null) {
                        this.$store.commit('changeMusicUrl', res.data.data[0].url);
                        this.$store.commit('NotPlaying');
                        this.$store.state.changeIcon = false;
                    } else {
                        this.$toast('获取音乐播放地址失败');
                        this.$store.commit('NotPlaying');
                        this.$store.commit('showIcon');
                        this.$store.commit('changeMusicUrl', '')
                    }
                }).catch(error => {
                    console.log('获取音乐url失败');
                    console.log(error);
                })
            },
            getMusicDetail(musicId) {
                GetMusicDetail(musicId).then(res => {
                    this.musicInfo = createMusicInfo(res.data.songs[0]);
                    console.log(this.musicInfo);
                }).catch(error => {
                    console.log('获取音乐名字出错');
                    console.log(error.message);
                })
            },
            minOrMax() {
                this.isMinOrMax = !this.isMinOrMax;
            },
            // 拖动过程中，不改变滑块的值，才不会在拖动时滑块闪烁
            onChanging() {
                this.changeTime = true;
            },
            onChangeTime(time) {
                this.currentTime2 = time;
                this.changeTime = false;
                this.$refs.audio.changeCurrentTime(time);
            }

        },
        components: {
            [Slider.name]: Slider,
            [Icon.name]: Icon,
            [VanImage.name]: VanImage,
            AudioCom,
            [Cell.name]: Cell,
        },
        filters: {
            // 将整数转化成时分秒
            formatSecond(second = 0) {
                return realFormatSecond(second)
            }
        }
    }
</script>

<style scoped lang="less">
    @keyframes rotatePic {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    .musicPlay {
        position: absolute;
        bottom: 0;
        z-index: 999;

        .audio-com-box-min {
            width: 94.9vw;
            border: 1px solid #E5E5E5;
            border-radius: 10px;
            padding: 15px 25px;
            display: flex;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.96);
            // 音乐 歌手名字
            .musicName {
                flex: 3;
                padding-left: 25px;
                font-size: 36px;
                font-weight: 600;

                .tip {
                    margin-top: 15px;
                    font-size: 24px;
                    color: #a7a6a7;
                }
            }

            /*音频图标*/

            .musicIcon {
                flex: 1;

                .aaa {
                    background-color: #c2463a;
                }
            }
        }

        .audio-com-box-max {
            position: relative;
            width: 100vw;
            height: 100vh;
            align-items: center;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            background-attachment: fixed;
            overflow: hidden;
        }

        .musicContent {
            width: 100vw;
            height: 100vh;
            z-index: 999;
            backdrop-filter: blur(100px);
        }

        .nav {
            padding-left: 30px;
            padding-top: 30px;

            .mc-cell {
                background-color: transparent;

                .titleText {
                    margin-left: 40px;
                    width: 500px;
                    font-weight: 600;
                    font-size: 40px;
                    color: #f7f8fa;

                    .titleTextName {
                        color: #a7a6a7;
                        font-size: 26px;
                    }
                }
            }
        }

        .albumPic {
            display: flex;
            width: 700px;
            height: 700px;
            background-color: rgb(15, 14, 19);
            border-radius: 400px;
            margin: 0 auto;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            position: absolute;
            left: 18%;
            top: 30%;
        }

        .isrotate {
            animation: rotatePic 30s linear 0.2s infinite;
        }

        .musicController {
            position: absolute;
            bottom: 0;

            .musicSlider {
                display: flex;
                margin: 0 100px;
                align-items: center;
                justify-content: space-between;
                color: white;

                .currentTime {
                    padding-right: 30px;
                }

                .maxTime {
                    padding-left: 30px;
                }

                .custom-button {
                    width: 26px;
                    height: 26px;
                    font-size: 10px;
                    line-height: 18px;
                    text-align: center;
                    background-color: #ffffff;
                    border-radius: 100px;
                }
            }

            .musicAllBtn {
                display: flex;
                width: 100vw;
                height: 300px;
                align-items: center;
                justify-content: space-around;
            }
        }
    }

    .move-enter-active, .move-leave-active {
        transition: all 0.7s;
    }

    /* 显示前或隐藏后的效果 */
    .move-enter, .move-leave-to {
        transform: translateY(200%);
    }

</style>
