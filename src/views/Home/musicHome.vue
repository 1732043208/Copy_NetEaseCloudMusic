<template>
    <div class="home">
        <tab-control
                :title="['推荐','朋友','电台']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isShowTabControl"
        >
        </tab-control>
      <scroll class="content"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"

      >
        <recommend v-show="this.currentType==='recommend'">

      </recommend>
      </scroll>


        <!--    <router-link to="/login">toLogin</router-link>-->
    </div>
</template>

<script>
    // @ is an alias to /src
    import TabControl from "../../components/music-home-child/TabControl";
    import Scroll from "../../components/Scroll";
    import recommend from "../../components/music-home-child/recommend";

    export default {
        name: 'Home',
        data() {
            return {
                active: 0,
                isShowTabControl: true,
                currentType: 'recommend'

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
        },
        components: {TabControl, Scroll, recommend},
    }
</script>
<style scoped lang="less">
    .content {
        overflow: hidden;
        position: absolute;
        top: 220px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 999;
    }
</style>
