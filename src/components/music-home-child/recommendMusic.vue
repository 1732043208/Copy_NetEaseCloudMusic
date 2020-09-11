<!--每日推荐音乐-->
<template>
    <div class="recommendMusic">
        <div class="topTitle">
            <h4>{{recommendMusic.uiElement.subTitle.title}}</h4>
            <btn-more :title="recommendMusic.uiElement.button.text" @click.native="allPlayBtn"></btn-more>
        </div>
        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <div class="box4"
                     v-for="(item,index) in recommendMusic.creatives"
                     :key="index">
                    <van-cell-group :border="false">
                        <van-cell
                                class="mc-cell"
                                :center="true"
                                :border="false"
                                v-for="(value,indey) in item.resources"
                                :key="indey"
                                :label="labelText(value)"
                                :label-class="{'ov':true,'labelTextStyle':isLabelColor,'labelColor':!isLabelColor}"
                                title-class="ov titleText"
                                @click="getMusicId(value.resourceId)">
                            <!--                            :title="value.uiElement.mainTitle.title"-->
                            <template #title>
                                <p class="ov titleText">
                                    {{value.uiElement.mainTitle.title}}
                                    <span class="titleTextName">-&nbsp{{value.resourceExtInfo.artists[0].name}}</span>
                                </p>
                            </template>
                            <template #icon>
                                <van-image
                                        class="leftImage"
                                        width="50" height="50"
                                        radius="5"
                                        :src="value.uiElement.image.imageUrl" alt="">
                                </van-image>
                            </template>
                        </van-cell>
                    </van-cell-group>
                </div>
            </div>
        </horizontal-scroll>
    </div>
</template>

<script>
    // vant导入
    import {Cell, CellGroup, Image as VanImage, Icon} from 'vant';
    import {initScroll} from "../common/mixin";
    import BtnMore from "../common/btnMore";
    import HorizontalScroll from "../horizontalScroll";
    import AudioCom from "../common/audioCom";

    export default {
        name: "recommendMusic",
        mixins: [initScroll],
        props: {
            recommendMusic: {
                type: Object,
                default: {}
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.itemWidth = 53;
                this.itemMargin = 8;
                setTimeout(() => {
                    this.initPics();
                    this.$refs.hScroll.refresh()
                }, 600)
            })
        },

        computed: {
            labelText() {
                return function (value) {
                    if (value.uiElement.subTitle !== undefined) {
                        let str = value.uiElement.subTitle.title.substring(value.uiElement.subTitle.title.length - 3);
                        this.isLabelColor = str !== '人播放';
                        return value.uiElement.subTitle.title
                    } else {
                        return ''
                    }

                    // let allId = [];
                    // console.log(this.recommendMusic);
                    // this.musicInfo.forEach(item => {
                    //     allId.push(item.id);
                    // });
                }
            },
            getLength: {
                get() {
                    return this.$store.state.playList.length + 1
                }
            }

        },
        data() {
            return {
                isLabelColor: true,
            }
        },
        methods: {
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                // this.$store.state.musicIndex = this.$store.state.playList.length;
                this.$store.commit('changeMusicIndex', this.getLength);
                this.musicCheck(musicId);
            },
            allPlayBtn() {
                let allId = [];
                console.log(this.recommendMusic);
                this.recommendMusic.creatives.forEach(value => {
                    value.resources.forEach(item => {
                        allId.push(item.resourceId);
                    })
                });
                this.getMusicId(allId[0]);
                allId = allId.join(',');
                this.$store.state.musicIndex = 0;
                this.$store.dispatch('getMusicUrl', allId);
                this.$store.dispatch('getMusicDetail', allId);
            }
        },
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
            [Icon.name]: Icon,
            BtnMore,
            HorizontalScroll,
            AudioCom,
        }
    }
</script>

<style scoped lang="less">
    .ovtext() {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .recommendMusic {
        margin: 50px 30px;

        audio {
            display: none;
        }

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            text-align: center;
        }

        .list {
            display: flex;
            justify-content: space-between;
            /*flex: 1;*/

            .box4 {
                width: 100vw;
                margin-right: 50px;

                .mc-cell {
                    margin: 30px 15px 30px 0;
                }

                .leftImage {
                    margin-right: 30px;
                }

                .titleText {
                    width: 650px;
                    font-weight: 600;
                    font-size: 38px;

                    .titleTextName {
                        color: #a7a6a7;
                        font-size: 26px;
                    }
                }

                .labelTextStyle {
                    width: 700px;
                    font-size: 30px;
                }

                .labelColor {
                    width: 210px;
                    font-size: 30px;
                    background: rgba(247, 230, 230, 1);
                    padding: 0 7px;
                    color: @theme-color;
                    text-align: center;
                }

            }
        }

        .ov {
            .ovtext();

        }
    }

</style>
