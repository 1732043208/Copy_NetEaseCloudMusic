<template>
    <div>
        <comm-nav title="歌手简介"></comm-nav>
        <scroll class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
        >
            <div>
                <div style="background:red;width: 4px;height: 16px;float:left;margin-left: 10px;margin-top: 2px;border-radius: 2px"></div>
                <div style="margin: 10px  0 0 20px">{{this.xiangqing.name}}简介</div>
                <div class="textstyle">{{this.SingerDescribe.briefDesc}}</div>
                <div v-for="item in this.SingerDescribe.introduction">
                    <div style="background:red;width: 4px;height: 16px;float:left;margin-left: 10px;margin-top: 2px;border-radius: 2px"></div>
                    <div style="margin: 10px  0px 0 22px;">{{item.ti}}</div>
                    <div class="textstyle">{{item.txt}}</div>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import {GetSingerDescribeApi, GetSingerDanQuApi} from "../../http/all-api";
    import Scroll from "../../components/scroll";
    import {Icon} from 'vant';
import commNav from "../../components/nav/commNav";
    export default {
        name: "sing-introduction",
        components: {Scroll, [Icon.name]: Icon,   commNav},
        data() {
            return {
                SingerDescribe: [],
                xiangqing: [],

            }
        },
        created() {
            let iid = this.$route.query.id;
            GetSingerDescribeApi(iid).then(res => {
                this.SingerDescribe = res.data;
                console.log(this.SingerDescribe);
            }).catch(error => {
                console.log(error);
            });

            GetSingerDanQuApi(iid).then(res => {
                this.xiangqing = res.data.artist;
                // console.log(res);
            }).catch(error => {
                console.log(error);
            })
        },
        methods: {
            backup() {

            }
        }

    }
</script>

<style scoped>
    .content {
        overflow: hidden;
        position: absolute;
        top: 120px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        touch-action: none;
        white-space: pre-wrap;
    }

    .textstyle {
        font-size: 36px;
        font-weight: lighter;
        margin: 12px 30px 12px 40px;
        line-height: 60px;
    }


</style>
