<template>
    <div class="yunCun">
        <div class="topTitle">
            <h4 @click="TopClick">{{yunCun.moduleName}}</h4>
            <btn-more title="查看更多" @click.native="TopClick"></btn-more>
        </div>

        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div
                        v-for="(item,index) in yunCun.squareFeedViewDTOList"
                        :key="index"
                        class="gridItem">

                    <div class="songListInfo"
                         @click="SongListClick(item.id)"
                    >
                        <van-image
                                fit="fill"
                                radius="5px"
                                height="120px"
                                :src="item.resource.mlogBaseData.coverUrl"/>
                        <div class="text">{{item.resource.mlogBaseData.text}}</div>

                    </div>
                </div>
            </div>
        </horizontal-scroll>

    </div>
</template>

<script>
    import HorizontalScroll from "../horizontalScroll";
    import {initScroll} from "../common/mixin";
    import BtnMore from "../common/btnMore";
    import {Icon, Image as VanImage} from "vant";

    export default {
        name: "yuncun",
        mixins: [initScroll],
        props: {
            yunCun: {
                type: Object,
                default: {}
            }
        },
        mounted() {
            this.$nextTick(() => {
                setTimeout(() => {
                    this.itemWidth = 20;
                    this.itemMargin = 1;
                    this.initPics();
                    this.$refs.hScroll.refresh()
                }, 600);
            });
        },
        methods: {
            TopClick() {
                console.log('更多云村');
                // GetHotPlayList().then(res => {
                //     console.log(res);
                // }).catch(error => {
                //     console.log(error);
                // })
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
        }
    }
</script>

<style scoped lang="less">
    .yunCun {
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
        width: 100vw;
        position: relative;
        margin-right: 30px;
    }

    .playCount {
        position: absolute;
        top: 1px;
        right: 10px;
        z-index: 999;
        font-size: 36px;
        color: #eeeeee;

    }
</style>
