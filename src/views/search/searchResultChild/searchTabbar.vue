<template>
    <div>
        <van-tabs :swipeable="true" >
            <van-tab v-for="(item,index) in tabbarList" :key="index" :title="item">
               <div v-if="index === 0">
                   <SearchTabbarZongHe></SearchTabbarZongHe>
               </div>
                <div v-if="index ===1">
                    <SearchTabbarDanQu></SearchTabbarDanQu>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import SearchTabbarZongHe from "./searchTabbarChild/SearchTabbarZongHe";
    import SearchTabbarDanQu from "./searchTabbarChild/SearchTabbarDanQu";
    import { Cell, CellGroup } from 'vant';
    import { Tab, Tabs } from 'vant';
    export default {
        name: "searchTabbar",
        data(){
            return{
                tabbarList:['综合','单曲','云村','视频','歌手','专辑','歌单','主播电台','用户']
            }
        },
        components:{
            SearchTabbarZongHe,
            SearchTabbarDanQu,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Tab.name]:Tab,
            [Tabs.name]:Tabs
        }
    }
</script>

<style scoped>

</style>
