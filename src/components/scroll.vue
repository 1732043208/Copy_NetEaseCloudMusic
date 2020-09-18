<template>
    <div class="wrapper" ref="wrapper">

        <slot></slot>

    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        name: "Scroll",
        props: {
            // 是否开启滚动监听 0 不开启
            probeType: {
                type: Number,
                default() {
                    return 0
                }
            },
            // 上拉加载
            pullUpLoad: {
                type: Boolean,
                default() {
                    return false;
                }
            },
            // 滚动回弹效果
            bounce: {
                type: Boolean,
                default() {
                    return true;
                }
            },
            // 下拉刷新
            pullDownRefresh: {
                type: Object,
                default() {
                    return {
                        threshold: 0,
                        stop: 0
                    }
                }
            }
        },
        data() {
            return {
                scroll: null,
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper, {
                click: true,
                tap: true,
                // 设置2或者3都可以监听滚动
                probeType: this.probeType,
                pullUpLoad: this.pullUpLoad,
                bounce: this.bounce,
                pullDownRefresh: this.pullDownRefresh
                // eventPassthrough: 'vertical'
                // eventPassthrough: 'horizontal'
            });
            // 监听滚动事件
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            });
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
            });
            this.scroll.on('pullingDown', () => {
                this.$emit('pullingDown');
            })
        },
        methods: {
            scrollTo() {
                this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
            },
            // 实现多次上拉加载更多
            finishPullUp() {
                // 上拉加载
                this.scroll && this.scroll.finishPullUp();
            },
            // 多次下来刷新
            finishPullDown() {
                // 上拉加载
                this.scroll && this.scroll.finishPullDown();
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            },
            scrollToElement() {
                this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
            },
        }
    }
</script>

<style scoped>
    .wrapper {
        width: 100%;
        /*height: 0;*/
        overflow: hidden;
        white-space: nowrap; /*当子元素超过父元素宽度的时候，不会折行*/

    }
</style>
