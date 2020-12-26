<template>
    <div>
        <div class="BoxSecond">
            <div style="height: 30px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">歌单</span>
            </div>

            <div v-for="item in $store.state.searchResultList.playList.playLists">
                <van-card @click="getSongListData(item.id)" style="height: 90px">
                    <template #thumb>
                        <van-image :src="item.coverImgUrl" style="width: 76px;height: 76px" lazy-load/>
                    </template>
                    <template #desc>
                        <div style="margin-top: 4px;overflow: hidden;text-overflow: ellipsis">
                            <span> {{item.trackCount+'首'+' by '+item.creator.nickname+','+'播放'+Math.round(item.playCount/10000*Math.pow(10,1))/Math.pow(10,1)+'万次'}}</span>
                        </div>
                    </template>
                    <template #title>
                        <div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis"
                             :style="{color:item.name.includes($store.state.addWord)?'#9ab4d1':''}">{{item.name}}
                        </div>
                    </template>
                    <template #tags>
                        <div v-for="biaoqian in item.officialTags" style="margin-top: 8px">
                            <van-tag plain type="danger"
                                     style="background-color:#FFDCDB;font-size: 12px;float: left;margin-left: 5px">
                                {{biaoqian}}
                            </van-tag>
                        </div>
                    </template>
                </van-card>
                <div class="borderLine"></div>
            </div>

            <div class="BoxSecondMore">
                <p @click="pushDetail(6)">
                    <span>查看更多</span>
                    <span :style="{color:$store.state.searchResultList.song.songs[0].ar[0].name.includes($store.state.addWord)?'#9ab4d1':''}">{{$store.state.searchResultList.song.songs[0].ar[0].name}}</span>
                    <span>的相关歌单></span>
                </p>
            </div>
        </div>
        <img src="../../../../../../assets/jietu.png" style="width: 100%;height: auto"/>
    </div>
</template>

<script>
    import {Card, Tag, Image as VanImage} from 'vant';

    export default {
        name: "SongList",
        components: {
            [Card.name]: Card,
            [VanImage.name]: VanImage,
            [Tag.name]: Tag
        },
        methods:{
            getSongListData(id) {
                this.$router.push({
                    path: '/daySongList',
                    query: {
                        id: id
                    }
                })
            },
            pushDetail(val) {
                this.$emit('pushDetail', val)
            },
        }
    }
</script>

<style scoped>
    .BoxSecond {
        background-color: #fff;
        padding-top: 30px;
        border-radius: 40px;
    }

    .BoxSecondMore {
        font-size: 36px;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        color: grey;
    }

    .borderLine {
        width: 90%;
        height: 1px;
        background-color: #f5f6f7;
        margin: 0 auto;
    }

    /*修改vant UI库默认样式*/
    .van-card {
        background-color: #fff;
        height: 240px;
        overflow: hidden;
    }
</style>
