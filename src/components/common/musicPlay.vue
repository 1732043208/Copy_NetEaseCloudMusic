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
                        color="#bfbfbf"
                        @click.stop="$refs.audio.startPlayOrPause(-1),ChangeIcon()"
                />
                <van-icon
                        v-show='!changeIcons'
                        name="pause-circle-o"
                        size="24px"
                        color="#bfbfbf"
                        @click.stop="$refs.audio.startPlayOrPause(-1),ChangeIcon()"
                />
                <img src="../../assets/more.png" height="28" width="28" @click.stop="more"/>

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
                            <img src="../../assets/previous.png" height="32" width="32" @click="previousMusic"/>
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
                            <img src="../../assets/next.png" height="32" width="32" @click="nextMusic"/>
                            <img src="../../assets/more.png" height="32" width="32" @click="more"/>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="move2">
            <div class="moreBox" v-show="show">
                <div class="musicList">
                    <van-cell value-class="title1" :value='title1'></van-cell>
                    <scroll
                            class="content"
                            ref="scroll"
                            :probe-type="3">
                        <div>
                            <van-cell
                                    class='cellItem'
                                    size="large"
                                    :center="true"
                                    v-for="(item,index) in playList"
                                    :key="index"
                                    :value-class="{'cellText':true,'selectColor':item.isColor}"
                                    @click="musicDetailClick(item,index)">
                                <template #default>
                                    <p>{{item.name}}<span>—{{item.singer}}</span></p>
                                </template>
                                <template #right-icon>
                                    <van-icon name="cross" @click.stop="removeBtn(index,item)"/>
                                </template>
                            </van-cell>
                        </div>
                    </scroll>
                </div>
                <div class="mask" @click.stop="more"></div>
            </div>
        </transition>
    </div>
</template>

