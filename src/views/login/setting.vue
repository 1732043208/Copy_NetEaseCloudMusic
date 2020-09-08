<template>
    <div class="setting">
        <van-nav-bar
                title="设置"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-button @click="btn" type="primary" size="large">切换账号</van-button>
    </div>
</template>

<script>
    import {Button, NavBar, Dialog} from 'vant'
    import {logoutAPI} from "../../http/all-api";
    import Vue from 'vue';

    export default {
        name: "setting",
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            btn() {
                Dialog.confirm({
                    message: '确定退出当前账号吗',
                })
                    .then(() => {
                        // on confirm
                        logoutAPI().then(res => {
                            this.$store.commit('changeLogin', false);
                            sessionStorage.removeItem('token');
                            console.log(res);
                            this.$toast.success({
                                message: '退出成功'
                            });
                            this.$router.replace({
                                path: '/'
                            })
                        }).catch(error => {
                            console.log(error);
                        })
                    })
                    .catch(() => {
                        // on cancel
                    });

            },

        },
        components: {
            [Button.name]: Button,
            [NavBar.name]: NavBar,
            [Dialog.name]: Dialog
        }
    }
</script>

<style scoped>

</style>
