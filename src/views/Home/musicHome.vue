<template>
    <div class="home">
        <tab-control
                :title="['推荐','朋友','电台']"
                @tabClick="tabClick"
                ref="tabControl1"
                v-show="isShowTabControl"
        >
        </tab-control>
      <scroll
              class="content"
              ref="scroll"
              :probe-type="3"
              :pull-up-load="true"

      >
          <div >
              <recommend v-show="this.currentType==='recommend'"></recommend>
              <!--          <router-link to="/login">toLogin</router-link>-->
          </div>

      </scroll>



    </div>
</template>

<script>
    // @ is an alias to /src
    import TabControl from "../../components/music-home-child/tabControl";
    import Scroll from "../../components/scroll";
    import Recommend from "../../components/music-home-child/recommend";

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
        components: {TabControl, Scroll, Recommend},
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
        z-index: 0;
        touch-action: none;
    }
    .content1{
        /*width: 100vw;*/
        overflow: hidden;
        ul{
            display: flex;
        }
    }
</style>
