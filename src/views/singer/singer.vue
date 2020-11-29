<template>
    <div>
        <comm-nav :title="this.xiangqing.name" v-show="false">
            <div style="position: absolute;right: 20px;">
                <van-icon name="ellipsis" @click="showPopupJuBao"/>
                <van-popup :close="closeJuBao" v-model="showJuBao" position="top"
                           :style="{ height: '7%',width: '50%',top:'10px',left:'182px',borderRadius:'6px'}" get-container="body" @click="showPopupJuBaoSecond">
                    <van-cell title="举报" icon="warn-o"/>

                    <van-popup :close="closeshowJuBaoSecondfuc" v-model="showJuBaoSecond" round
                               :style="{ height: '48%',width:'86%' }" get-container="body">
                        <van-cell title="举报原因" style="font-weight: bold;font-size: 18px"/>
                        <van-cell title="恶意攻击谩骂"/>
                        <van-cell title="营销广告"/>
                        <van-cell title="淫秽色情"/>
                        <van-cell title="政治反动"/>
                        <van-cell title="虚假信息"/>
                        <van-cell title="其他原因"/>
                    </van-popup>
                </van-popup>
            </div>
        </comm-nav>
        <scroll class="content" ref="scroll"
                :probe-type="3"
                :pull-up-load="true">
            <div>
                <div style="width: 100%;height: 280px;position: relative">

                    <img :src="xiangqing.picUrl" style="width: 100%;height: 100%">
                    <comm-nav  style="position: absolute;top: 0;background-color:transparent;color: white">
                        <div style="position: absolute;right: 20px;">
                            <van-icon name="share" style="position: absolute;margin-left: 270px" size="22px"/>
                            <van-icon name="ellipsis" @click="showPopupJuBao" style="position: absolute;margin-left: 310px" size="22px"/>
                            <van-popup :close="closeJuBao" v-model="showJuBao" position="top"
                                       :style="{ height: '7%',width: '50%',top:'10px',left:'182px',borderRadius:'6px'}" get-container="body" @click="showPopupJuBaoSecond">
                                <van-cell title="举报" icon="warn-o"/>

                                <van-popup :close="closeshowJuBaoSecondfuc" v-model="showJuBaoSecond" round
                                           :style="{ height: '48%',width:'86%' }" get-container="body">
                                    <van-cell title="举报原因" style="font-weight: bold;font-size: 18px"/>
                                    <van-cell title="恶意攻击谩骂" @click="closeshowJuBaoSecondfuc"/>
                                    <van-cell title="营销广告" @click="closeshowJuBaoSecondfuc"/>
                                    <van-cell title="淫秽色情" @click="closeshowJuBaoSecondfuc"/>
                                    <van-cell title="政治反动" @click="closeshowJuBaoSecondfuc"/>
                                    <van-cell title="虚假信息" @click="closeshowJuBaoSecondfuc"/>
                                    <van-cell title="其他原因" @click="closeshowJuBaoSecondfuc"/>
                                </van-popup>
                            </van-popup>
                        </div>
                    </comm-nav>
                    <div style="position: absolute;top: 200px;font-size: 20px;font-weight: bold;color: white;margin-left: 16px">{{xiangqing.name}}</div>
                </div>
                    <van-tabs :swipeable="true" :animated="true" ref="tabs" v-model="activeName" title-active-color="#DF393D">
                        <van-tab title="主页" name="a">

                           <div style="background:white;">
                               <!--        近期热门-->
                               <div style="padding-left: 10px;padding-top: 10px">
                                   <van-icon name="play-circle-o"/>
                                   <span style="font-weight: bold;margin-left: 4px">近期热门</span>
                                   <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                                               style="width:80px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle"
                                               @click="tiaozhuan">
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
                                       <p style="font-size: 14px;height: 20px;display: block">{{item.name}}</p>
                                       <van-button round type="info" color="linear-gradient(to right, #ff6034, #ee0a24)"
                                                   style="width: 60px;height: 20px;margin-top: 10px">
                                           <p style="font-size: 12px">关注</p>
                                       </van-button>
                                   </div>
                               </div>

                           </div>
                        </van-tab>
                        <van-tab title="歌曲" name="b"> <!--        近期热门-->
                            <div style="margin-left: 10px;margin-top: 10px;margin-bottom: 6px">
                                <div @click="showPopupAdd">
                                    <van-icon name="add-o"/>
                                    <span style="font-weight: bold;margin-left: 4px">收藏热门50</span>
                                    <van-popup v-model="showAdd" get-container="body" :close="closeAddfunc">内容</van-popup>
                                </div>
                                <div style="float: right;display: inline-block;vertical-align: middle;margin-right: 16px"
                                     @click="showPopup">
                                    <van-icon name="bars" size="13px" style="line-height: 20px"/>
                                    <span style="font-size: 13px">管理</span>
                                    <!--                                    底部弹出框-->
                                    <van-popup :close="closefunc" v-model="showBottom" round position="bottom"
                                               :style="{ height: '20%' }" get-container="body">
                                        <van-cell title="管理"/>
                                        <van-cell title="多选" icon="bars"/>
                                        <van-cell title="选择排序方式" icon="ascending"/>
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
                        </van-tab>
                        <van-tab :title="'专辑'+xiangqing.albumSize" name="c">
                            <div style="margin-left: 10px;margin-top: 10px;margin-bottom: 6px">
                                <div @click="showPopupAdd" style="float: left">
                                    <span style="font-weight: bold;margin-left: 4px;font-size: 15px">按发行时间排序</span>
                                </div>
                                <div style="float: right;display: inline-block;vertical-align: middle;margin-right: 16px"
                                     @click="showPopup">
                                    <van-icon name="bars" size="13px" style="line-height: 20px"/>
                                    <span style="font-size: 13px">管理</span>
                                    <!--                                    底部弹出框-->
                                    <van-popup :close="closefunc" v-model="showBottom" round
                                               :style="{ height: '20%' ,width:'80%'}" get-container="body">
                                        <van-cell title="按发行时间排序"/>
                                        <van-cell title="按热度排序"/>
                                        <van-cell title="按类型排序"/>
                                    </van-popup>
                                </div>

                            </div>
                            <div v-for="item in zhuanji">
                                <van-cell @click="pushAlbum(item.id)">
                                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                                    <template #icon>
                                        <img :src="item.picUrl" style="width: 56px;height: auto;">
                                    </template>
                                    <template #title>
                                        <div>
                                            <div style="position: relative;top: 4px;left: 14px;font-weight: bold">
                                                <span>{{item.name}}</span>
                                                <span v-for="name in item.alia">{{name}}</span>
                                                <span v-for="mingzi in item.alias" style="color: grey"> ({{mingzi}})</span>
                                            </div>

                                        </div>
                                    </template>
                                    <template #label>
                                        <div style="position: relative;left: 10px">
                                            <span> {{item.publishTime|formatDate}}</span>
                                        </div>
                                    </template>
                                </van-cell>
                            </div>
                        </van-tab>
                        <van-tab title="视频" name="d">
                            <div v-for="item in mv">
                                <van-card @click="getMVDetailData(item.id)">
                                    <template #thumb>
                                        <img :src="item.imgurl" style="width: 130px;height: auto">
                                        <span style="position: absolute;left: 85px;color: white">{{Math.round(item.duration/10000*Math.pow(10,1))/Math.pow(10,1)}}万</span>
                                    </template>
                                    <template #title>
                                        <div style="margin-left: 46px;border: 1px solid #DF393D;color:#DF393D;width: 22px;height: 12px;float: left;margin-top: 8px;text-align: center;line-height: 12px;border-radius: 2px">mv</div>
                                        <div style="font-size: 15px;margin-left: 46px;white-space: pre-wrap;margin-top: 4px;margin-bottom: 6px;">
                                            {{item.name}}
                                        </div>
                                    </template>
                                    <template #tags>
                                        <span style="margin-left: 46px;color: grey">{{item.publishTime}}</span>
                                    </template>
                                </van-card>
                            </div>
                        </van-tab>
                    </van-tabs>


            </div>
        </scroll>

    </div>

