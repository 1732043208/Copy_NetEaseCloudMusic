<template>
    <div>
        <div v-for="item in diantais">
            <van-cell @click="pushDianTai(item.id)">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #icon>
                    <img :src="item.picUrl" style="width: 50px;height: auto;">
                </template>
                <template #title>
                    <div>
                        <div style="position: relative;top: 4px;left: 14px">
                            <span>{{item.name}}</span>
                            <span v-for="name in item.alia">{{name}}</span></div>
                    </div>
                </template>
                <template #label>
                    <div style="position: relative;left: 14px">
                        <span>{{item.dj.nickname}} </span>
                    </div>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
    import {GetSearchApi} from "../../../../http/all-api";
    import {Icon} from "vant";
    import {Button} from 'vant';
    import {Card} from 'vant';
    import {Tag} from 'vant';
    import {Cell, CellGroup} from 'vant';

    export default {
        name: "SearchTabbarDianTai",
        data() {
            return {
                diantais: []
            }
        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
        },
        created() {
            GetSearchApi(this.$store.state.addWord, '1009').then(res => {
                this.diantais = res.data.result.djRadios;
                console.log(this.diantais);
            }).catch(error => {
                console.log(error);
            });
        },
        methods:{
            pushDianTai(id){
                this.$router.push({
                    path:'/Dj-detail',
                    query:{
                        id:id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>