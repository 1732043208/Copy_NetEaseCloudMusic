<!--直播-->
<template>
    <div class="live">
        <div class="topTitle">
            <h4 @click="TopClick">{{topTitle}}</h4>
            <btn-more :title="btnMore" @click.native="TopClick"></btn-more>
        </div>
        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div
                        v-for="(item,index) in liveList"
                        :key="index"
                        class="gridItem">

                    <div class="playCount">
                        <van-icon name="fire" color="#c2463a"/>
                        {{item.popularity | playCount}}·{{item.privateTag}}
                    </div>

                    <div class="songListInfo"
                         @click="SongListClick(item.liveId)"
                    >
                        <van-image
                                fit="cover"
                                radius="5px"
                                :src="imageUrlSize(item)"/>
                        <div class="text">{{item.title}}</div>

                    </div>
                </div>
            </div>
        </horizontal-scroll>
    </div>
</template>

<script>
    // 横向滚动组件
    import HorizontalScroll from "../horizontalScroll";
    import {initScroll} from "../common/mixin";
    import BtnMore from "../common/btnMore";
    //引入vant组件 Grid宫格布局
    import {Image as VanImage, Icon} from 'vant';

    export default {
        name: "live",
        mixins: [initScroll],
        props: {
            liveList: {
                type: Array,
                default: []
            },
            topTitle: String,
            btnMore: String
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.itemWidth = 28;
                    this.itemMargin = 5;
                    this.initPics();
                    this.$refs.hScroll.refresh()
                }, 600);

            })
        },
        computed: {
            imageUrlSize() {
                return function (item) {
                    return item.verticalCover + '?param=120y120'
                }
            }

        },
        methods: {
            TopClick() {
                console.log('更多直播');

            },
            SongListClick(id) {
                // todo 跳转歌单详情
                console.log('歌单点击跳转');
                console.log(id);
            }
        },
        components: {

            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            HorizontalScroll,
            BtnMore
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
    .live {
        padding: 30px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;

        }

        h4 {
            font-size: 44px;
        }

        .list {
            display: flex;
            justify-content: space-around;
        }


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
    }

    .gridItem {
        position: relative;
        margin-right: 30px;
    }

    .playCount {
        position: absolute;
        top: 1px;
        left: 0;
        z-index: 999;
        font-size: 26px;
        padding: 3px 30px 3px 3px;
        color: #eeeeee;
        background-color: rgba(0, 0, 0, 0.2);
        border-top-left-radius: 10px;
        border-bottom-right-radius: 100px;
    }
</style>
