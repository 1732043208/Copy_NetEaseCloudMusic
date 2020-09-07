<template>
    <div>
        <div v-if="$store.state.historyList.length!==0">
            <van-cell title="历史记录" style="padding-top: 0" title-class="title">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <van-icon name="delete" class="delete-icon" @click="deleteIcon" size="18px"/>
                </template>
            </van-cell>
            <div class="historyFather">
                <div v-for="(item,index) in $store.state.historyList" class="historySon" @click="historysearch(item)"><p
                        style="font-size: 14px">{{item}}</p></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Icon} from 'vant';
    import {Dialog} from 'vant';
    import {GetSearchApi} from "../../../http/all-api";
    import { Cell, CellGroup } from 'vant';

    export default {
        name: "historcalRecord",
        data() {
            return {}
        },
        methods: {
            deleteIcon() {
                Dialog.confirm({
                    title: '确定清空全部历史记录？',
                })
                    .then(() => {
                        this.$store.commit('historyClean');
                        // on confirm
                    })
                    .catch(() => {
                        // on cancel
                    });
            },
            historysearch(item) {
                GetSearchApi(item,'1018').then(res => {
                    let lists = res.data.result;

                    console.log(res);
                    this.$emit("isSearchResultFunc", true);
                    console.log(this.$store.state.searchResultShow);
                    this.$store.commit("searchResultList", lists);
                    this.$store.commit("guanjianci", item);
                    let IsShow = false;
                    this.$store.commit('searchResultShow', IsShow)

                }).catch(error => {

                });
            }
        },
        components: {
            [Icon.name]: Icon,
            [Dialog.Component.name]: Dialog.Component,
            [Cell.name]:Cell,
            [CellGroup.name]:CellGroup
        },
    }
</script>

<style scoped>
    .title {
        font-weight: bolder;
        font-size: 50px;
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