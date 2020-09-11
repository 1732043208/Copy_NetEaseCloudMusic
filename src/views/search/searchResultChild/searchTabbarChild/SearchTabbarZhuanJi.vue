<template>
    <div>
        <div v-for="item in zhuanjis">
            <van-cell>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #icon>
                    <img :src="item.picUrl" style="width: 60px;height: auto;">
                </template>
                <template #title>
                    <div>
                        <div style="position: relative;top: 10px;left: 14px">
                            <span>{{item.name}}</span>
                            <span v-for="name in item.alia">{{name}}</span></div>
                    </div>
                </template>
                <template #label>
                    <div style="position: relative;top: 5px;left: 14px">
                        <span>{{item.artist.name}} </span>
                        <span> {{item.publishTime|formatDate}}</span>
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
    import {formatDate, formatDuring} from "../../../../components/common/utils";
    export default {
        name: "SearchTabbarZhuanJi",
        data(){
          return {
              zhuanjis:[]
          }
        },
        components:{
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
        },
        created() {
            GetSearchApi(this.$store.state.addWord,'10').then(res => {
                this.zhuanjis=res.data.result.albums;
                console.log(res);
            }).catch(error => {
                console.log(error);
            });
        },
        filters: {
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy.MM.dd')
            }
        }
    }
</script>

<style scoped>

</style>