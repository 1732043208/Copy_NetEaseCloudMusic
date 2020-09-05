<template>
    <div ref="topNav" class="topNav">
        <van-icon size="22" @click="goBack" name="arrow-left"/>
        <p class="navTitle">{{title}}</p>
    </div>
</template>

<script>
    import {Icon} from 'vant'

    export default {
        name: "commNav",
        props:{
          title:String
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
        },
        components: {
            [Icon.name]: Icon
        }
    }
</script>

<style scoped lang="less">

    .topNav {
        display: flex;
        padding: 30px;
        align-items: flex-start;
        background-color: white;

        .navTitle {
            padding-left: 32px;
            letter-spacing: 3px;
            font-weight: bold;

        }
    }
</style>
