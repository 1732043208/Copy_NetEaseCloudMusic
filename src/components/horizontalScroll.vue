<template>
    <div ref="wrapper" class="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from "better-scroll";

    export default {
        name: "horizontalScroll",
        props: {
            probeType: {
                type: Number,
                default() {
                    return 0
                }
            },
            pullUpLoad: {
                type: Boolean,
                default() {
                    return false;
                }
            },
        },
        data() {
            return {
                horizontalScroll: null
            }
        },
        mounted() {
            if (!this.horizontalScroll) {
                this.horizontalScroll = new BScroll(this.$refs.wrapper, {
                    scrollX: true,
                    eventPassthrough: 'vertical', // 忽略竖直方向的滚动
                    // 为了横向滚动时的点击事件不会触发两次，这里的click:false才不会触发两次
                    click: false,
                    tap: true,
                    // 设置2或者3都可以监听滚动
                    probeType: this.probeType,
                    pullUpLoad: this.pullUpLoad,

                });
                // 监听滚动事件

                this.horizontalScroll.on('scroll', (position) => {
                    this.$emit('scroll', position)
                });
                // 监听上拉加载事件
                this.horizontalScroll.on('pullingUp', () => {
                    this.$emit('pullingUp')
                })
            } else {
                this.horizontalScroll.refresh()
            }
        },
        methods: {
            // 实现多次上拉加载更多
            finishPullUp() {
                // 上拉加载
                this.horizontalScroll && this.horizontalScroll.finishPullUp();
            },
            refresh() {
                this.horizontalScroll && this.horizontalScroll.refresh();
            }
        },
    }
</script>

<style scoped lang="less">
    .wrapper {
        width: 100%;
        overflow: hidden;
        white-space: nowrap; /*当子元素超过父元素宽度的时候，不会折行*/

    }
</style>
