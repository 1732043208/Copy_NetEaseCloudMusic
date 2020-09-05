<template>
    <div>
        <div style="margin-top: 10px;height: 30px;">
            <span style="margin-left: 18px;font-weight: bold;">单曲</span>
            <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                        style="width:80px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                <van-icon name="play-circle-o" color="black" style="margin-top: 2px"/>
                <span style="color: black">播放全部</span></van-button>
        </div>
        <div v-for="item in $store.state.searchResultList">
            <van-cell
                    @click="getMusicId()"
                    title-class="titleStyle" label-class="labelStyle">
                <template #title>
                    <span>{{item.name}}</span>
                    <span class="titleSecond" v-if="item.alias.length!==0"> ({{item.alias[0]}})</span>
                </template>
                <template #label>
                    <span v-for="(niubi,index) in item.artists">
                        <span v-if="index !==0">/</span>
                        {{niubi.name}}
                    </span>
                    <span>{{' - '+item.album.name}}</span>
                    <span v-if="item.alias.length!==0"> ({{item.alias[0]}})</span>
                </template>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="ellipsis" class="search-icon" size="18px"/>
                </template>
            </van-cell>
        </div>

    </div>
</template>

<script>
    import {Icon} from "vant";
    import {Button} from 'vant';

    export default {
        name: "SearchTabbarZongHe",
        methods:{
          getMusicId(musicId){
              // 音乐id
              this.$store.dispatch('getMusicUrl', this.musicId);
              this.$store.dispatch('getMusicDetail', this.musicId);
          }
        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button
        }
    }
</script>

<style scoped>
    .titleStyle {
        font-size: 44px;
    }

    .labelStyle {
        width: 500px;
        font-size: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .titleSecond {
        font-size: 44px;
        color: #BEBFC0;
    }

    .search-icon {
        position: relative;
        top: 30px;

    }
</style>
