<template>
    <div class="nav">
        <van-icon
                class="icon"
                color="#fff"
                name="arrow-left"
                @click="iconClick"
        />
        <p class="title">{{title}}</p>
    </div>
</template>

<script>
    import {Icon} from 'vant'

    export default {
        name: "login-nav",
        props: {
            title: {
                type: String,
                default() {
                    return '';
                }
            }
        },
        methods:{
            iconClick(){
                this.$router.go(-1);
            }
        },
        components: {
            [Icon.name]: Icon
        }
    }
</script>

<style scoped lang="less">
    .nav {
        display: flex;
        background-color: @theme-color;

        .title {
            flex: 1;
            color: white;
            line-height: 120px;
            text-align: center;

        }

        .icon {
            padding-left: 15px;
            line-height: 120px;

        }
    }
</style>
