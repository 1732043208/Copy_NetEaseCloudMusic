<!--每日推荐-->
<template>
    <div class="musicSort">
        <horizontal-scroll>
            <div ref="list" class="list">
                <div
                        v-for="(item,index) in icons"
                        class="musicSort-item"
                        :key="index"
                        @click="MusicSortClick(index)"
                >
                    <van-image
                            v-if="item.skinSupport"
                            width="35px"
                            height="35px"
                            fit="cover"
                            :src="item.iconUrl"
                            class="img1"
                    />
                    <van-image
                            width="42px"
                            height="42px"
                            v-if="!item.skinSupport"
                            fit="cover"
                            round
                            :src="item.iconUrl"
                            class="img2"
                    />
                    <div>{{item.name}}</div>
                </div>
            </div>

        </horizontal-scroll>
    </div>
</template>

<script>
    // 混入横向滚动方法，动态改变横向可滚动距离
    import {initScroll} from "../common/mixin";

    import {Image as VanImage} from 'vant';
    // 引入网络请求方法
    import {GetHomeIconAPI, GetFmAPI, GetRecommendSongAPI, GetHotPlayList, GetTopListAPI} from "../../http/all-api";

    import horizontalScroll from "../horizontalScroll";

    export default {
        name: "musicSort",
        mixins: [initScroll],
        mounted() {
            GetHomeIconAPI().then(res => {
                this.icons.push(...res.data.data);

            }).catch(error => {
                console.log('获取首页圆形图标出错');
                console.dir(error);
            });
            this.$nextTick(() => {
                this.itemWidth = 25;
                this.itemMargin = 2;
                this.initPics();
            });
        },
        data() {
            return {
                icons: [],
            }
        },
        methods: {
            MusicSortClick(index) {
                if (index === 0) {
                    this.$router.push({
                        path:'/dayMusic'
                    })
                } else if (index === 1) {
                    this.$router.push({
                        path:'/allPlayList'
                    })
                } else if (index === 2) {
                    GetTopListAPI().then(res => {
                        // todo 所有榜单
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                } else if (index === 3) {
                    GetFmAPI().then(res => {
                        // todo 私人FM接口接通
                        console.log(res);
                    }).catch(err => {
                        console.log(err);
                    })
                }
            },

        },
        components: {
            [VanImage.name]: VanImage,
            horizontalScroll
        }
    }
</script>

<style scoped lang="less">
    .musicSort {
        font-size: 12px;
        padding: 5px 0 30px;
        border-bottom: 1px solid #eee;
        margin-top: 30px;

        .list {
            display: flex;
            justify-content: space-around;
        }

        .musicSort-item {
            text-align: center;
            margin: 0 15px;
        }

        .img1 {
            text-align: center;
            background: #c2463a;
            color: #eeeeee;
            border-radius: 150px;
            padding: 10px;
            margin-bottom: 10px;
        }

        .img2 {
            text-align: center;
            margin-bottom: 10px;
        }

        div {
            font-size: 30px;
        }
    }


</style>
