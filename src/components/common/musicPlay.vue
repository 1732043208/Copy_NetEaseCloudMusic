<template>
    <div class="musicPlay">
        <audio
                ref="audio"
                :src="url"
                @pause="onPause"
                @play="onPlay"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
                controls="controls"></audio>
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
                        v-show='!isPlaying'
                        name="play-circle-o"
                        size="24px"
                        color="#c2463a"
                        @click="startPlayOrPause(-1)"
                />
                <van-icon
                        v-show='isPlaying'
                        name="pause-circle-o"
                        size="24px"
                        color="#c2463a"
                        @click="startPlayOrPause"
                />
            </div>


        </div>
    </div>
</template>

<script>
    // 格式化音乐时间
    import {realFormatSecond,controlPlay} from '../common/mixin'
    import {Slider, Icon, Image as VanImage} from 'vant';
    import {GetMusicDetail, GetMusicUrlAPI, GetMusicCheck} from "../../http/all-api";

    export default {
        name: "musicPlay",
        mixins:[controlPlay],
        props: {
            musicId: {
                type: String | Number,
                default: null
            }
        },
        mounted() {
            this.getMusicUrl(this.musicId);
            this.getMusicDetail(this.musicId);
        },
        data() {
            return {
                url: null,
                audio: {
                    currentTime: 0,// 音频当前播放时长
                    maxTime: 0// 音频最大播放时长
                },
                sliderTime: 0,
                musicName: '',
                musicAr: '',
                picUrl:''
            }
        },
        computed:{
          isPlaying(){
              return this.$store.state.isPlay;
          }
        },
        watch: {
            musicId: {
                deep: true,
                handler(nv, ov) {
                    this.getMusicUrl(nv);
                    this.getMusicDetail(nv);
                }
            }
        },
        methods: {
            getMusicUrl(musicId) {
                GetMusicUrlAPI(musicId).then(res => {
                    this.url = res.data.data[0].url;
                }).catch(error => {
                    console.log('获取音乐url失败');
                    console.log(error);
                })
            },
            getMusicDetail(musicId) {
                GetMusicDetail(musicId).then(res => {
                    this.musicName = res.data.songs[0].name;
                    this.picUrl =res.data.songs[0].al.picUrl

                }).catch(error => {
                    console.log('获取音乐名字出错');
                    console.log(error.message);
                })
            },

            // 当音频当前时间改变后，进度条也要改变
            onTimeupdate(el) {
                this.audio.currentTime = el.target.currentTime;
                this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
            },
            onLoadedmetadata(el) {
                this.audio.maxTime = parseInt(el.target.duration)
            },
            // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数0-100之间，需要换算成实际时间
            changeCurrentTime(index) {
                this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
            },

        },
        components: {
            [Slider.name]: Slider,
            [Icon.name]: Icon,
            [VanImage.name]: VanImage,
        },
        filters: {
            // 将整数转化成时分秒
            formatSecond(second = 0) {
                return realFormatSecond(second)
            }
        }
    }
</script>

<style lang="less">
    .musicPlay {
        position: absolute;
        bottom: 0;
        z-index: 999;

        audio {
            display: none;
        }

        .audio-com-box {
            width: 100vw;
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
            }

            /*进度条*/

            > .progress-box {
                flex: 1;
                margin-left: 15px;
                position: relative;

                > .slider {
                    > .el-slider__runway {
                        height: 3px;

                        > .el-slider__bar {
                            height: 3px;
                            background-color: #17CE88;
                        }

                        .el-slider__button {
                            width: 10px;
                            height: 10px;
                            border: 2px solid #17CE88
                        }
                    }
                }

                > .current-time, > .total-time {
                    position: absolute;
                    bottom: -15px;
                    color: #AAAAAA;
                }

                > .current-time {
                    left: 0;
                }

                > .total-time {
                    right: 0;
                }
            }
        }
    }


</style>
