<template>
    <div>
        <div class="father" v-if="$store.state.searchResultShow">
            <van-cell-group>
                <van-cell
                        v-for="(item,index) in $store.state.searchResult"
                        :title="item.keyword"
                        :key="index"
                        icon="search"
                        @click="searchsuggest(item.keyword)"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import {GetSearchApi} from "../../../http/all-api";
    import { Cell, CellGroup } from 'vant';

    export default {
        name: "searchSuggest",
        components:{
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup
        },
        methods: {
            searchsuggest(val) {
                console.log(val);
                GetSearchApi(val,'1018').then(res => {
                    let lists = res.data.result;
                    // console.log(lists);
                    // console.log(res);
                    this.$emit("isSearchResultFunc", true);

                    console.log(this.$store.state.searchResultShow);
                    this.$store.commit("searchResultList", lists);
                    let IsShow = false;
                    this.$store.commit('searchResultShow', IsShow);
                    // this.$store.commit('searchWord',val)
                    this.$store.commit('addWord', val);

                    this.$store.state.historyList.unshift(val);
                    let hisList=this.$store.state.historyList;
                    let newarr= Array.from(new Set(hisList));
                    this.$store.commit('historyBianLiList', newarr);
                    this.$store.commit('isSearchShowFunc', true);//改变搜索框背景颜色
                }).catch(error => {

                });

            }
        }
    }
</script>

<style scoped>
    .father {
        z-index: 1000;
        position: absolute;
        top: 10px;
        left: 12%;
        width: 77%;
        box-shadow: 2px 2px 10px #909090;
    }
</style>
