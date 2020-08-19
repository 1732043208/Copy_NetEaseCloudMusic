<template>
    <div class="allPlayList">
        <div class="topContent">
            <div class="bg"></div>
            <div id="topContent">
                <div ref="topNav" class="topNav">
                    <van-icon size="24" @click="goBack" color="#000" name="arrow-left"/>
                    <p class="navTitle">歌单广场</p>
                </div>
            </div>
        </div>
        <div class="cc">
            <scroll
                    class="content"
                    ref="scroll"
                    :probe-type="3"
                    :pull-up-load="true"
                    @pullingUp="pullingUp"
            >
                <van-tabs
                        v-model="active"
                        animated
                        swipeable
                        :scrollspy="true"
                        title-active-color="#c2463a"
                        @change="activeChange"
                        background="transparent">
                    <van-tab title="推荐" name="tj">
                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item

                                    :key="index"
                                    v-for="(item,index) in all">
                                <div>
                                    <div class="playCount">
                                        <van-icon name="service-o" color="#eee"/>
                                        {{item.playCount|playCount}}
                                    </div>

                                    <div class="songListInfo"
                                         @click="SongListClick(item.id)">

                                        <van-image
                                                fit="cover"
                                                radius="5px"
                                                :src="imageUrlSize(item)"
                                                @load="imageLoadEnd"
                                        />

                                        <div class="text">{{item.description}}</div>

                                    </div>
                                </div>
                            </van-grid-item>
                        </van-grid>
                    </van-tab>
                    <van-tab title="精品" name="jp">

                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item
                                    :key="index"
                                    v-for="(item,index) in jp">
                                <div>
                                    <div class="playCount">
                                        <van-icon name="service-o" color="#eee"/>
                                        {{item.playCount|playCount}}
                                    </div>

                                    <div class="songListInfo"
                                         @click="SongListClick(item.id)">

                                        <van-image
                                                fit="cover"
                                                radius="5px"
                                                :src="imageUrlSize(item)"
                                                @load="imageLoadEnd"

                                        />

                                        <div class="text">{{item.description}}</div>
                                    </div>
                                </div>
                            </van-grid-item>
                        </van-grid>

                    </van-tab>
                    <van-tab title="华语" name="hy">

                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item
                                    :key="index"
                                    v-for="(item,index) in hy">
                                <div>
                                    <div class="playCount">
                                        <van-icon name="service-o" color="#eee"/>
                                        {{item.playCount|playCount}}
                                    </div>

                                    <div class="songListInfo"
                                         @click="SongListClick(item.id)">

                                        <van-image
                                                fit="cover"
                                                radius="5px"
                                                :src="imageUrlSize(item)"
                                                @load="imageLoadEnd"/>

                                        <div class="text">{{item.description}}</div>
                                    </div>
                                </div>
                            </van-grid-item>
                        </van-grid>

                    </van-tab>
                    <van-tab title="流行" name="lx">

                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item
                                    :key="index"
                                    v-for="(item,index) in lx">
                                <div>
                                    <div class="playCount">
                                        <van-icon name="service-o" color="#eee"/>
                                        {{item.playCount|playCount}}
                                    </div>

                                    <div class="songListInfo"
                                         @click="SongListClick(item.id)">

                                        <van-image
                                                fit="cover"
                                                radius="5px"
                                                :src="imageUrlSize(item)"
                                                @load="imageLoadEnd"/>

                                        <div class="text">{{item.description}}</div>
                                    </div>
                                </div>
                            </van-grid-item>
                        </van-grid>

                        <div>
                            <van-grid class="gridItem" :border="false" :column-num="3">
                                <van-grid-item
                                        :key="index"
                                        v-for="(item,index) in hy">
                                    <div>
                                        <div class="playCount">
                                            <van-icon name="service-o" color="#eee"/>
                                            {{item.playCount|playCount}}
                                        </div>

                                        <div class="songListInfo"
                                             @click="SongListClick(item.id)">

                                            <van-image
                                                    fit="cover"
                                                    radius="5px"
                                                    :src="imageUrlSize(item)"/>

                                            <div class="text">{{item.description}}</div>
                                        </div>
                                    </div>
                                </van-grid-item>
                            </van-grid>
                        </div>
                    </van-tab>
                    <van-tab title="摇滚" name="yg">

                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item
                                    :key="index"
                                    v-for="(item,index) in yg">
                                <div>
                                    <div class="playCount">
                                        <van-icon name="service-o" color="#eee"/>
                                        {{item.playCount|playCount}}
                                    </div>

                                    <div class="songListInfo"
                                         @click="SongListClick(item.id)">

                                        <van-image
                                                fit="cover"
                                                radius="5px"
                                                :src="imageUrlSize(item)"
                                                @load="imageLoadEnd"/>

                                        <div class="text">{{item.description}}</div>
                                    </div>
                                </div>
                            </van-grid-item>
                        </van-grid>

                    </van-tab>
                    <van-tab title="民谣" name="my">

                        <van-grid class="gridItem" :border="false" :column-num="3">
                            <van-grid-item
                                    :key="index"
                                    v-for="(item,index) in my">
                                <div>
                                    <div class="playCount">
                                        <van-icon name="service-o" color="#eee"/>
                                        {{item.playCount|playCount}}
                                    </div>

                                    <div class="songListInfo"
                                         @click="SongListClick(item.id)">

                                        <van-image
                                                fit="cover"
                                                radius="5px"
                                                :src="imageUrlSize(item)"
                                                @load="imageLoadEnd"/>

                                        <div class="text">{{item.description}}</div>
                                    </div>
                                </div>
                            </van-grid-item>
                        </van-grid>

                    </van-tab>
                </van-tabs>
            </scroll>
        </div>

    </div>
