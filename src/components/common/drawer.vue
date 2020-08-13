<template>
    <div
            class="drawer-layout">
        <transition name="move1">
            <div
                    v-show="isShowDrawer"
                    class="drawer-wrap">
                <!--            抽屉里的内容-->
                <slot name="drawer">

                </slot>
            </div>
        </transition>

        <div class="content-wrap">
            <transition name="fade">
                <div
                        v-show="isShowDrawer"
                        class="drawer-mask"
                        @click="clockDrawer"></div>
            </transition>
            <!--            抽屉外的内容-->
            <slot name="content"></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "drawer",
        computed: {
            isShowDrawer: {
                get() {
                    return this.$store.state.isShowDrawer
                }
            }
        },
        methods: {
            clockDrawer() {
                this.$store.commit('toggleDrawer');
            }
        }
    }
</script>

<style scoped lang="less">
    .drawer-layout {
        width: 100vw;
        height: 100vh;


        .drawer-wrap {
            width: 70%;
            height: 100vh;
            position: absolute;
            z-index: 300;
            color: pink;
            background-color: #fff;

        }

        .drawer-mask {
            position: absolute;
            z-index: 299;
            width: 100vw;
            height: 100vh;
            // 动画最终效果
            background-color: rgba(0, 0, 0, 0.4);
        }
    }

    /* 动画开始 过度效果 enter是 隐藏->显示 leave是 显示->隐藏 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 1s;
    }

    /* 显示前或隐藏后的效果 */
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .move1-enter-active, .move1-leave-active {
        transition: all 1s;
    }

    /* 显示前或隐藏后的效果 */
    .move1-enter, .move1-leave-to {
        transform: translateX(-100%);
    }

    /*.drawerWarp-enter-active, .drawerWarp-leave-active {*/
    /*    transition: width 5s;*/
    /*}*/

    /*!* 显示前或隐藏后的效果 *!*/
    /*.drawerWarp-enter, .drawerWarp-leave-to {*/
    /*    width: 0;*/
    /*}*/

</style>