</template>

<script>
    import {
        GetSingerDescribeApi,
        GetSingerHotApi,
        GetSimilaritySingerApi,
        GetSingerDanQuApi,
        GetSingerZhuanJiApi,
        GetSingerMVApi
    } from "../../http/all-api";
    import {Icon, Button, Card, Tag, Cell, CellGroup, Tab, Tabs, Popup} from "vant";
    import commNav from "../../components/nav/commNav";
    import Scroll from "../../components/scroll"
    import {formatDate} from "../../components/common/utils";

    export default {
        name: "singer",
        data() {
            return {
                hots: [],
                simiarts: [],
                SingerDescribe: [],
                xiangqing: [],
                showBottom: false,
                activeName: 'a',
                showAdd: false,
                zhuanji: [],
                mv: [],
                showJuBao:false,
                showJuBaoSecond:false,
                tupian:''
            }
        },

        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy.MM.dd')
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
                // console.log(this.hots);
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

            //获取专辑
            GetSingerZhuanJiApi(iid).then(res => {
                this.zhuanji = res.data.hotAlbums;
                console.log(this.zhuanji);
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

            //获取mv
            GetSingerMVApi(iid).then(res => {
                this.mv = res.data.mvs;
                // console.log(res);
                // console.log(res);
            }).catch(error => {
                console.log(error);
            });

            GetSingerDanQuApi(iid).then(res => {
                this.xiangqing = res.data.artist;
                console.log(res);
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
            //专辑跳转
            pushAlbum(id) {
                this.$router.push({
                    path: '/album',
                    query: {
                        id: id
                    }
                })
            },
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
                this.showBottom = true;
            },
            showPopupJuBao(){
                this.showJuBao=true
            },
            closeJuBao(){
              this.showJuBao=false
            },
            showPopupAdd() {
                this.showAdd = true;
            },
            closefunc() {
                this.showBottom = false
            },
            closeAddfunc() {
                this.showAdd = false
            },
            tiaozhuan() {
                this.$refs.tabs.scrollTo('b')
            },
            getMVDetailData(vid) {
                this.$router.push({
                    path: '/music-mv',
                    query: {
                        mvId: vid
                    }
                })
            },
            showPopupJuBaoSecond(){
                this.showJuBaoSecond =true;
            },
            closeshowJuBaoSecondfuc(){
                this.showJuBaoSecond=false;
                this.showJuBao = false
            }
        },
        watch:()=>{

    }
    }
</script>

<style scoped>
    .content {
        overflow: hidden;
        position: absolute;
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        touch-action: none;
        white-space: pre-wrap;
    }
</style>
