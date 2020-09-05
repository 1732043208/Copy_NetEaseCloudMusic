<template>
    <div class="Dj">
        <comm-nav title="电台推荐"></comm-nav>
        <scroll class="content">
            <div>
                <p class="title">今日推荐电台</p>
                <div class="info" v-if="djList.length!==0">
                    <van-grid :border="false" column-num="3">
                        <van-grid-item
                                @click="ToDjDetail(item.rid)"
                                class="rankPic"
                                v-for="(item,index) in djList"
                                :key="index">
                            <div>
                                <van-image
                                        fit="cover"
                                        radius="5"
                                        width="6.5rem"
                                        height="6.5rem"
                                        :src="item.picUrl"
                                />
                                <p class="category">{{item.category}}</p>
                                <p class="name">{{item.name}}</p>
                            </div>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
        </scroll>

    </div>
</template>

<script>
    import commNav from "../../components/nav/commNav";
    import scroll from "../../components/scroll";
    import {GetDjRecommendAPI} from "../../http/all-api";
    import {createDjInfo} from "../../../model/djInfo";
    import {Grid, GridItem, Icon, Image as VanImage} from "vant";

    export default {
        name: "dj",
        created() {
            this.getDjData()
        },
        data() {
            return {
                djList: [],
            }
        },
        methods: {
            getDjData() {
                GetDjRecommendAPI().then(res => {
                    let result = res.data.djRadios;
                    result.forEach(item => {
                        this.djList.push(createDjInfo(item))
                    });
                    console.log(this.djList);
                }).catch(error => {
                    console.log('推荐电台请求失败');
                    console.log(error);
                })
            },
            ToDjDetail(id) {
                console.log(id);
                this.$router.push({
                    path: '/dj-detail',
                    query: {
                        id
                    }
                })
            }
        },
        components: {
            commNav,
            scroll,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
        }
    }
</script>

<style scoped lang="less">
    .Dj {
        .title {
            padding: 30px;
            font-weight: bold;
        }

        .content {
            width: 100vw;
            /*height: 92%;*/
            overflow: hidden;
            position: absolute;
            top: 150px;
            left: 0;
            bottom: 0;
            z-index: 0;
            touch-action: none;

            .info {
                .rankPic {
                    position: relative;

                    .category {
                        padding: 5px 10px;
                        background-color: rgba(0, 0, 0, .5);
                        font-size: 30px;
                        color: white;
                        position: absolute;
                        bottom: 110px;
                        left: 30px;
                    }

                    .name {
                        width: 300px;
                        font-size: 36px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }

    }
</style>
