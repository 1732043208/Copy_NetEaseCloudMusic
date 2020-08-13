<template>
    <drawer>
        <div slot="drawer">

            <transition
                    enter-active-class="animate__fadeIn"
                    leave-active-class="animate__fadeIn"
                    :duration="{enter: 200, leave: 400}">

                <h1>哈哈哈哈哈哈哈哈哈哈</h1>
            </transition>

        </div>
        <div slot="content">
            <home-nav v-if="$route.meta.isShow"></home-nav>
            <keep-alive>
                <router-view v-if="$route.meta.isShow"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.isShow"></router-view>
        </div>
    </drawer>

</template>

<script>
    import homeNav from '../nav/home-nav';
    import drawer from "./drawer";

    export default {
        name: "appCom",
        components: {
            homeNav,
            drawer
        }
    }
</script>

<style scoped lang="less">

</style>
