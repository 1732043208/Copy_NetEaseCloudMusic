<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
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
                pullUpLoad: this.pullUpLoad
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
            scrollTo(x, y, time = 300) {
                // 如果this.scroll为空，则不执行后面的代码
                this.scroll && this.scroll.scrollTo(x, y, time)
            },
            // 实现多次上拉加载更多
            finishPullUp() {
                // 上拉加载
                this.scroll && this.scroll.finishPullUp();
            },
            refresh() {
                this.scroll && this.scroll.refresh();
            }
        }
    }
</script>

<style scoped>

</style>
