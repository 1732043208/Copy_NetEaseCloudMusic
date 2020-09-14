<template>
    <div class="homeNav">
        <div class="left">
            <van-icon
                    size="26"
                    name="wap-nav"
                    badge="99"
                    @click="leftIconClick"
            />
        </div>
        <div class="center">
            <van-icon :color="activeColor2" size="26" name="wap-home-o" class="home" @click="centerIconClick(1)"/>
            <van-icon :color="activeColor3" size="26" name="video-o" class="video" @click="centerIconClick(2)"/>
        </div>
        <div class="right">
            <van-icon size="26" name="search" @click="rightIconClick"/>
        </div>
    </div>
</template>

<script>
    import {Icon} from 'vant'

    export default {
        name: "home-nav",
        data() {
            return {
                currentIndex: 1
            }
        },
        computed: {
            activeColor2() {
                return this.currentIndex === 1 ? '#c2463a' : '#a7a6a7'
            },
            activeColor3() {
                return this.currentIndex === 2 ? '#c2463a' : '#a7a6a7'
            }
        },
        methods: {
            leftIconClick() {
                console.log('左边图标');
                this.$store.commit('toggleDrawer');
            },
            centerIconClick(index) {
                this.currentIndex = index;
                if (this.currentIndex === 1) {
                    this.$router.push({
                        path: '/'
                    })
                } else if (this.currentIndex === 2) {
                    this.$router.push({
                        path: '/home-mv'
                    })
                }
            },
            rightIconClick() {
                console.log('右边图标');
                this.$router.push({
                    path: '/SearchDetail'
                });
                    this.$store.commit('cutWord');
            }

        },
        components: {
            [Icon.name]: Icon
        }
    }
</script>

<style scoped lang="less">
    .homeNav {
        position: relative;
        height: 100px;
        display: flex;
        padding: 25px;
        background-color: #fff;
        z-index: 200;

        .left {
            flex: 1;
        }

        .center {
            flex: 2;

            .home {
                margin-left: 80px;
            }

            .video {
                margin-left: 80px;
            }
        }
    }
</style>
