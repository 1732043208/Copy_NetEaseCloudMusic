<template>
    <div>
        <div class="BoxSecond" style="margin-top: 20px">
            <div style="height: 30px;margin-top: 6px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">歌手</span>
            </div>
            <div v-for="item in $store.state.searchResultList.artist.artists">
                <van-cell @click="pushSinger(item.id)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-image :src="item.img1v1Url" class="getgold_top_head_img" round/>
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 22px;left: 14px">
                                <span :style="{color:item.name.includes($store.state.addWord)?'#5A6E88':''}">{{item.name}}</span>
                                <span v-for="name in item.alia">{{name}}</span>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </div>
        </div>
    </div>
</template>

<script>
    import {Cell,Image as VanImage} from 'vant';
    export default {
        name: "Singer",
        components:{
            [Cell.name]:Cell,
            [VanImage.name]:VanImage
        },
        methods:{
            //跳转到对应歌手页面
            pushSinger(id) {
                this.$router.push({
                    path: '/singer',
                    query: {
                        id: id
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .BoxSecond {
        background-color: #fff;
        padding-top: 30px;
        padding-bottom: 20px;
        border-radius: 40px;
    }
    .getgold_top_head_img {
        height: 180px;
        width: 180px;
        margin-left: 10px;
    }
</style>
