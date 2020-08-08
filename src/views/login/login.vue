<template>
    <div class="loginPage">
        <img class="logo" src="../../assets/logo.jpg" alt="logo">
        <router-link class="phone-login" to="/phone-login">手机号登录</router-link>
        <router-link class="register" to="/register">注册</router-link>
    </div>
</template>

<script>
    export default {
        name: "login"
    }
</script>

<style scoped lang="less">
    @button-height: 126px;
    .loginPage {
        width: 1080px;
        height: 2248px;
    }

    .logo {
        width: 270px;
        height: 270px;
        display: block;
        margin: 428px auto 220px;
    }

    .phone-login,
    .register {
        width: 970px;
        line-height: @button-height;
        text-align: center;
        border-radius: @button-height/2;
        border: 1px solid;
        color: @theme-color;
        display: block;
        text-decoration: none;
        margin: 0 auto 50px;

    }
</style>
