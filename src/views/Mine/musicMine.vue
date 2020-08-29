<template>
    <div class="musicMine">
        <h1>我的音乐</h1>
    </div>
</template>

<script>
    export default {
        name: "music-mine",
        created() {
            this.getVideoData();
        },
        computed: {},
        data() {
            return {}
        },
        methods: {},
        components: {},


    }

</script>

<style lang="less">
    .musicMine {
        width: 100vw;

        .video-js .vjs-big-play-button {
            height: 2em;
            width: 2em;
            line-height: 2em;
            border-radius: 1em;
        }
    }
</style>
