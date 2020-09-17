<template>
    <div>
        <comm-nav :title="this.xiangqing.name">
            <div style="position: absolute;right: 20px;">
                <van-icon name="share-o"/>
                <van-icon name="ellipsis"/>
            </div>
        </comm-nav>
        <scroll class="content" ref="scroll"
                :probe-type="3"
                :pull-up-load="true">
            <div>

                <van-tabs>
                    <van-tab v-for="(item,index) in tabbar" :key="index" :title="item">
                        <div v-if="index===0">
                            <!--        近期热门-->
                            <div style="margin-left: 10px;margin-top: 10px">
                                <van-icon name="play-circle-o"/>
                                <span style="font-weight: bold;margin-left: 4px">近期热门</span>
                                <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                                            style="width:80px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                                    <span style="color: black">更多热歌</span></van-button>
                            </div>
                            <div v-for="(item,index) in hots">
                                <van-cell v-if="index>2 ? false:true" @click="getMusicId(item.id)">
                                    <template #icon>
                                        <img :src="item.al.picUrl" style="width: 50px;border-radius: 8px">
                                    </template>
                                    <template #title>
                                        <span style="margin-left: 10px">{{item.name}}</span>
                                    </template>
                                    <template #label>
                                        <span v-for="(name,index) in item.ar" style="margin-left: 10px"><span
                                                v-if="index !==0">/</span>{{name.name}}</span>
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
                                <p>{{SingerDescribe.briefDesc}}</p>
                            </div>
                            <!--        相似艺人-->
                            <div>
                                <span style="margin-left: 14px;margin-top: 10px;font-weight: bold;">相似艺人</span>
                            </div>

                            <div style="margin: 20px 20px 20px 20px;display:flex;flex-direction:row;">
                                <div style="margin-left: 5px;margin-right: 5px;background:#F5F5F5;height: 130px;float: left;text-align: center;padding-top: 10px;flex: 1"
                                     v-for="(item,index) in simiarts" v-if="index>2?false:true">
                                    <img :src="item.img1v1Url" style="width: 56px;border-radius: 50px;">
                                    <p style="font-size: 14px">{{item.name}}</p>
                                    <van-button round type="info" color="linear-gradient(to right, #ff6034, #ee0a24)"
                                                style="width: 60px;height: 20px;margin-top: 10px">
                                        <p style="font-size: 12px">关注</p>
                                    </van-button>
                                </div>
                            </div>
                        </div>
                        <div v-if="index===1">
                            <!--        近期热门-->
                            <div style="margin-left: 10px;margin-top: 10px;margin-bottom: 6px">
                                <van-icon name="play-circle-o"/>
                                <span style="font-weight: bold;margin-left: 4px">收藏热门50</span>
                                <div style="float: right;display: inline-block;vertical-align: middle;margin-right: 16px"
                                     @click="showPopup">
                                    <van-icon name="bars" size="13px" style="line-height: 20px"/>
                                    <span style="font-size: 13px">管理</span>
                                    <!--                                    底部弹出框-->
                                    <van-popup :close="closefunc" v-model="show" round position="bottom"
                                               :style="{ height: '30%' }">内容
                                    </van-popup>
                                </div>

                            </div>
                            <div v-for="(item,index) in hots">
                                <van-cell @click="getMusicId(item.id)">
                                    <template #icon>
                                        <span style="font-size: 20px;line-height: 50px;color: grey">{{index+1}}</span>
                                    </template>
                                    <template #title>
                                        <span style="margin-left: 10px">{{item.name}}</span>
                                    </template>
                                    <template #label>
                                        <span v-for="(name,index) in item.ar" style="margin-left: 10px"><span
                                                v-if="index !==0">/</span>{{name.name}}</span>
                                        <span>{{' - '+item.al.name}}</span>
                                    </template>
                                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                                    <template #right-icon>
                                        <van-icon name="play-circle-o" size="18px" style="line-height: 50px"/>
                                        <van-icon name="ellipsis" class="search-icon" size="18px"
                                                  style="line-height: 50px;margin-left: 16px"/>
                                    </template>

                                </van-cell>
                            </div>
                        </div>
                    </van-tab>
                </van-tabs>

            </div>
        </scroll>

    </div>

</template>

<script>
    import {GetSingerDescribeApi, GetSingerHotApi, GetSimilaritySingerApi, GetSingerDanQuApi} from "../../http/all-api";
    import {Icon, Button, Card, Tag, Cell, CellGroup, Tab, Tabs, Popup} from "vant";
    import commNav from "../../components/nav/commNav";
    import Scroll from "../../components/scroll"

    export default {
        name: "singer",
        data() {
            return {
                hots: [],
                simiarts: [],
                SingerDescribe: [],
                xiangqing: [],
                tabbar: ['主页', '歌曲', '专辑', '视频'],
                show: false,

            }
        },
        created() {
            //歌手描述
            let iid = this.$route.query.id;
            GetSingerDescribeApi(iid).then(res => {
                this.SingerDescribe = res.data;
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

            //近期热门
            GetSingerHotApi(iid).then(res => {
                this.hots = res.data.songs;
                console.log(this.hots);
            }).catch(error => {
                console.log(error);
            });

            //相似艺人
            GetSimilaritySingerApi(iid).then(res => {
                this.simiarts = res.data.artists;
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

            GetSingerDanQuApi(iid).then(res => {
                this.xiangqing = res.data.artist;
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });
        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            commNav,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            Scroll,
            [Popup.name]: Popup
        },
        methods: {
            pushXinXi() {
                //跳转到歌手简介
                this.$router.push({
                    path: '/sing-introduction',
                    query: {
                        id: this.$route.query.id
                    }
                })
            },
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
            },
            showPopup() {
                this.show = true;
            },
            closefunc() {
                this.show = false
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
</style>