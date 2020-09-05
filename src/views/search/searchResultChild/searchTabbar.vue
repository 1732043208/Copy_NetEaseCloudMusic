<template>
    <div>
        <van-tabs :swipeable="true" >
            <van-tab v-for="(item,index) in tabbarList" :key="index" :title="item">
               <div v-if="index === 0">
                   <SearchTabbarZongHe></SearchTabbarZongHe>
               </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import SearchTabbarZongHe from "./searchTabbarChild/SearchTabbarZongHe";
    export default {
        name: "searchTabbar",
        data(){
            return{
                tabbarList:['综合','单曲','云村','视频','歌手','专辑','歌单','主播电台','用户']
            }
        },
        components:{
            SearchTabbarZongHe
        }
    }
</script>

<style scoped>

</style>
