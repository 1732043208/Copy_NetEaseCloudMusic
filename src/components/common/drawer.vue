<template>
    <div
            class="drawer-layout"
            @touchstart="handleTouchStart"
            @touchmove="handleTouchMove"
            @touchend="handleTouchEnd"
            @touchmove.prevent

    >
        <transition name="move1">
            <div
                    ref="drawer_wrap"
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
    import HorizontalScroll from "../horizontalScroll";

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
            },
            // 当手指触摸屏幕时候触发
            handleTouchStart(touch) {
                // 记录开始触摸位置的X轴
                this.startPos = touch.touches[0].pageX;
            },
            // 当手指在屏幕上滑动的时候连续地触发
            handleTouchMove(touch,e) {
                // e.preventDefault(); // 可忽略
                // console.log(touch);
                let touchMove = touch.changedTouches[0].pageX; // 记录移动的位置
                // 移动位置 - 刚开始触摸的位置
                let moveResult = touchMove - this.startPos;

                // 刚开始 moveX = 0
                if (this.moveX > moveResult) { // 判断移动
                    // 当向左滑时，moveResult为负数，判断成立
                    // 保存这次 相减的结果
                    // 举例： 当我先是往左滑，再往右滑时，
                    // 往左滑保存的位置 -20
                    // 突然想往右滑
                    // 这时 moveResult的值就会比 往左滑保存的位置 大！！
                    this.moveX = moveResult;

                    // 因为我css的left选择用 % 作为单位 所有这里要不能超过100
                    // 左滑隐藏 所有需要left = -100%才能隐藏
                    if (this.leftMove > -290) {
                        this.leftMove -= 6;
                        this.$refs.drawer_wrap.style.left = this.leftMove + 'px';
                    }

                } else {
                    // drawer—wrap这个类用了绝对定位，所以left要为0，左边才不会有间隙
                    if (this.leftMove < 0) {
                        this.leftMove += 6;
                        this.$refs.drawer_wrap.style.left = this.leftMove + 'px';
                    } else if (this.leftMove === 0) {
                        // 当leftMove为0时，也就是抽屉完全展开的状态
                        // 所以要重置moveX的值，也就是让最上面的if重新开始判断
                        this.moveX = 0
                    }
                }
            },
            handleTouchEnd(touch) {
                if (this.leftMove <= -100) {
                    this.$store.commit('toggleDrawer');
                    this.$store.state.isShowDrawer = false;
                } else {
                    this.$refs.drawer_wrap.style.left = 0 + 'px';
                }
                // 触摸结束后，初始化全部记录的位置
                this.moveX = 0;
                this.startPos = 0;
                this.leftMove = 0;
            },
        },
        data() {
            return {
                startPos: 0, // 记录开始触摸的X轴位置
                leftMove: 0, // 左边移动了多少
                moveX: 0 // X轴移动
            }
        },
        components: {
            HorizontalScroll
        }
    }
</script>

<style scoped lang="less">
    .drawer-layout {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;


        .drawer-wrap {
            width: 70%;
            height: 100vh;
            position: absolute;
            left: 0;
            z-index: 300;
            background-color: #fff;
            word-break: break-all;
            /*overflow-y: auto;*/
            /*overflow-x: hidden;*/
            /*-webkit-overflow-scrolling: touch;*/
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
        transition: opacity 0.5s;
    }

    /* 显示前或隐藏后的效果 */
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .move1-enter-active, .move1-leave-active {
        transition: all 0.5s;
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
