npm
<template>
    <div class="home">
        <tab-control
                :title="['推荐','视频']"
                @tabClick="tabClick"
                ref="tabControl1">
        </tab-control>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                @scroll="homeScroll">
            <div>
                <recommend v-show="this.currentType==='recommend'"/>
                <video-home v-show="this.currentType==='friend'"/>
            </div>

        </scroll>

    </div>
</template>

<script>
    // @ is an alias to /src
    import TabControl from "../../components/music-home-child/tabControl";
    import Scroll from "../../components/scroll";
    import Recommend from "../../components/music-home-child/recommend";
    import VideoHome from "../video/video-home";
    import dj from "../dj/dj";

    export default {
        name: 'Home',

        data() {
            return {
                active: 0,
                currentType: 'recommend',
                toChangeHeight: false
            }
        },
        methods: {
            tabClick(index) {
                switch (index) {
                    case 0:
                        this.currentType = 'recommend';
                        break;
                    case 1:
                        this.currentType = 'friend';
                        break;
                    case 2:
                        this.currentType = 'radioStation';
                        break;
                }
            },
            homeScroll(position) {
                if (this.$store.state.musicId !== null && !this.toChangeHeight) {
                    this.toChangeHeight = true;
                    this.$refs.scroll.$el.style.height = 80 + 'vh';
                    this.$refs.scroll.refresh();
                }
            }
        },
        components: {TabControl, Scroll, Recommend, VideoHome, dj},
    }
</script>
<style scoped lang="less">
    .content {
        width: 100vw;
        overflow: hidden;
        position: absolute;
        top: 250px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        touch-action: none;
    }
</style>