</template>

<script>
    import scroll from "../../components/scroll";
    import {Icon, Tab, Tabs, Image as VanImage, Grid, GridItem} from 'vant';
    import {GetHotPlayList, GetHighqualityAPI} from "../../http/all-api";
    import {createAllPlayInfo} from "../../../model/allPlayInfo";
    import {debounce} from "../../components/common/utils";

    export default {
        name: "allPlayList",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        async created() {
            await this.getAllPlayListData({limit: this.limit, cat: '全部', dataType: this.all})
            this.$toast.clear();
        },
        data() {
            return {
                active: 0,
                limit: 51,
                all: [],
                jp: [],
                hy: [],
                lx: [],
                yg: [],
                my: [],
                maxCount: 0,
            }
        },
        computed: {
            imageUrlSize() {
                return function (item) {
                    return item.coverImgUrl + '?param=120y120'
                }
            }
        },
        methods: {
            unique(arr) { // 根据唯一标识orderId来对数组进行过滤
                const res = new Map();  //定义常量 res,值为一个Map对象实例
                //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
                return arr.filter((arr) => !res.has(arr.id) && res.set(arr.id, 1))
            },
            imageLoadEnd() {
                debounce(this.$refs.scroll.refresh, 500);
            },
            goBack() {
                this.$router.go(-1)
            },
            async getAllPlayListData({limit, cat, order, dataType}) {
                await GetHotPlayList({limit: limit, cat: cat, order: order}).then(res => {
                    if (res.data.playlists.length !== 100) {
                        console.log(this.maxCount);
                        let result = res.data.playlists;
                        result.forEach(item => {
                            dataType.push(createAllPlayInfo(item))
                        })
                    } else {
                        console.log(this.maxCount);
                        this.$toast('没有更多了');
                        return;
                    }


                    return dataType;
                }).catch(err => {
                    console.log(err);
                });
            },
            async activeChange(name, title) {
                this.$toast.loading({
                    message: '加载中',
                    forbidClick: true,
                    duration: 0
                });
                switch (name) {
                    case 'tj':
                        this.limit = 51;
                        if (this.tj.length === 0) await this.getAllPlayListData({
                            limit: 51,
                            cat: '全部',
                            dataType: this.all
                        });
                        this.$toast.clear();
                        break;
                    case 'jp':
                        this.limit = 21;
                        await GetHighqualityAPI({limit: 21, cat: '全部'}).then(res => {
                            let result = res.data.playlists;
                            result.forEach(item => {
                                this.jp.push(createAllPlayInfo(item))
                            });
                            return result;
                        }).catch(error => {
                            console.log('获取精品歌单报错');
                            console.log(error);
                        });
                        this.$toast.clear();
                        break;
                    case 'hy':
                        this.limit = 51;
                        if (this.hy.length === 0) await this.getAllPlayListData({
                            limit: 51,
                            cat: '华语',
                            dataType: this.hy
                        });
                        this.$toast.clear();
                        break;
                    case 'lx':
                        this.limit = 51;
                        if (this.lx.length === 0) await this.getAllPlayListData({
                            limit: 51,
                            cat: '流行',
                            dataType: this.lx
                        });
                        this.$toast.clear();
                        break;
                    case  'yg':
                        this.limit = 51;
                        if (this.yg.length === 0) await this.getAllPlayListData({
                            limit: 51,
                            cat: '摇滚',
                            dataType: this.yg
                        });
                        this.$toast.clear();
                        break;
                    case 'my':
                        this.limit = 51;
                        if (this.my.length === 0) await this.getAllPlayListData({
                            limit: 51,
                            cat: '民谣',
                            dataType: this.my
                        });
                        this.$toast.clear();
                        break;
                }
            },
            SongListClick(id) {
                console.log('歌单点击跳转');
                console.log(id);
                this.$router.push({
                    path: '/daySongList',
                    query: {id}
                })
            },
            // 上拉加载
            async pullingUp() {
                this.limit += 20;
                switch (this.active) {
                    case 'tj':
                        await this.getAllPlayListData({limit: this.limit, cat: '全部', dataType: this.all});
                        this.all = this.unique(this.all);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'jp':
                        await GetHighqualityAPI({limit: this.limit, cat: '全部'}).then(res => {
                            let result = res.data.playlists;
                            if (res.data.playlists.length === 100) {
                                this.$toast('没有更多歌单了');
                                return;
                            }
                            result.forEach(item => {
                                this.jp.push(createAllPlayInfo(item))
                            });
                        }).catch(error => {
                            console.log('获取精品歌单报错');
                            console.log(error);
                        });
                        this.jp = this.unique(this.jp);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'hy':
                        await this.getAllPlayListData({limit: this.limit, cat: '华语', dataType: this.hy});
                        this.hy = this.unique(this.hy);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'lx':
                        await this.getAllPlayListData({limit: this.limit, cat: '流行', dataType: this.lx});
                        this.lx = this.unique(this.lx);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case  'yg':
                        await this.getAllPlayListData({limit: this.limit, cat: '摇滚', dataType: this.yg});
                        this.yg = this.unique(this.yg);
                        this.$refs.scroll.finishPullUp();
                        break;
                    case 'my':
                        this.getAllPlayListData({limit: this.limit, cat: '民谣', dataType: this.my});
                        this.my = this.unique(this.my);
                        this.$refs.scroll.finishPullUp();
                        break;
                }
            },
        },
        components: {
            scroll,
            [Icon.name]: Icon,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [VanImage.name]: VanImage,
            [GridItem.name]: GridItem,
            [Grid.name]: Grid,
        },
        filters: {
            playCount(num) {
                if (num >= 100000000) {
                    num = Math.round(num / 10000000) / 10 + '亿'
                } else if (num >= 10000) {
                    num = Math.round(num / 1000) / 10 + '万'
                }
                return num;
            }
        }
    }
</script>

<style scoped lang="less">
    .allPlayList {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: center;
            font-weight: bold;

            .navTitle {
                padding-left: 30px;
            }
        }

        #topContent {
            width: 100vw;
            position: absolute;
            top: 0;
        }

        .bg {
            width: 100vw;
            height: 20vh;
            background: darkgrey;
            filter: blur(300px);
            overflow: hidden;
        }

        .content {
            width: 100vw;
            /*height: 92%;*/
            overflow: hidden;
            position: absolute;
            top: 120px;
            left: 0;
            bottom: 0;
            /*z-index: 0;*/
            touch-action: none;

            .gridItem {
                width: 100vw;
                position: relative;
                margin-right: 30px;

                .text {
                    width: 300px;
                    font-size: 30px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }

                .playCount {
                    position: absolute;
                    top: 40px;
                    right: 40px;
                    z-index: 999;
                    font-size: 36px;
                    color: #eeeeee;

                }
            }
        }

    }
</style>
