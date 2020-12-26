<template>
    <div>
        <div class="BoxSecond">
            <div style="height: 30px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">视频</span>
            </div>
            <div v-for="item in $store.state.searchResultList.video.videos">
                <van-card @click="pushVideoDetailData(item.vid)">
                    <template #thumb>
                        <van-image :src="item.coverUrl" class="videoImg" lazy-load/>
                        <img src="../../../../../../assets/play.png"
                             style="position: absolute;left: 50%;top: 24%;width: 22px;opacity: 0.8">
                    </template>
                    <template #title>
                        <div style="font-size: 14px;margin-left: 16px;;margin-top: 4px;margin-bottom: 6px"
                             class="videoLineText">
                            {{item.title}}
                        </div>
                    </template>
                    <template #tags>
                        <span style="margin-left: 16px;">{{item.durationms|formatDuring}}</span>
                        <span> by </span>
                        <span v-for="creator in item.creator">{{creator.userName}}</span>
                    </template>
                </van-card>

                <div class="borderLine"></div>
            </div>

            <div class="BoxSecondMore">
                <p @click="pushDetail(3)">
                    <span>查看更多</span>
                    <span :style="{color:$store.state.searchResultList.song.songs[0].ar[0].name.includes($store.state.addWord)?'#9ab4d1':''}">{{$store.state.searchResultList.song.songs[0].ar[0].name}}</span>
                    <span>的相关视频></span>
                </p>
            </div>
        </div>
        <img src="../../../../../../assets/jietu.png" style="width: 100%;height: auto"/>
    </div>
</template>

<script>
    import {Card, Image as VanImage} from 'vant';
    import {formatDuring} from "../../../../../../components/common/utils";

    export default {
        name: "videos",
        components: {
            [Card.name]: Card,
            [VanImage.name]: VanImage
        },
        methods: {
            //跳转到对应视频页面
            pushVideoDetailData(vid) {
                this.$router.push({
                    path: '/videoDetail',
                    query: {
                        vid: vid
                    }
                })
            },
            pushDetail(val) {
                this.$emit('pushDetail', val)
            },
        },
        filters: {
            formatDuring(second = 0) {
                return formatDuring(second)
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

    .borderLine {
        width: 90%;
        height: 1px;
        background-color: #f5f6f7;
        margin: 0 auto;
    }

    .BoxSecondMore {
        font-size: 36px;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        color: grey;
    }

    .van-card {
        background-color: #fff;
        height: 240px;
        overflow: hidden;
    }
    .videoImg {
        width: 300px;
        height: auto;
    }
    .videoLineText {
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
