<template>
    <div class="appCom">
        <drawer ref="drawer1">
            <div slot="drawer">
                <scroll
                        class="content"
                        ref="scroll"
                        :probe-type="3"
                        :pull-up-load="true"
                        @scroll="drawerScroll">

                    <transition
                            enter-active-class="animate__fadeIn"
                            leave-active-class="animate__fadeIn"
                            :duration="{enter: 200, leave: 400}">

                    </transition>
                    <div class="content1">
                        <div v-if="!isLogin" class="topContent">
                            <p>还未登录，请登录</p>
                            <van-button
                                    to="/login"
                                    @click="loginBtnClick"
                                    class="loginBtn"
                                    color="#c2463a"
                                    round
                                    type="info">立即登录
                            </van-button>
                        </div>
                        <div v-if="isLogin" class="topContent">
                            <van-cell :center="true">
                                <template #icon>
                                    <van-image
                                            round
                                            class="leftImage"
                                            width="35"
                                            height="35"
                                            :src="userInfo.avatarUrl" alt="">
                                    </van-image>
                                </template>
                                <template #title>
                                    <span class="custom-title">{{userInfo.userName}}</span>
                                </template>
                                <template #right-icon>
                                    <van-button
                                            :disabled="isSignIn"
                                            @click="SignBtn"
                                            color="#c2463a"
                                            round
                                            class="qdBtn"
                                            size="mini "
                                            type="primary">
                                        {{isSignIn?'已签到':'签到'}}
                                    </van-button>
                                </template>
                            </van-cell>
                        </div>
                        <div class="mineFun">
                            <van-grid>
                                <van-grid-item @click="mineFunClick" icon="envelop-o" text="我的消息"/>
                                <van-grid-item @click="mineFunClick" icon="friends-o" text="我的好友"/>
                                <van-grid-item @click="mineFunClick" icon="wap-home-o" text="个人主页"/>
                                <van-grid-item @click="mineFunClick" icon="shop-collect-o" text="个性装扮"/>
                            </van-grid>
                        </div>
                        <div class="bottomContent">
                            <van-cell-group>
                                <van-cell

                                        class="cellItem"
                                        size="large"
                                        :center="true"
                                        v-for="(item,index) in cellItem1"
                                        :icon="item.icon"
                                        :value="item.title"
                                        :key="index"
                                        value-class="cellText"
                                        @click="cellItemClick(index)"
                                />
                            </van-cell-group>
                            <div style="margin: 30px 0">
                                <van-divider/>
                            </div>
                            <van-cell-group>
                                <van-cell
                                        class="cellItem"
                                        size="large"
                                        :center="true"
                                        v-for="(item,index) in cellItem2"
                                        :icon="item.icon"
                                        :value="item.title"
                                        :key="index"
                                        value-class="cellText"
                                />
                            </van-cell-group>
                        </div>
                    </div>
                </scroll>
            </div>
            <div slot="content">
                <home-nav v-if="$route.meta.isShow"></home-nav>
                <keep-alive>
                    <router-view v-if="$route.meta.isShow"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.isShow"></router-view>
                <music-play v-if="isMusicPlay" :music-id.sync="$store.state.musicId"></music-play>
                <!--                <router-view v-if="$route.meta.isShow"></router-view>-->
            </div>
        </drawer>
    </div>

</template>

<script>
    import scroll from "../scroll";
    import homeNav from '../nav/home-nav';
    import drawer from "./drawer";
    import {Divider, Button, Grid, GridItem, Cell, CellGroup, Image as VanImage} from 'vant'
    import {LoginStatusAPI, SignInAPI} from "../../http/all-api";
    import {userInfoModel} from "../../../model/userInfo";
    import musicPlay from "./musicPlay";

    export default {
        name: "appCom",
        created() {
            LoginStatusAPI().then(res => {
                console.log(res);
                this.$store.state.userInfo = new userInfoModel(res.data.profile)
                console.log(this.$store.state.userInfo);
            }).catch(error => {
                if (error.status === 301) {
                    this.$toast('未登录')
                }
            })
        },
        computed: {
            isLogin: {
                get() {
                    return this.$store.state.isLogin
                },
                set(nv) {
                    return this.$store.state.isLogin = nv
                }
            },
            isMusicPlay() {
                return this.$store.state.musicId !== null
            },
            userInfo: {
                get() {
                    return this.$store.state.userInfo
                }
            }
        },
        data() {
            return {
                isSignIn: false,
                cellItem1: [
                    {
                        icon: 'setting-o',
                        title: '设置'
                    }, {
                        icon: 'hot-sale',
                        title: '演出'
                    }, {
                        icon: 'cart-o',
                        title: '商城'
                    }, {
                        icon: 'location-o',
                        title: '附近的人'
                    }, {
                        icon: 'volume-o',
                        title: '口袋彩铃'
                    }
                ],
                cellItem2: [
                    {
                        icon: 'balance-list-o',
                        title: '我的订单'
                    }, {
                        icon: 'underway-o',
                        title: '定时停止播放'
                    }, {
                        icon: 'scan',
                        title: '扫一扫'
                    }, {
                        icon: 'bulb-o',
                        title: '音乐闹钟'
                    }
                ]
            }
        },
        methods: {
            loginBtnClick() {
                this.$store.commit('toggleDrawer');
            },
            mineFunClick() {
                this.$store.commit('toggleDrawer');
                if (this.$store.state.isLogin) {
                    console.log('已经登录，跳转到xxx页面');
                } else {
                    this.$toast('请先登录');
                    setTimeout(() => {
                        this.$router.push({
                            path: '/login'
                        })
                    }, 300)
                }
            },
            drawerScroll(position) {
                this.$refs.drawer1.moveX = 0;
                this.$refs.drawer1.startPos = 0;
                this.$refs.drawer1.leftMove = 0;
            },
            cellItemClick(index) {
                switch (index) {
                    case 0:
                        this.$router.push({
                            path: '/setting'
                        });
                        this.$store.commit('toggleDrawer');
                        break;
                    case 1:
                        console.log('打印1');
                }
            },
            SignBtn() {
                SignInAPI().then(res => {
                    console.log(res);
                    this.$toast.success({
                        message: '签到成功'
                    });
                    this.isSignIn = true;
                }).catch(error => {
                    console.log('签到失败');
                    error.loginBtnClick()
                })
            }
        },
        components: {
            scroll,
            homeNav,
            drawer,
            musicPlay,
            [Divider.name]: Divider,
            [Button.name]: Button,
            [Grid.name]: Grid,
            [GridItem.name]: GridItem,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,

        }
    }
</script>

<style scoped lang="less">
    .ovtext() {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .appCom {
        width: 100vw;
        height: 100vh;

        .content {
            /*width: 100vw;*/
            /*height: 100%;*/
            overflow: hidden;
            position: absolute;
            top: 0;
            bottom: 0;
            z-index: 0;
            touch-action: none;
        }

        .content1 {
            padding-top: 50px;
            text-align: center;
        }

        .topContent {
            margin-left: 50px;
            font-size: 34px;
            color: rgb(75, 75, 75);

            .loginBtn {
                margin-top: 30px;
                padding: 0 100px;
            }

            .qdBtn {
                font-size: 30px;
                margin-right: 30px;
                padding: 0 30px;
            }

            .custom-title {
                font-weight: bold;
            }
        }

        .mineFun {
            width: 70vw;
            margin-top: 30px;
        }

        .bottomContent {
            .cellItem {
                padding: 50px 30px;
            }

            .cellText {
                padding-left: 20px;
                font-size: 40px;
            }
        }
    }
</style>
