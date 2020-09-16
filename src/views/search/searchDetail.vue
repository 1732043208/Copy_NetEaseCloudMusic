<template>
    <div>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true">
            <div>
                <search @isSearchResultFunc="isSearchResultFunc" :isShow="isSearchResult"></search>
                <div v-if="!isSearchResult">
                    <div><img src="../../assets/jietu.jpg" style="width: 100%;height: auto">
                        <historcal-record @isSearchResultFunc="isSearchResultFunc" ></historcal-record>
                        <hot-search @isSearchResultFunc="isSearchResultFunc"></hot-search></div>
                </div>
                <div v-if="isSearchResult">
                    <search-tabbar @backtop="getbacktop"></search-tabbar>
                </div>
                <search-suggest @isSearchResultFunc="isSearchResultFunc"></search-suggest>
            </div>
        </scroll>
    </div>
</template>

<script>
    import search from "./searchChild/search";
    import hotSearch from "./searchChild/hotSearch"
    import Scroll from "../../components/scroll"
    import historcalRecord from "./searchChild/historcalRecord"
    import searchSuggest from "./searchChild/searchSuggest";
import searchTabbar from "./searchResultChild/searchTabbar";
    export default {
        name: "searchDetail",
        data() {
            return {
                isSearchResult: false,
                backtop:''
            }
        },
        created() {
            console.log(this.$route.meta.keep);
        },
        components: {
            search,
            hotSearch,
            Scroll,
            historcalRecord,
            searchSuggest,
            searchTabbar
        },
        methods: {
            isSearchResultFunc(val) {
                this.isSearchResult = val
            },
            getbacktop(){
             this.$refs.scroll.scrollTo(0,0,400)
            }
        }
    }
</script>

<style scoped>
    .content {
        overflow: hidden;
        position: absolute;
        top: 0px;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 0;
        touch-action: none;
    }
</style>