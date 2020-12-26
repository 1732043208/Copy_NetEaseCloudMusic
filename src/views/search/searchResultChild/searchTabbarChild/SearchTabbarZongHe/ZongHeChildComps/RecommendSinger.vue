<template>
    <div>
        <van-cell class="BoxFirst"
                  :to="{path:'/singer',query:{id:$store.state.searchResultList.artist.artists[0].id}}">
            <!-- 使用 right-icon 插槽来自定义右侧图标 -->
            <template #icon>
                <div class="BoxFirstImgFatherBox"
                     :style="{'background-image':'url('+$store.state.searchResultList.artist.artists[0].img1v1Url+')'}">
                </div>
            </template>
            <template #title>
                <div class="BoxFirstBox">
                    <p class="BoxFirstBoxFirstTitle">
                        <span>歌手:</span>
                        <span v-if="$store.state.searchResultList.artist.artists[0].name">{{$store.state.searchResultList.artist.artists[0].name}}</span>
                        <span v-if="$store.state.searchResultList.artist.artists[0].alias.length!==0">{{'('+$store.state.searchResultList.artist.artists[0].alia[0]+')'}}</span>
                    </p>
                    <p class="BoxFirstBoxSecondTitle">
                        专辑:{{$store.state.searchResultList.artist.artists[0].albumSize}}</p>
                </div>
            </template>
        </van-cell>
    </div>
</template>

<script>
    import {Cell} from 'vant';

    export default {
        name: "RecommendSinger",
        components: {
            [Cell.name]: Cell,
        }
    }
</script>

<style scoped>
    .BoxFirst {
        border-radius: 40px;
        position: relative;
        margin-bottom: 40px;
    }
    .BoxFirstBox {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 20px;
        border-radius: 40px;
    }
    .BoxFirstImgFatherBox {
        height: 160px;
        width: 160px;
        background-size: auto 110%;
        border-radius: 80px;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .BoxFirstBoxFirstTitle {
        font-weight: 700;
        font-size: 46px;
    }

    .BoxFirstBoxSecondTitle {
        font-size: 38px;
        color: #bbbbbb;
    }
</style>
