<template>
    <div id="app">
        <home-nav v-if="$route.meta.isShow"></home-nav>
        <keep-alive>
            <router-view v-if="$route.meta.isShow"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.isShow"></router-view>
    </div>
</template>
<script>
    import homeNav from './components/nav/home-nav'

    export default {
        components: {
            homeNav
        }
    }
</script>
<style>

</style>
