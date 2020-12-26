<template>
    <div>
        <div class="BoxSecond">
            <div style="border-bottom: 1px solid #f5f6f7;padding-bottom: 10px">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">单曲</span>
                <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                            style="width:60px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                    <van-icon name="play-circle-o" color="black" style="margin-top: 2px"/>
                    <span style="color: black">播放</span></van-button>
            </div>

            <div v-for="item in $store.state.searchResultList.song.songs">
                <van-cell
                        @click="getMusicId(item.id)"
                        label-class="labelStyle"
                        title-class="titleStyle">
                    <template #title>
                        <span>{{item.name}}</span>
                        <span class="titleSecond" v-if="item.alia.length!==0"> ({{item.alia[0]}})</span>
                    </template>
                    <template #label>
                    <span v-for="(niubi,index) in item.ar">
                        <span v-if="index !==0">/</span>
                        <span :style="{color:niubi.name===$store.state.addWord?'#5A6E88':''}">{{niubi.name}}</span>
                    </span>
                        <span> - </span>
                        <span :style="{color:item.al.name.includes($store.state.addWord)?'#5A6E88':''}">{{item.al.name}}</span>
                        <span v-if="item.alia.length!==0"> ({{item.alia[0]}})</span>
                    </template>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <img src="../../../../../../assets/MV.png" alt="" class="mvImg" @click.stop="pushMV(item.mv)"
                             v-if="item.mv !== 0">
                        <van-icon name="ellipsis" class="search-icon" size="18px"/>
                    </template>
                </van-cell>
                <div class="border"></div>
            </div>
            <div class="BoxSecondMore">
                <p @click="pushDetail(1)">
                    <span>查看更多</span>
                    <span :style="{color:$store.state.searchResultList.song.songs[0].ar[0].name.includes($store.state.addWord)?'#9ab4d1':''}">{{$store.state.searchResultList.song.songs[0].ar[0].name}}</span>
                    <span>的歌曲></span>
                </p>
            </div>
        </div>
        <img src="../../../../../../assets/jietu.png" style="width: 100%;height: auto"/>
    </div>
</template>

<script>
    import {Icon, Button, Cell,} from 'vant';

    export default {
        name: "SingleSong",
        components: {
            [Button.name]: Button,
            [Icon.name]: Icon,
            [Cell.name]: Cell
        },
        methods: {
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
            },
            //跳转到对应mv页面
            pushMV(vid) {
                this.$router.push({
                    path: '/music-mv',
                    query: {
                        mvId: vid
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

    .labelStyle {
        width: 700px;
        font-size: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .titleStyle {
        font-size: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .titleSecond {
        font-size: 40px;
        color: #BEBFC0;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100px;
    }

    .search-icon {
        position: relative;
        top: 30px;
    }

    .BoxSecondMore {
        font-size: 36px;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        color: grey;
    }

    .mvImg {
        width: 50px;
        height: 50px;
        margin-top: 30px;
        margin-right: 20px;
    }
</style>
