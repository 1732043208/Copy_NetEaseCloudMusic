<template>
    <div class="audioCom">
        <audio
                ref="audio"
                :src="audioSrc"
                @play="onPlay"
                @pause="onPause"
                @timeupdate="onTimeupdate"
                @loadedmetadata="onLoadedmetadata"
                :autoplay="audioSrc !== ''"
                @ended="onEnded"
                controls="controls"></audio>
    </div>
</template>

<script>
    import {disorder} from "./utils";

    export default {
        name: "audioCom",
        props: {
            audioSrc: {
                type: String,
                default: ''
            },
        },
        computed: {
            musicIndex1: {
                get() {
                    return this.$store.state.musicIndex
                },
                set(nv) {
                    return this.$store.state.musicIndex = nv
                }
            },
            playList: {
                get() {
                    return this.$store.state.playList
                }
            },
            musicId: {
                get() {
                    return this.$store.state.musicId
                }
            }
        },
        data() {
            return {
                isDisorder: false,
                disorderArr: []
            }
        },
        methods: {
            // 控制音频的播放与暂停
            startPlayOrPause() {
                console.log('播放暂停1');
                console.log('this.$store.state.isPlay-' + this.$store.state.isPlay);
                this.$store.state.isPlay ? this.pause() : this.play();
            },
            // 播放音频
            play() {
                console.log('执行 play');
                this.$refs.audio.play();
            },
            // 暂停音频
            pause() {
                console.log('执行 pause');
                this.$refs.audio.pause();

            },
            onPlay() {
                console.log('执行 onPlay');
                this.$store.commit('IsPlaying');
                this.$store.commit('changeAudioEl', this.$refs.audio)
            },
            onPause() {
                console.log('执行 onPause');
                // this.$store.state.changeIcon = false;
                this.$store.commit('NotPlaying');
                this.$store.state.musicCurrentTime = this.$refs.audio.currentTime;
            },
            // 当音频当前时间改变后，进度条也要改变,每秒触发一次
            onTimeupdate(el) {
                // console.log(el.target.currentTime);
                this.$store.state.currentTimer = el.target.currentTime;
                // this.audio.currentTime =
                // this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
            },
            // 一个音频文件加入到audio时触发
            onLoadedmetadata(el) {
                console.log('触发');
                this.$store.state.maxTimer = el.target.duration;

            },
            // 拖动进度条，改变当前时间，index是进度条改变时的回调函数的参数，index为当前播放秒数
            changeCurrentTime(index) {
                this.$refs.audio.currentTime = index;
            },
            // 播放结束后
            onEnded() {
                console.log(this.$store.state.changeIcon);
                this.$store.commit('showIcon');
                console.log('音乐播放完了');
                switch (this.$parent.playType) {
                    case 1:
                        console.log('执行列表循环');
                        this.listLoop(0);
                        break;
                    case 2:
                        console.log('执行随机播放');
                        this.randomPlay(0);
                        break;
                    case 3:
                        console.log('单曲');
                        this.loop();
                        break;

                }
            },
            getCurrentTime() {
                return this.$refs.audio.currentTime;
            },
            // 单曲循环
            loop() {
                this.$refs.audio.currentTime = 0;
                this.play();
                this.$store.commit('IsPlaying');
                this.$store.commit('showIcon');
            },
            // 列表循环
            listLoop(type) {
                let index = this.playList.findIndex(value => {
                    return value.id === parseInt(this.musicId);
                });
                console.log('这里index');
                console.log(index);
                if (index !== -1) {
                    this.musicIndex1 = index;
                }
                if (this.playList.length === 1) {
                    this.loop();
                    return;
                }
                if (this.musicIndex1 < this.playList.length) {
                    console.log('true listLoopMusic');
                    if (type === 0) {
                        this.musicIndex1++;
                        if (this.musicIndex1 >= this.playList.length) {
                            this.musicIndex1 = 0;
                        }
                    } else {
                        if (this.musicIndex1 > 0) {
                            console.log('previousMusic true');
                            this.musicIndex1--;
                        } else {
                            console.log('else');
                            this.musicIndex1 = this.playList.length - 1;
                        }
                    }
                    let nextId = this.playList[this.musicIndex1].id;
                    this.$store.commit('changeMusicId', nextId);
                    this.$store.dispatch('getMusicUrl', nextId);

                    this.$store.commit('NotPlaying');
                    this.$store.commit('IsPlaying');
                    this.$store.commit('showIcon');
                }


            },
            // 随机播放
            randomPlay(type) {
                // 创建新数组，js非基本类型引用为引用传递，打乱数组会影响原数组，所有需要
                // 创建新数组
                let arr;
                // 只打乱一次
                if (!this.isDisorder) {
                    console.log('打乱了');
                    arr = this.playList.slice();
                    this.disorderArr = disorder(arr);
                    this.isDisorder = true;
                }
                if (type === 0) {
                    if (this.musicIndex1 < this.playList.length) {
                        console.log('true listLoopMusic');
                        this.musicIndex1++;
                        if (this.musicIndex1 >= this.playList.length) {
                            this.musicIndex1 = 0;
                        }
                    }
                } else {
                    if (this.musicIndex1 > 0) {
                        console.log('previousMusic true');
                        this.musicIndex1--;
                    } else {
                        console.log('else');
                        this.musicIndex1 = this.playList.length - 1;
                    }
                }
                console.log(this.disorderArr);
                let nextId = this.disorderArr[this.musicIndex1].id;
                console.log('nextId' + nextId);
                this.$store.commit('changeMusicId', nextId);
                this.$store.dispatch('getMusicUrl', nextId);
                this.$store.commit('IsPlaying');
                this.$store.commit('showIcon');
            },

        }
    }
</script>

<style scoped lang="less">
    audio {
        display: none;
    }
</style>
