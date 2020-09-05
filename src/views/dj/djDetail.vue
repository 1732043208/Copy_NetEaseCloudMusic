<template>
    <div class="djDetail">
        <div ref="topNav" class="topNav">
            <van-icon size="24" @click="goBack" name="arrow-left"/>
            <p class="navTitle">电台</p>
        </div>
        <scroll
                class="content1"
                ref="scroll"
                :probe-type="3"
                :bounce="false"
                :pull-up-load="true"
                @scroll="musicListScroll">
            <div>
                <div class="topInfo">
                    <van-image
                            cover
                            width="100vw"
                            height="20rem"
                            :src="djDetail.picUrl"></van-image>
                    <van-cell
                            class="myCell"
                            center
                            :title="djDetail.name"
                            :label="`${djDetail.subCount}已订阅`"
                            title-class="djName"
                            label-class="djLabel">
                    </van-cell>
                </div>
                <div class="bottomInfo">
                    <van-tabs
                            animated
                            v-model="active"
                            swipeable
                            title-active-color="#c2463a">
                        <van-tab title="详情" name="xq">
                            <p class="avatarTitle">主播</p>
                            <van-cell :center="true">
                                <template #icon>
                                    <van-image
                                            round
                                            class="leftImage"
                                            width="45"
                                            height="45"
                                            :src="djDetail.avatarUrl">
                                    </van-image>
                                </template>
                                <template #title>
                                    <span class="custom-title">{{djDetail.nickname}}</span>
                                </template>
                                <template #label>
                                    <p class="labelText">{{djDetail.signature}}</p>
                                </template>
                            </van-cell>
                            <p class="djDetailInfo">电台内容简介</p>
                            <p class="categoryP">分类:<span class="category">{{djDetail.category}}</span></p>
                            <p class="desc">{{djDetail.desc}}</p>
                        </van-tab>
                        <van-tab :title="`节目${programCount}`" name="jm">
                            <van-cell
                                    @click="getMusicId(item.musicId)"
                                    v-for="(item,index) in djPrograms"
                                    :key="index"
                                    :center="true">
                                <template #title>
                                    <p>{{item.name}}</p>
                                </template>
                                <template #label>
                                    <p>
                                        {{item.createTime|formatDate}}
                                        <span v-html="'&#8195;'"></span>
                                        播放次数:{{item.listenerCount}}
                                        <span v-html="'&#8195;'"></span>
                                        时长:{{item.duration|formatDuring}}
                                    </p>
                                </template>
                                <template #icon>
                                    <p class="iconIndex">{{index+1}}</p>
                                </template>
                            </van-cell>
                        </van-tab>
                    </van-tabs>
                </div>
            </div>
        </scroll>
    </div>
</template>

<script>
    import commNav from "../../components/nav/commNav";
    import scroll from "../../components/scroll";
    import {GetDjDetailAPI, GetDjProgramAPI} from "../../http/all-api";
    import {createDjDetailInfo} from "../../../model/djDetailInfo";
    import {createProgramInfo} from "../../../model/programInfo";
    import {Cell, Icon, Image as VanImage, Tab, Tabs} from "vant";
    import {formatDate, formatDuring} from "../../components/common/utils";

    export default {
        name: "djDetail",
        created() {
            this.getDjDetailData(this.rid);
            this.getDjProgramsData(this.rid);
        },
        computed: {
            rid() {
                return this.$route.query.id
            }
        },
        data() {
            return {
                djDetail: {},
                active: 'jm',
                limit: 30,
                programCount: 0,
                djPrograms: [],
            }
        },
        methods: {
            getDjDetailData(id) {
                GetDjDetailAPI(id).then(res => {
                    this.djDetail = createDjDetailInfo(res.data.djRadio);
                    console.log(this.djDetail);
                }).catch(error => {
                    console.log('获取电台详情失败');
                    console.log(error);
                })
            },
            getDjProgramsData(id) {
                GetDjProgramAPI(id, {limit: this.limit, asc: false}).then(res => {
                    let result = res.data.programs;
                    this.programCount = res.data.count;
                    result.forEach(item => {
                        this.djPrograms.push(createProgramInfo(item))
                    });
                    console.log(this.djPrograms);
                }).catch(error => {
                    console.log('获取电台节目失败');
                    console.log(error);
                })
            },
            goBack() {
                this.$router.go(-1)
            },
            getMusicId(musicId) {
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
            },
            musicListScroll(position) {
                let opacity = Math.abs(Math.round((position.y)) / 300);
                this.$refs.topNav.style.background = `rgba(0,0,0,${opacity})`;
            }
        },
        components: {
            commNav,
            scroll,
            [VanImage.name]: VanImage,
            [Cell.name]: Cell,
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Icon.name]: Icon,

        },
        filters: {
            formatDate(time) {
                let times = new Date(time);
                return formatDate(times, 'MM-dd')
            },
            formatDuring(time) {
                return formatDuring(time)
            }
        }
    }
</script>

<style lang="less">
    .djDetail {
        width: 100vw;

        .topNav {
            display: flex;
            position: relative;
            z-index: 200;
            padding: 30px;
            align-items: center;
            color: #f7f8fa;

            .navTitle {
                color: white;
                padding-left: 30px;
            }
        }

        .content1 {
            width: 100vw;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 2;
            touch-action: none;

            .topInfo {
                position: relative;

                .myCell {
                    background-color: rgba(0, 0, 0, .1);
                    width: 100vw;
                    height: 100%;
                    padding-left: 30px;
                    position: absolute;
                    bottom: 10px;

                    .djName {
                        position: absolute;
                        bottom: 100px;
                        font-size: 46px;
                        font-weight: bold;
                        letter-spacing: 2px;
                        color: #f7f8fa;
                    }

                    .djLabel {
                        color: #f7f8fa;
                        font-weight: lighter;
                    }
                }

            }

            .bottomInfo {
                width: 100vw;
                position: relative;
                top: -90px;
                border-radius: 50px;

                .van-tabs__nav {
                    border-top-left-radius: 70px;
                    border-top-right-radius: 70px;

                }

                .avatarTitle {
                    padding: 30px;
                    font-weight: bold;
                }

                .leftImage {
                    padding-right: 30px;
                }

                .custom-title {
                    font-size: 40px;
                    font-weight: bold;
                }

                .labelText {
                    width: 800px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }


                .djDetailInfo {
                    padding: 30px;
                    font-weight: bold;
                    font-size: 40px;
                }

                .categoryP {
                    padding-left: 15px;
                    font-size: 38px;
                    color: #a7a6a7;
                }

                .category {
                    display: inline-block;
                    border: 1px solid #c2463a;
                    font-size: 28px;
                    color: #c2463a;
                    padding: 2px 15px;
                    margin-left: 5px;
                    margin-bottom: 15px;
                }

                .desc {
                    padding-left: 15px;
                    font-size: 38px;
                    color: #a7a6a7;
                }

                .iconIndex {
                    width: 100px;
                    height: 100px;
                    text-align: center;
                    line-height: 100px;
                    font-weight: bold;
                }
            }

        }
    }
</style>
