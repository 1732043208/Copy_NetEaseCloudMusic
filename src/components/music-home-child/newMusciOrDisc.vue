<template>
    <div class="newMusicOrDisc">
        <div class="topTitle">
            <h4>
                <span @click="showNewMusic" :class="{'notSelectColor':!isShowMusic}">{{newMusic[0].uiElement.mainTitle.title}}</span>
                |&nbsp<span @click="showNewMusic" :class="{'notSelectColor':isShowMusic}">{{newDisc[0].uiElement.mainTitle.title}}</span>
            </h4>
            <btn-more
                    :title="isShowMusic?
                    newMusic[0].uiElement.button.text
                    :
                    newDisc[0].uiElement.button.text"></btn-more>
        </div>
        <horizontal-scroll ref="hScroll">
            <div ref="list" class="list">
                <!--                新歌-->
                <div v-show="isShowMusic" class="box2"
                     v-for="(item,index) in newMusic"
                     :key="index">
                    <van-cell-group :border="false">
                        <van-cell
                                class="mc-cell"
                                :center="true"
                                :border="false"
                                v-for="(value,indey) in item.resources"
                                :key="indey"
                                :label="value.uiElement.subTitle.title"
                                label-class="ov"
                                title-class="ov titleText"
                                @click="getMusicId(value.resourceId)">
                            <!--                            :title="value.uiElement.mainTitle.title"-->
                            <template #title>
                                <p class="ov titleText">
                                    {{value.uiElement.mainTitle.title}}
                                    <span v-if="value.resourceExtInfo.songData.alias.length!==0" class="titleAlias">
                                        ({{value.resourceExtInfo.songData.alias[0]}})
                                    </span>
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
                <div v-show="!isShowMusic" class="box2"
                     v-for="(item,index) in newDisc"
                     :key="index+3"
                >
                    <van-cell-group :border="false">
                        <van-cell
                                class="mc-cell"
                                :center="true"
                                :border="false"
                                v-for="(value,indey) in item.resources"
                                :key="indey+5"
                                :label="value.uiElement.subTitle.title"
                                label-class="ov"
                                title-class="ov titleText"
                        >
                            <!--                            :title="value.uiElement.mainTitle.title"-->
                            <!--                            @click="getMusicId(value.resourceId)"-->
                            <template #title>
                                <p class="ov titleText">
                                    {{value.uiElement.mainTitle.title}}
                                    <!--                                    <span v-if="value.resourceExtInfo.songData.alias.length!==0" class="titleAlias">-->
                                    <!--                                        ({{value.resourceExtInfo.songData.alias[0]}})-->
                                    <!--                                    </span>-->
                                    <!--                                    <span class="titleTextName">-&nbsp{{value.resourceExtInfo.artists[0].name}}</span>-->
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
        name: "newMusciOrDisc",
        mixins: [initScroll],
        props: {
            newMusic: {
                type: Array,
                default: []
            },
            newDisc: {
                type: Array,
                default: []
            },
        },
        mounted() {
            this.$nextTick(() => {
                this.itemWidth = 25;
                this.itemMargin = 5;
                setTimeout(() => {
                    this.initPics();
                    this.$refs.hScroll.refresh()
                }, 600)
            })
        },
        data() {
            return {
                isShowMusic: true,
            }
        },
        methods: {
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
            },
            showNewMusic() {
                this.isShowMusic = !this.isShowMusic;
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

    .newMusicOrDisc {
        margin: 50px 30px;

        audio {
            display: none;
        }

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            text-align: center;

            .notSelectColor {
                font-size: 36px;
                color: #a7a6a7;
            }
        }

        .list {
            display: flex;
            justify-content: space-between;
            /*flex: 1;*/

            .box2 {
                width: 100vw;
                margin-right: 50px;

                .mc-cell {
                    margin: 30px 15px 30px 0;
                }

                .leftImage {
                    margin-right: 30px;
                }

                .titleText {
                    width: 700px;
                    font-weight: 600;
                    font-size: 38px;

                    .titleTextName {
                        color: #a7a6a7;
                        font-size: 26px;
                    }

                    .titleAlias {
                        color: #a7a6a7;
                        font-size: 36px;
                    }
                }

                .labelTextStyle {
                    width: 500px;
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
