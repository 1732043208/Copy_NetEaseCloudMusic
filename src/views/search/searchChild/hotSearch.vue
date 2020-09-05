<template>
    <div>
        <p style="font-weight: bold;font-size: 16px;margin-left: 16px;margin-top: 6px">热搜榜</p>
        <div v-for="(item,index) in hots">
            <van-cell-group>
                <van-cell :title-style="{fontWeight:index+1<4?'Bold':'normal',fontSize: '15px'}"
                          :title="item.searchWord"
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
    import {GetHotSearchDetailApi} from "../../../http/all-api";

    export default {
        name: "hotSearch",
        data() {
            return {
                hots: []
            }
        },
        created() {
            this.getHotSearchData();
        },
        methods: {
            getHotSearchData() {
                GetHotSearchDetailApi().then(res => {
                        console.log(res);
                        this.hots = res.data.data
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .rightText {
        font-size: 10px;
        color: #CECECE;
        width: 0px;
        height: 80px;
    }

    .labelText {
        font-size: 10px;
        font-weight: normal;
        color: #979797;
    }
</style>