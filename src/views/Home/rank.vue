<template>
    <div class="rank">
       <comm-nav title="排行榜"></comm-nav>
        <scroll
                class="content"
                ref="scroll"
                :probe-type="3"
                :pull-up-load="true"
                :bounce="false">
            <div class="rankContent">
                <h4>官方榜</h4>
                <div @click="rankClick(item.id)"
                     class="officialBox"
                     v-for="(item,index) in rankInfo.slice(0,4)"
                     :key="index">
                    <div class="rankPic">
                        <van-image
                                width="6rem"
                                height="6rem"
                                fit="cover"
                                radius="5"
                                :src="item.coverImgUrl"
                        />
                        <p class="updateTime">{{item.updateTime}}</p>
                    </div>
                    <div class="rankInfo">
                        <p v-for="(value,indey) in item.tracks">
                            {{indey+1}}.{{value.first}}—{{value.second}}
                        </p>
                    </div>
                </div>
                <div class="recommendRank">
                    <h4>推荐榜</h4>
                    <van-grid :border="false" column-num="3">
                        <van-grid-item class="rankPic"
                                       v-for="(item,index) in rankInfo.slice(4,33)"
                                       @click="rankClick(item.id)"
                                       :key="index">
                            <div>
                                <van-image
                                        fit="cover"
                                        radius="5"
                                        :src="picUrl(item.coverImgUrl)"
                                />
                                <p class="updateTime">{{item.updateTime}}</p>
                                <p class="rankName">{{item.name}}</p>
                            </div>
                        </van-grid-item>
                    </van-grid>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import scroll from "../../components/scroll";
    import CommNav from "../../components/nav/commNav";
    import {GetTopListAPI} from "../../http/all-api";
    import {createRankInfo} from "../../../model/rankInfo";
    import {Grid, GridItem, Image as VanImage, Icon, ActionSheet} from 'vant';

    export default {
        name: "rank",
        beforeCreate() {
            this.$toast.loading({
                message: '加载中',
                forbidClick: true,
                duration: 0
            });
        },
        created() {
            GetTopListAPI().then(res => {
                let list = res.data.list;
                list.forEach(item => {
                    this.rankInfo.push(createRankInfo(item))
                    this.$toast.clear();
                });
            }).catch(err => {
                console.log(err);
            })
        },
        data() {
            return {
                rankInfo: [],
            }
        },
        computed: {
            picUrl() {
                return function (data) {
                    return data + '?param=150y150'
                }
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            },
            rankClick(id) {
                this.$router.push({
                    path: '/daySongList',
                    query: {id}
                })
            }
        },
        components: {
            scroll,
            CommNav,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            [ActionSheet.name]: ActionSheet,
        }
    }
</script>

<style scoped lang="less">
    .rank {
        width: 100vw;

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
        }

        .rankContent {
            padding-left: 30px;

            h4 {
                margin-bottom: 60px;
            }

            .officialBox {
                display: flex;
                margin-top: 30px;

                .rankPic {
                    position: relative;

                    .updateTime {
                        font-size: 34px;
                        color: white;
                        position: absolute;
                        bottom: 40px;
                        left: 10px;
                    }
                }

                .rankInfo {
                    color: #a7a6a7;
                    padding: 15px 30px;

                    p {
                        padding-bottom: 30px;
                        width: 700px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            }

            .recommendRank {

                h4 {
                    font-size: 50px;
                    margin-top: 30px;
                   margin-left: 30px;
                    margin-bottom: 30px;
                }
                .rankPic {
                    position: relative;

                    .updateTime {
                        font-size: 34px;
                        color: white;
                        position: absolute;
                        bottom: 120px;
                        left: 40px;
                    }

                    .rankName {
                        width: 300px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                }
            }
        }

    }
</style>
