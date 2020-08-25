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
    import {GetMusicUrlAPI} from "../../http/all-api";

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
            play(el) {
                console.log('执行 play');
                this.$refs.audio.play();
                console.dir(this.$refs.audio);
            },
            // 暂停音频
            pause() {
                console.log('执行 pause');
                this.$refs.audio.pause();

            },
            onPlay() {
                console.log('执行 onPlay');
                this.$store.commit('IsPlaying')
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
                if (this.musicIndex1 < this.$store.state.playList.length - 1) {
                    this.musicIndex1++;
                    console.log(this.musicIndex1);
                    let nextId = this.$store.state.playList[this.musicIndex1].id;
                    console.log(nextId);
                    this.$store.commit('changeMusicId', nextId);
                    this.$store.dispatch('getMusicUrl', nextId);
                    this.$store.dispatch('getMusicDetail', nextId);

                    // this.getMusicDetail(nv);

                    this.$store.commit('NotPlaying');

                } else {
                    console.log('else');
                    this.musicIndex1 = 0;
                    let nextId = this.$store.state.playList[this.musicIndex1].id;
                    this.$store.commit('changeMusicId', nextId);
                    this.$store.dispatch('getMusicUrl', nextId);
                    this.$store.dispatch('getMusicDetail', nextId);
                }


            },
            getCurrentTime() {
                return this.$refs.audio.currentTime;
            },
            maxTime() {

            }
        }
    }
</script>

<style scoped lang="less">
    audio {
        display: none;
    }
</style>
