<template>
    <div>
        <div class="BoxSecond">
            <div style="height: 30px;margin-top: 4px;">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">相关搜索</span>
            </div>
            <div class="historyFather">
                <div v-for="item in $store.state.searchResultList.sim_query.sim_querys"
                     @click="relevantSearch(item.keyword)"
                     style="background-color:#F3F3F3;font-size: 15px"
                     class="historySon">{{item.keyword}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {GetSearchApi} from "../../../../../../http/all-api";

    export default {
        name: "RelevantSearch",
        methods: {
            relevantSearch(item) {
                GetSearchApi(item, '1018').then(res => {
                    let lists = res.data.result;
                    console.log(res);
                    this.$emit("isSearchResultFunc", true);
                    console.log(this.$store.state.searchResultShow);
                    this.$store.commit("searchResultList", lists);
                    this.$store.commit("searchWordFunc", item);
                    let IsShow = false;
                    this.$store.commit('searchResultShow', IsShow);
                    this.$store.commit('addWord', item);

                    this.$emit('backtop')

                }).catch(error => {

                });
            },
        }
    }
</script>

<style scoped>
    .BoxSecond {
        background-color: #fff;
        padding-top: 30px;
        border-radius: 40px;
        padding-bottom: 40px
    }

    .historyFather {
        margin: 0 6px 0 20px;
        flex-direction: row;
        flex-wrap: wrap;
        display: flex;
    }

    .historySon {
        margin: 12px 12px 6px 12px;
        padding: 12px 30px 12px 30px;
        background-color: #F3F3F3;
        border-radius: 100000px;
        height: 60px;
        white-space: normal;
        text-align: center;
        line-height: 60px;
    }
</style>
