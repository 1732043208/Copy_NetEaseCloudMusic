<template>
    <div>
        <div class="BoxSecond" style="margin-top: 20px;">
            <div style="height: 30px;margin-top: 6px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">专辑</span>
            </div>
            <div v-for="item in $store.state.searchResultList.album.albums">
                <van-cell @click="pushAlbum(item.id)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-image :src="item.picUrl" style="width: 56px;height: auto;" lazy-load/>
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 6px;left: 12px;font-size: 15px">
                                <span>{{item.name}}</span>
                                <span v-for="name in item.alia">{{name}}</span></div>
                        </div>
                    </template>
                    <template #label>
                        <div style="position: relative;top: 2px;left: 12px;font-size: 12px">
                            <span :style="{color:item.artist.name.includes($store.state.addWord)?'#5A6E88':''}">{{item.artist.name}} </span>
                            <span style="padding-left: 10px"> {{item.publishTime|formatDate}}</span>
                        </div>
                    </template>
                </van-cell>

            </div>
            <div class="BoxSecondMore" style="border-top: 1px solid #f5f6f7" @click="pushDetail(5)">
                <span>{{$store.state.searchResultList.album.moreText}} &gt</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {formatDate} from "../../../../../../components/common/utils";
    import {Cell, Image as VanImage} from 'vant';

    export default {
        name: "Album",
        components: {
            [Cell.name]: Cell,
            [VanImage.name]: VanImage,
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy.MM.dd')
            },
        },
        methods: {
            //跳转到对应专辑页面
            pushAlbum(id) {
                this.$router.push({
                    path: '/album',
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
</style>
