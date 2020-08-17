<template>
    <div class="musicPlay">
        <audio-com
                ref="audio"
                :audio-src="changeMusicUrls">

        </audio-com>
        <div class="audio-com-box">
            <van-image
                    round
                    width="30px"
                    height="30px"
                    :src="picUrl"
            />
            <div class="musicName">
                <p>{{musicName}}</p>
                <p class="tip">左右滑动可切换上下首</p>
            </div>
            <div class="musicIcon">
                <van-icon
                        v-show='changeIcons'
                        name="play-circle-o"
                        size="24px"
                        color="#c2463a"
                        @click="$refs.audio.startPlayOrPause(-1),ChangeIcon()"
                />
                <van-icon
                        v-show='!changeIcons'
                        name="pause-circle-o"
                        size="24px"
                        color="#c2463a"
                        @click="$refs.audio.startPlayOrPause(-1),ChangeIcon()"
                />
            </div>


        </div>
    </div>
</template>

<script>
    // 格式化音乐时间
    import {realFormatSecond} from '../common/mixin'
    import {Icon, Image as VanImage, Slider} from 'vant';
    import {GetMusicDetail, GetMusicUrlAPI} from "../../http/all-api";
    import AudioCom from "./audioCom";

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
                musicUrl: null, // 音乐MP3的Url
                musicName: '', // 音乐名字
                musicAr: '', // 歌手名字
                picUrl: '', // 音乐图片
            }
        },

        watch: {
            // 监听音乐id的变化
            musicId: {
                deep: true,
                handler(nv, ov) {
                    this.getMusicUrl(nv);
                    this.getMusicDetail(nv);
                    this.changeI = false;
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
            }
        },
        methods: {
            ChangeIcon() {
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
                    this.musicName = res.data.songs[0].name;
                    this.picUrl = res.data.songs[0].al.picUrl

                }).catch(error => {
                    console.log('获取音乐名字出错');
                    console.log(error.message);
                })
            },


        },
        components: {
            [Slider.name]: Slider,
            [Icon.name]: Icon,
            [VanImage.name]: VanImage,
            AudioCom,
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
    .musicPlay {
        position: absolute;
        bottom: 0;
        z-index: 999;

        .audio-com-box {
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

            /*进度条*/

            /*> .progress-box {*/
            /*    flex: 1;*/
            /*    margin-left: 15px;*/
            /*    position: relative;*/

            /*    > .slider {*/
            /*        > .el-slider__runway {*/
            /*            height: 3px;*/

            /*            > .el-slider__bar {*/
            /*                height: 3px;*/
            /*                background-color: #17CE88;*/
            /*            }*/

            /*            .el-slider__button {*/
            /*                width: 10px;*/
            /*                height: 10px;*/
            /*                border: 2px solid #17CE88*/
            /*            }*/
            /*        }*/
            /*    }*/

            /*    > .current-time, > .total-time {*/
            /*        position: absolute;*/
            /*        !*bottom: -15px;*!*/
            /*        color: #AAAAAA;*/
            /*    }*/

            /*    > .current-time {*/
            /*        left: 0;*/
            /*    }*/

            /*    > .total-time {*/
            /*        right: 0;*/
            /*    }*/
            /*}*/
        }
    }


</style>
