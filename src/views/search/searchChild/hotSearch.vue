<template>
    <div>
        <p class="title">热搜榜</p>
        <div v-for="(item,index) in hots">
            <van-cell-group>
                <van-cell :title-style="{fontWeight:index+1<4?'Bold':'normal',fontSize: '15px'}"
                          :title="item.searchWord"
                          @click="getHotSearch(item.searchWord)"
                          :value="item.score" :label="item.content" value-class="rightText" label-class="labelText"
                          :border="false">
                    <template #icon><p
                            :style="{color:index+1<4?'#F1494C': '#9D9D9D',fontWeight:index+1<4?'Bold':'normal',fontSize:'16px',marginTop:'10px',marginRight:'10px'}">
                        {{index+1}}</p></template>
                </van-cell>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
    import {GetHotSearchDetailApi, GetSearchApi} from "../../../http/all-api";
    import {Cell, CellGroup} from 'vant';

    export default {
        name: "hotSearch",
        data() {
            return {
                hots: [],
            }
        },
        components: {
            [CellGroup.name]: CellGroup,
            [Cell.name]: Cell
        },
        created() {
            this.getHotSearchData();
        },
        methods: {
            getHotSearchData() {
                GetHotSearchDetailApi().then(res => {
                        // console.log(res);
                        this.hots = res.data.data;

                    }
                )
            },
            getHotSearch(val) {
                GetSearchApi(val, '1018').then(res => {
                    // console.log(res);
                    let lists = res.data.result;
                    console.log(lists);
                    // console.log(lists);
                    // let lists = res;
                    // console.log(lists);
                    // console.log(res);
                    this.$emit("isSearchResultFunc", true);
                    this.$store.commit("searchResultList", lists);

                    this.$store.state.historyList.unshift(val);
                    let hisList = this.$store.state.historyList;

                    let newarr = Array.from(new Set(hisList));

                    this.$store.commit('historyBianLiList', newarr);
                    this.$store.commit('searchWordFunc', val);
                    this.$store.commit('addWord', val);
                    this.$store.commit('isSearchShowFunc', true);//改变搜索框背景颜色
                })
            }
        }
    }
</script>

<style scoped>
    .rightText {
        font-size: 30px;
        color: #CECECE;
        height: 80px;
    }

    .labelText {
        font-size: 34px;
        font-weight: normal;
        color: #979797;
    }

    .title {
        font-weight: bold;
        font-size: 50px;
        margin: 6px 0 20px 40px;
    }
</style>
