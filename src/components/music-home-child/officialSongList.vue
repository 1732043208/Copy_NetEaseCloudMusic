<!--官方歌单组件-->
<template>
    <div class="officialSongList">
        <div class="topTitle">
            <h4 @click="TopClick">{{topTitle}}</h4>
            <btn-more :title="btnMore" @click.native="TopClick"></btn-more>
        </div>

        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div
                        v-for="(item,index) in officialSongList"
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
                                :src="item.uiElement.image.imageUrl"/>
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

    //  网络请求方法
    import {GetHotPlayList} from "../../http/all-api";

    export default {
        name: "officialSongList",
        mixins: [initScroll],
        props: {
            officialSongList: {
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
            });
        },
        methods: {
            TopClick() {
                console.log('更多歌单');
                GetHotPlayList().then(res => {
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
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
    .officialSongList {
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
            /*flex: 1;*/
        }


        .songListInfo {
        }

        .text {
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

