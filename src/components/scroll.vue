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
            scrollX: {
                type: Boolean,
                default: false
            },
            scrollY:{
                type:Boolean,
                default:true
            },
            // 滚动回弹效果
            bounce:{
                type:Boolean,
                default:true
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
                scrollX: this.scrollX,
                scrollY: this.scrollY,
                bounce: this.bounce
                // eventPassthrough: 'vertical'
                // eventPassthrough: 'horizontal'
            });
            // 监听滚动事件
            this.scroll.on('scroll', (position) => {
                this.$emit('scroll', position)
            });
            this.scroll.on('pullingUp', () => {
                this.$emit('pullingUp')
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
