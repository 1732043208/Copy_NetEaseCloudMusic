<template>
    <div class="recommendPage">
        <van-swipe
                class="my-swipe"
                :autoplay="3000"
                indicator-color="#c2463a"
        >
            <van-swipe-item
                    v-for="(item,index) in bannerList"
                    :key="index">
                <div class="bannerBox">
                    <span
                            class="text"
                            :style="{'color':'white',
                            'background-color':'#c2463a'}"
                    >{{item.typeTitle}}</span>
                    <img
                            class="bannerImg"
                            :src="item.pic"
                            @click="BannerImgClick(item)"
                            alt="">

                </div>

            </van-swipe-item>

        </van-swipe>
    </div>
</template>

<script>
    // 引入vant组件的轮播图
    import {Swipe, SwipeItem} from 'vant';

    // 引入网络请求方法
    import {getBannerAPI} from "../../http/all-api";

    export default {
        name: "recommend",
        mounted() {
            getBannerAPI(1).then(res => {
                if (res.data.banners.length !== 0) {
                    // 将接口返回时轮播图数据解构加入新数组中
                    this.bannerList.push(...res.data.banners);
                    console.log(this.bannerList);
                }
            }).catch(err => {
                console.log('轮播图网络请求失败');
                console.log(err);
            })
        },
        data() {
            return {
                bannerList: []
            }
        },
        methods: {
            BannerImgClick(item) {
                if (item.url !== null) {
                    window.location.href = item.url
                } else {
                    this.$toast('暂无数据');
                }
            }
        },
        components: {
            [Swipe.name]: Swipe,
            [SwipeItem.name]: SwipeItem,
        }
    }
</script>

<style scoped lang="less">
    .my-swipe .van-swipe-item {
        margin-top: 30px;
        height: 500px;
    }

    .van-swipe-item {
        position: relative;
    }

    .bannerBox {
        width: 80vw;

        .bannerImg {
            margin: 0 15px 0 20px;
            width: 96vw;
            height: 500px;
        }

        .text {
            display: block;
            position: absolute;
            bottom: 0;
            right: 21px;
            font-size: 34px;
            padding: 10px;
            border-top-left-radius: 15px;
        }
    }


</style>
