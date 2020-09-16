<template>
    <div>
        <!--        近期热门-->
        <comm-nav :title="this.xiangqing.name">
            <div style="position: absolute;right: 20px;">
                <van-icon name="share-o" />
                <van-icon name="ellipsis" />
            </div>
        </comm-nav>
        <div style="margin-left: 10px;margin-top: 10px">
            <van-icon name="play-circle-o"/>
            <span style="font-weight: bold;margin-left: 4px">近期热门</span>
            <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                        style="width:80px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                <span style="color: black">更多热歌</span></van-button>
        </div>
        <div v-for="(item,index) in this.hots">
            <van-cell v-if="index>2 ? false:true">
                <template #icon>
                    <img :src="item.al.picUrl" style="width: 50px;border-radius: 8px">
                </template>
                <template #title>
                    <span style="margin-left: 10px">{{item.name}}</span>
                </template>
                <template #label>
                    <span v-for="(name,index) in item.ar" style="margin-left: 10px"><span v-if="index !==0">/</span>{{name.name}}</span>
                    <span>{{' - '+item.al.name}}</span>
                </template>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="ellipsis" class="search-icon" size="18px"/>
                </template>

            </van-cell>
        </div>
        <!--        歌手简介-->
        <div style="margin-left: 10px;margin-top: 10px" @click="pushXinXi">
            <span style="font-weight: bold;margin-left: 4px">歌手简介</span>
            <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                        style="width:80px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                <span style="color: black">更多信息</span></van-button>
        </div>
        <div style="margin: 12px 10px 8px 14px;font-size: 14px;overflow: hidden;text-overflow: ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:5;">
            <p>{{this.SingerDescribe.briefDesc}}</p>
        </div>
<!--        相似艺人-->
        <div>
            <span style="margin-left: 14px;margin-top: 10px;font-weight: bold;">相似艺人</span>
        </div>

        <div style="margin: 20px 30px 20px 0px;">
            <div style="margin-left: 10px;background:grey;width: 100px;height: 130px;float: left;text-align: center;padding-top: 10px" v-for="(item,index) in this.simiarts"  v-if="index>2?false:true">
                <img :src="item.img1v1Url" style="width: 60px;border-radius: 50px;">
                <p style="font-size: 14px">{{item.name}}</p>
            </div>
        </div>
    </div>

</template>

<script>
    import {GetSingerDescribeApi, GetSingerHotApi, GetSimilaritySingerApi, GetSingerDanQuApi} from "../../http/all-api";
    import {Icon, Button, Card, Tag, Cell, CellGroup} from "vant";
import commNav from "../../components/nav/commNav";
    export default {
        name: "singer",
        data() {
            return {
                hots: [],
                simiarts: [],
                SingerDescribe: [],
                xiangqing: [],


            }
        },
        created() {
            //歌手描述
            let iid=this.$route.query.id;
            GetSingerDescribeApi(iid).then(res => {
                this.SingerDescribe = res.data;
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

            //近期热门
            GetSingerHotApi(iid).then(res => {
                this.hots = res.data.songs;
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

            //相似艺人
            GetSimilaritySingerApi(iid).then(res => {
                this.simiarts = res.data.artists;
                console.log(res);
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
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            commNav
        },
        methods: {
            pushXinXi(){
                //跳转到歌手简介
                this.$router.push({
                    path:'/sing-introduction',
                    query:{
                        id:this.$route.query.id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>