<template>
    <div>
        <van-tabs :swipeable="true">
            <van-tab v-for="(item,index) in tabbarList" :key="index" :title="item">
                <div v-if="index === 0">
                    <SearchTabbarZongHe @backtop="getbacktop"></SearchTabbarZongHe>
                </div>
                <div v-if="index ===1">
                    <SearchTabbarDanQu></SearchTabbarDanQu>
                </div>
                <div v-if="index===3">
                    <SearchTabbarShiPin></SearchTabbarShiPin>
                </div>
                <div v-if="index===4">
                 <SearchTabbarGeShou></SearchTabbarGeShou>
                </div>
                <div v-if="index===5">
                    <SearchTabbarZhuanJi></SearchTabbarZhuanJi>
                </div>
                <div v-if="index===6">
                    <SearchTabbarGeDan></SearchTabbarGeDan>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import SearchTabbarZongHe from "./searchTabbarChild/SearchTabbarZongHe";
    import SearchTabbarDanQu from "./searchTabbarChild/SearchTabbarDanQu";
    import SearchTabbarShiPin from "./searchTabbarChild/SearchTabbarShiPin";
    import SearchTabbarGeShou from "./searchTabbarChild/SearchTabbarGeShou";
    import SearchTabbarZhuanJi from "./searchTabbarChild/SearchTabbarZhuanJi";
    import SearchTabbarGeDan from "./searchTabbarChild/SearchTabbarGeDan";
    import {Cell, CellGroup} from 'vant';
    import {Tab, Tabs} from 'vant';

    export default {
        name: "searchTabbar",
        data() {
            return {
                tabbarList: ['综合', '单曲', '云村', '视频', '歌手', '专辑', '歌单', '主播电台', '用户'],

            }
        },
        components: {
            SearchTabbarZongHe,
            SearchTabbarDanQu,
            SearchTabbarShiPin,
            SearchTabbarGeShou,
            SearchTabbarZhuanJi,
            SearchTabbarGeDan,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,

        },
        methods: {
            getbacktop() {
                this.$emit('backtop')
            }
        }
    }
</script>

<style scoped>

</style>
