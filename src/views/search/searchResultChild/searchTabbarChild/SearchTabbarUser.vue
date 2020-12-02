<template>
<div>
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
</div>
</template>

<script>
    import {Cell} from 'vant';

    export default {
        name: "SearchTabbarUser",
        components:{
            [Cell.name]: Cell,
        }

    }
</script>

<style scoped>
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
