<template>
    <div>
        <div class="father" v-if="$store.state.searchResultShow">
            <van-cell-group>
                <van-cell
                        v-for="item in $store.state.searchResult"
                        :title="item.keyword"
                        icon="search"
                        @click="searchsuggest(item.keyword)"/>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import {GetSearchApi} from "../../../http/all-api";

    export default {
        name: "searchSuggest",
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
                    this.$store.commit('niubi', val)
                }).catch(error => {

                });

            }
        }
    }
</script>

<style scoped>
    .father {
        position: absolute;
        top: 140px;
        left: 12%;
        width: 77%;
        box-shadow: 2px 2px 10px #909090;

    }
</style>
