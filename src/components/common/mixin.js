export const initScroll = {
    data() {
        return {
            itemWidth: 0,
            itemMargin: 0
        }
    },
    methods: {
        initPics() {
            // 先判断是否有这个属性
            // 这里之所以要设置宽度，是因为.wrapper和.list的宽度一样大
            // 当.list的宽度大于.wrapper的宽度，才能横向滚动
            let itemWidth = this.itemWidth;// 这里是设置列表每一项的宽度
            let margin = this.itemMargin;
            // width是整个列表的宽度
            let width = (itemWidth + margin) * 6 - margin;
            this.$refs.list.style.width = width + 'vw'; // 设置.list的宽度的宽度
        },
    }
};

// 将整数转换成 时：分：秒的格式
export function realFormatSecond(second) {
    let secondType = typeof second;
    if (secondType === 'number' || secondType === 'string') {
        second = parseInt(second);
        let hours = Math.floor(second / 3600);
        second = second - hours * 3600;
        let mimute = Math.floor(second / 60);
        second = second - mimute * 60;
        return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
    } else {
        return '00:00'
    }
}

export const controlPlay = {
    methods: {
        // 控制音频的播放与暂停
        startPlayOrPause(index) {
            console.log(index);
            this.isPlaying ? this.pause(index) : this.play(index)
        },
        // 播放音频
        play(index) {
            if (index === -1) return this.$refs.audio.play();
            this.$refs.audio[index].play();
        },
        // 暂停音频
        pause(index) {
            if (index === -1) return this.$refs.audio.pause();
            this.$refs.audio[index].pause();
        },
        onPlay() {
            this.$store.state.isPlay = true;
        },
        onPause() {
            this.$store.state.isPlay = false;
        },
    }
}
