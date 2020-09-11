<template>
    <div>
        <form action="/">
            <div v-if="$store.state.addWord===''">
                <van-search
                        v-model="value"
                        :show-action="true"
                        :placeholder="this.$store.state.guanjianci"
                        @search="onSearch"
                        @input="onInput"
                        @blur="onBlur"
                        @focus="onFocus"
                        :clearable="false"
                >
                    <template #left>
                        <van-icon size="22" @click="goBack" color="black" name="arrow-left" style="margin-right: 10px"/>
                    </template>
                    <template #action>
                        <van-icon size="22" color="black" name="search" style="position: relative;top: 6px"
                                  @click="onSearch"/>
                    </template>
                    <template #right-icon>
                        <van-icon size="22" color="black" name="cross" @click="cleanLabel"/>
                    </template>
                </van-search>
            </div>
            <div v-if="$store.state.addWord!==''">
                <van-search
                        v-model="$store.state.addWord"
                        :show-action="true"
                        :placeholder="this.$store.state.guanjianci"
                        @search="onSearch"
                        @input="onInput"
                        @blur="onBlur"
                        @focus="onFocus"
                        :clearable="false"
                >
                    <template #left>
                        <van-icon size="22" @click="goBack" color="black" name="arrow-left" style="margin-right: 10px"/>
                    </template>
                    <template #action>
                        <van-icon size="22" color="black" name="search" style="position: relative;top: 6px"
                                  @click="onSearch"/>
                    </template>
                    <template #right-icon>
                        <van-icon size="22" color="black" name="cross" @click="cleanLabel"/>
                    </template>
                </van-search>
            </div>
        </form>
    </div>
</template>
<script>
    import {GetSearchGuanJianCiAPI, GetSearchSuggestApi, GetSearchApi} from "../../../http/all-api";
    import {Icon} from 'vant';
    import { Cell, CellGroup } from 'vant';
    import { Search } from 'vant';
    export default {
        name: "search",
        props: {
            isShow: Boolean,
        },
        data() {
            return {
                value: '',
                historyLists: [],
                list2: [],
            };
        },
        created() {
            this.getSearchData();
            if (this.$store.state.addWord !== '') {
                this.value = this.$store.state.addWord
            }
        },
        components: {
            [Icon.name]: Icon,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup,
            [Search.name]:Search
        },
        methods: {
            //确定搜索时触发
            onSearch(val) {
                if (this.value.replace(/(^\s*)|(\s*$)/g, "") === "") {
                    this.value = this.$store.state.guanjianci;
                    // console.log('哈哈');
                }
                GetSearchApi(this.value,'1018').then(res => {
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
                    let hisList=this.$store.state.historyList;
                   let newarr= Array.from(new Set(hisList));
                    this.$store.commit('historyBianLiList', newarr);

                    this.$store.commit('searchWordFunc',this.value)
                    this.$store.commit('addWord', val)

                }).catch(error => {
                    console.log(error);
                });
                //点击搜索按钮之后，关闭推荐列表
                let IsShow = false;
                this.$store.commit('searchResultShow', IsShow)

            },
            //输入框获得焦点时触发
            onFocus() {
                if (this.value !== '') {
                    let IsShow = true;
                    this.$store.commit('searchResultShow', IsShow)
                }
            },
            //输入框内容变化时触发
            onInput() {
                if (this.value.replace(/(^\s*)|(\s*$)/g, "") !== "") {
                    GetSearchSuggestApi(this.value, 'mobile').then(res => {
                        const result = res.data.result.allMatch;
                        this.$store.commit('searchResult', result);
                        let IsShow = true;
                        let Value = this.value;
                        this.$store.commit('searchResultShow', IsShow, Value);
                        // console.log(res);
                    }).catch(error => {
                        // console.log(error);
                    })
                } else {
                    let IsShow = false;
                    let Value = this.value;
                    this.$store.commit('searchResultShow', IsShow, Value);
                }
            },
            // 输入框失去焦点时触发
            onBlur() {
                let IsShow = false;
                this.$store.commit('searchResultShow', IsShow)
            },
            goBack() {
                if (this.isShow) {
                    this.$emit("isSearchResultFunc", false);
                    this.$store.commit('cutWord');
                    this.value=''
                } else {
                    this.$router.go(-1);
                    this.$store.commit('cutWord');
                }
            },
            cleanLabel() {
                this.$store.state.addWord===''?this.value = '':  this.$store.commit('cutWord');

            },
            getSearchData() {
                GetSearchGuanJianCiAPI().then(res => {
                    // console.log(res);
                    this.$store.state.guanjianci = res.data.data.realkeyword
                }).catch(error => {
                    console.log('关键词失败');
                    // console.log(error);
                })
            }
        },
    }
</script>

<style scoped>

</style>
