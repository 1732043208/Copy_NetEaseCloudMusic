<template>
    <div>
        <div class="BoxSecond" style="margin-top: 20px">
            <div style="height: 30px;margin-top: 6px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">用户</span>
            </div>
            <div v-for="item in $store.state.searchResultList.user.users">
                <van-cell>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <img :src="item.avatarUrl" style="width: 60px;height: 60px;border-radius: 50%">
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 10px;left: 14px">
                                <span :style="{color:item.nickname.includes($store.state.addWord)?'#5A6E88':''}">{{item.nickname}}</span>
                            </div>
                        </div>
                    </template>
                    <template #label>
                        <div style="position: relative;top: 5px;left: 14px">
                            <span :style="{color:item.description.includes($store.state.addWord)?'#5A6E88':''}">{{item.description}} </span>
                        </div>
                    </template>
                    <div class="userFocus">+ 关注</div>
                </van-cell>
            </div>
            <div class="BoxSecondMore" style="border-top: 1px solid #f5f6f7" @click="pushDetail(7)">
                <span>{{$store.state.searchResultList.user.moreText}} &gt</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Icon, Button, Card, Tag, Cell, CellGroup, Image as VanImage} from 'vant';
    export default {
        name: "Users",
        components:{
            [Cell.name]:Cell
        },
        methods:{
            pushDetail(val) {
                this.$emit('pushDetail', val)
            },
        }
    }
</script>

<style scoped>
    .BoxSecond {
        background-color: #fff;
        padding-top: 30px;
        border-radius: 40px;
    }

    .BoxSecondMore {
        font-size: 36px;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        color: grey;
    }
    .userFocus {
        width: 170px;
        height: 54px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 54px;
        border: 1px solid #fe5151;
        border-radius: 54px;
        text-align: center;
        font-size: 34px;
        color: #fe5151;
    }
</style>
