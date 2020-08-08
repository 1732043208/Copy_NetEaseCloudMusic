<template>
    <div class="musicMine">
        <h1>我的音乐</h1>

    </div>
</template>

<script>
    import {GetBannerAPI} from "../../http/all-api";
    import Scroll from '../../components/scroll'
    import BScroll from "better-scroll";

    export default {
        name: "music-mine",
        data() {
            return {
                bannerList: [],
            }
        },
        mounted() {
            this.$nextTick(() => {

            });
            GetBannerAPI(1).then(res => {
                if (res.data.banners.length !== 0) {
                    // 将接口返回时轮播图数据解构加入新数组中
                    this.bannerList.push(...res.data.banners);
                }
            }).catch(err => {
                console.log('轮播图网络请求失败');
                console.log(err);
            })
        },
        methods: {
            // 用于初始化“商家实景”的横向滚动效果
            // _initPics() {
            //     // 先判断是否有这个属性
            //     // 这里之所以要设置宽度，是因为.wrapper和.list的宽度一样大
            //     // 当.list的宽度大于.wrapper的宽度，才能横向滚动
            //     let itemWidth = 90 // 这里是设置列表每一项的宽度
            //     let margin = 6
            //     // width是整个列表的宽度
            //     let width = (itemWidth + margin) * 15 - margin
            //     console.log(width);
            //     this.$refs.list.style.width = width + 'px' // 设置.list的宽度的宽度
            //     this.$nextTick(() => {
            //         if (!this.picScroll) {
            //             this.picScroll = new BScroll(this.$refs.wrapper, {
            //                 scrollX: true,
            //                 eventPassthrough: 'vertical' // 忽略竖直方向的滚动
            //             })
            //         } else {
            //             this.picScroll.refresh()
            //         }
            //     })
            // }
        }
    }

</script>

<style scoped lang="less">

</style>
