<!--每日推荐歌单-->
<template>
    <div class="songList">
        <div class="topTitle">
            <h4 @click="TopClick">{{topTitle}}</h4>
            <btn-more :title="btnMore" @click.native="TopClick"></btn-more>
        </div>

        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div
                        v-for="(item,index) in recommendSongList"
                        :key="index"
                        class="gridItem">

                    <div class="playCount">
                        <van-icon name="service-o" color="#eee"/>
                        {{item.resources[0].resourceExtInfo.playCount|playCount}}
                    </div>

                    <div class="songListInfo"
                         @click="SongListClick(item.creativeId)"
                    >
                        <van-image
                                fit="cover"
                                radius="5px"
                                :src="imageUrlSize(item)"/>
                        <div class="text">{{item.uiElement.mainTitle.title}}</div>

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
        name: "recommendedSongList",
        mixins: [initScroll],
        props: {
            recommendSongList: {
                type: Array,
                default: []
            },
            topTitle: String,
            btnMore: String
        },
        computed: {
            imageUrlSize() {
                return function (item) {
                    return item.uiElement.image.imageUrl + '?param=120y120'
                }
            }

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
        methods: {
            TopClick() {
                console.log('更多歌单');
                this.$router.push({
                    path:'/allPlayList'
                })
            },
            SongListClick(id) {
                console.log('歌单点击跳转');
                console.log(id);
                this.$router.push({
                    path: '/daySongList',
                    query: {id}
                })
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
    .songList {
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
        right: 10px;
        z-index: 999;
        font-size: 36px;
        color: #eeeeee;

    }
</style>