<script>
    // 格式化音乐时间
    import {realFormatSecond} from '../common/utils'
    import {Icon, Image as VanImage, Slider, Cell, Dialog } from 'vant';
    import AudioCom from "./audioCom";
    import scroll from "../scroll";

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
            this.$store.dispatch('getMusicUrl', this.musicId);
            this.$store.dispatch('getMusicDetail', this.musicId);

            // this.getMusicDetail(this.musicId);
        },
        data() {
            return {
                sliderTime: 0,
                // musicInfo: {},
                isMinOrMax: false, // 展示迷你播放器还是大播放器
                MusicCurrentTime: 0,
                currentTime2: 0,
                changeTime: false,
                animationShow: 'running',
                show: false,
                selectColor: false,
                nextId: 0,
            }
        },

        watch: {
            // 监听音乐id的变化
            musicId: {
                deep: true,
                handler(nv, ov) {
                    this.$store.dispatch('getMusicUrl', nv);
                    this.$store.dispatch('getMusicDetail', nv);
                    // this.getMusicDetail(nv);

                    this.$store.commit('NotPlaying');
                }
            }
        },
        computed: {
            // 需要使用到vuex数据并且随时修改vuex数据时
            // 使用get/set 获取和修改
            changeIcons: {
                get() {
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
            },
            musicInfo: {
                get() {
                    return this.$store.state.musicAllDetail;
                },
                set(nv) {
                    return this.$store.state.musicAllDetail = nv;
                }
            },
            playList: {
                get() {
                    return this.$store.state.playList;
                },
                set(nv) {
                    return this.$store.state.playList = nv;
                }
            },
            title1() {
                return '当前播放(' + this.$store.state.playList.length + ')'
            },
            musicIndex1: {
                get() {
                    return this.$store.state.musicIndex
                },
                set(nv) {
                    return this.$store.state.musicIndex = nv
                }
            }
        },
        methods: {
            ChangeIcon() {
                this.animationShow = this.$store.state.changeIcon ? 'running' : 'paused'
                this.$store.commit('showIcon');
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
            },
            nextMusic() {
                if (this.musicIndex1 < this.$store.state.playList.length - 1) {
                    this.musicIndex1++;
                    this.nextId = this.$store.state.playList[this.musicIndex1].id;
                } else {
                    console.log('else');
                    this.musicIndex1 = 0;
                    this.nextId = this.$store.state.playList[this.musicIndex1].id;
                }
                this.$store.commit('changeMusicId', this.nextId);
                console.log(this.nextId)
            },
            previousMusic() {
                let nextId;
                if (this.musicIndex1 > 0) {
                    this.musicIndex1--;
                    this.nextId = this.$store.state.playList[this.musicIndex1].id;
                } else {
                    console.log('else');
                    this.musicIndex1 = this.$store.state.playList.length - 1;
                    this.nextId = this.$store.state.playList[this.musicIndex1].id;
                }
                this.$store.commit('changeMusicId', this.nextId);
            },
            more() {
                this.show = !this.show;
                this.openSheet();
            },
            musicDetailClick(item, index) {
                this.isShowDetail = !this.isShowDetail;
                console.log(item);
                this.musicIndex1 = index;
                this.$store.commit('changeMusicId', item.id);

                this.playList.forEach(value => {
                    value.isColor = false;
                });
                item.isColor = true;
            },
            // 打开面板查找是否有相同的url，有就显示播放中的颜色
            openSheet() {
                // 排它
                this.playList.forEach(item => {
                    item.isColor = false;
                });
                let index = this.playList.findIndex(value => {
                    return value.id === parseInt(this.musicId);
                });
                this.$store.state.playList[index].isColor = true;
            },
            removeBtn(index, item) {
                this.$delete(this.playList, index);
                if (this.$store.state.musicId === item.id) {
                    this.musicIndex1 = -1;
                    this.nextMusic();
                    this.playList.forEach(item => {
                        item.isColor = false;
                    });
                    let index = this.playList.findIndex(value => {
                        return value.id === parseInt(this.nextId);
                    });
                    this.$store.state.playList[index].isColor = true;
                }
            }
        },
        components: {
            scroll,
            [Slider.name]: Slider,
            [Icon.name]: Icon,
            [VanImage.name]: VanImage,
            AudioCom,
            [Cell.name]: Cell,},
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

    .move2-enter-active, .move2-leave-active {
        transition: all 0.7s;
    }

    /* 显示前或隐藏后的效果 */
    .move2-enter, .move2-leave-to {
        transform: translateY(200%);
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
            background-color: rgba(255, 255, 255, 0.99);
            // 音乐 歌手名字
            .musicName {
                flex: 3;
                padding-left: 25px;
                font-size: 36px;
                font-weight: 600;

                p {
                    width: 600px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }

                .tip {
                    margin-top: 15px;
                    font-size: 24px;
                    color: #a7a6a7;
                }
            }

            /*音频图标*/

            .musicIcon {
                flex: 1;

                img {
                    margin-top: 15px;
                    margin-left: 50px;
                }

            }
        }

        .audio-com-box-max {
            position: absolute;
            /*top: 0;*/
            left: 0;
            bottom: 0;
            z-index: 2047;
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
            background-color: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(50px);
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



        .moreBox {
            position: relative;
            z-index: 2048;

            .mask {
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.6);
            }
            .musicList {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 50vh;
                padding: 16px 16px 30px;
                background-color: #fff;
                border-top-left-radius: 50px;
                border-top-right-radius: 50px;

                .title1 {
                    padding: 30px 20px;
                    font-size: 40px;
                    font-weight: bold;
                }

                .content {
                    width: 100vw;
                    overflow: hidden;
                    position: absolute;
                    top: 150px;
                    left: 0;
                    bottom: 0;
                }

                .cellItem {
                    color: #c2463a;
                    padding: 30px 30px;
                }

                .cellText {
                    font-weight: bold;
                    padding-left: 20px;
                    font-size: 38px;

                    p {
                        width: 600px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }

                    span {
                        font-size: 30px;
                    }
                }

                .selectColor {
                    color: #c2463a;
                }
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
