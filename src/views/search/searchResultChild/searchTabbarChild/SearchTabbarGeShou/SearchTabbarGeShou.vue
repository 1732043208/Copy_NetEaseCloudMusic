<template>
    <div>
        <div v-for="item in artists">
            <van-cell @click="pushSinger(item.id)">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #icon><img :src="item.img1v1Url" class="getgold_top_head_img"></template>
                <template #title>
                    <div>
                        <div style="position: relative;top: 20px;left: 14px">
                            <span>{{item.name}}</span>
                            <span v-for="name in item.alia"> ({{name}})</span></div>
                    </div>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
    import {GetSearchApi} from "../../../../../http/all-api";
    import {Button, Icon, Card, Tag, Cell, CellGroup} from 'vant';

    export default {
        name: "SearchTabbarGeShou",
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
        },
        data() {
            return {
                artists: []
            }
        },
        created() {
            GetSearchApi(this.$store.state.addWord, '100').then(res => {
                this.artists = res.data.result.artists;
                console.log(this.artists);

            }).catch(error => {
                console.log(error);
            });
        },
        methods: {
            pushSinger(id) {
                this.$router.push({
                    path: '/singer',
                    query: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .getgold_top_head_img {
        height: 160px;
        width: 160px;
        border-radius: 50%;
        margin-top: 15px;
        margin-left: 20px;
    }

    .van-cell__title {
        border-bottom: 1px solid #f7f7f7;
    }
</style>
