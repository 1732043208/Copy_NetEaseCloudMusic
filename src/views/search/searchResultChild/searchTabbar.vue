<template>
    <div>
        <van-tabs :swipeable="true" :background="tabColor" :animated="true" :duration="0.2" :line-width="30"
                  :line-height="6" v-model="tabsIndex" @change="tabBackground">
            <van-tab v-for="(item,index) in tabbarList" :key="index" :title="item">
                <div v-if="index === 0">
                    <SearchTabbarZongHe @backtop="getbacktop" @pushDetail="pushDetail"></SearchTabbarZongHe>
                </div>
                <div v-if="index ===1">
                    <SearchTabbarDanQu></SearchTabbarDanQu>
                </div>
                <div v-if="index===2">
                    <SearchTabbarShiPin></SearchTabbarShiPin>
                </div>
                <div v-if="index===3">
                    <SearchTabbarGeShou></SearchTabbarGeShou>
                </div>
                <div v-if="index===4">
                    <SearchTabbarZhuanJi></SearchTabbarZhuanJi>
                </div>
                <div v-if="index===5">
                    <SearchTabbarGeDan></SearchTabbarGeDan>
                </div>
                <div v-if="index===6">
                    <SearchTabbarDianTai></SearchTabbarDianTai>
                </div>
                <div v-if="index===7">
                    <SearchTabbarUser></SearchTabbarUser>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import SearchTabbarZongHe from "./searchTabbarChild/SearchTabbarZongHe/SearchTabbarZongHe";
    import SearchTabbarDanQu from "./searchTabbarChild/SearchTabbarDanQu/SearchTabbarDanQu";
    import SearchTabbarShiPin from "./searchTabbarChild/SearchTabbarShiPin/SearchTabbarShiPin";
    import SearchTabbarGeShou from "./searchTabbarChild/SearchTabbarGeShou/SearchTabbarGeShou";
    import SearchTabbarZhuanJi from "./searchTabbarChild/SearchTabbarZhuanJi/SearchTabbarZhuanJi";
    import SearchTabbarGeDan from "./searchTabbarChild/SearchTabbarGeDan/SearchTabbarGeDan";
    import SearchTabbarDianTai from "./searchTabbarChild/SearchTabbarDianTai/SearchTabbarDianTai";
    import SearchTabbarUser from "./searchTabbarChild/SearchTabbarUser/SearchTabbarUser"
    import {Cell, CellGroup} from 'vant';
    import {Tab, Tabs} from 'vant';

    export default {
        name: "searchTabbar",
        data() {
            return {
                tabbarList: ['综合', '单曲', '视频', '歌手', '专辑', '歌单', '主播电台', '用户'],
                tabColor: '#f7f7f7',
                tabsIndex: 0
            }
        },
        components: {
            SearchTabbarZongHe,
            SearchTabbarDanQu,
            SearchTabbarShiPin,
            SearchTabbarGeShou,
            SearchTabbarZhuanJi,
            SearchTabbarGeDan,
            SearchTabbarDianTai,
            SearchTabbarUser,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,

        },
        methods: {
            getbacktop() {
                this.$emit('backtop')
            },
            tabBackground() {
                if (this.tabsIndex === 0) {
                    this.tabColor = '#f7f7f7';
                    this.$store.commit('isSearchShowFunc', true);//修改搜索框背景颜色
                } else {
                    this.tabColor = '#ffffff';
                    this.$store.commit('isSearchShowFunc', false);//修改搜索框背景颜色
                }
                console.log(this.tabsIndex);
            },
            pushDetail(val) {
                this.tabsIndex = val
            }
        }
    }
</script>

<style scoped>

</style>
