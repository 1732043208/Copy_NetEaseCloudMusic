<template>
    <div class="homeMv">
        <van-collapse v-model="activeNames">
            <van-collapse-item class="collapseItem" title="筛选" name="1"
                               :value="`${areaCurrent}-
                                      ${typeCurrent}-
                                       ${orderType}`">
                <div>
                    <div class="area">
                        <p>地区：</p>
                        <p
                                :class="{'current':item===areaCurrent}"
                                @click="filterClick(item,index,0)"
                                v-for="(item,index) in area"
                                :key="index">{{item}}</p>
                    </div>
                    <div class="type">
                        <p>类型：</p>
                        <p
                                :class="{'current':item===typeCurrent}"
                                @click="filterClick(item,index,1)"
                                v-for="(item,index) in type"
                                :key="index">{{item}}</p>
                        <p/>
                    </div>
                    <div class="order">
                        <p>排序：</p>
                        <p
                                :class="{'current':item===orderType}"
                                @click="filterClick(item,index,2)"
                                v-for="(item,index) in order"
                                :key="index">{{item}}</p>
                        <p/>
                        <p/>
                        <p/>
                        <p/>
                        <p/>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
        <scroll
                class="content"
                ref="scroll"
                :pull-up-load="true"
                @pullingUp="pullingUp">
            <div>


                <div class="mvBox" v-for="(item,index) in allMv" :key="index" @click="ToMvDetail(item.id)">
                    <van-image :src="item.cover" alt="" radius="15"/>
                    <p class="durationTime">时长{{item.duration|formatDuring}}</p>
                    <h4 class="desc">{{item.desc}}</h4>
                    <p class="artist">发布者：{{item.artistName}}</p>
                    <van-divider/>
                </div>
            </div>

        </scroll>
    </div>
</template>

<script>
    import scroll from "../../components/scroll";
    import {GetAllMvAPI} from "../../http/all-api";
    import {Cell, Image as VanImage, Divider, Collapse, CollapseItem} from "vant";
    import {createAllMvInfo} from "../../../model/allMvInfo";
    import {formatDuring, unique} from "../../components/common/utils";

    export default {
        name: "homeMv",
        created() {
            this.getAllMv({area: this.areaCurrent, type: this.typeCurrent, order: this.orderType, limit: this.limit});
        },
        data() {
            return {
                allMv: [],
                limit: 30,
                area: ['全部', '内地', '港台', '欧美', '日本', '韩国'],
                areaCurrent: '全部',
                type: ['全部', '官方', '原声', '现场', '网易出品'],
                typeCurrent: '全部',
                order: ['上升最快', '最热', '最新'],
                orderType: '上升最快',
                activeNames: ['0'],

            }
        },

        methods: {
            getAllMv({area, type, order, limit}) {
                this.$toast.loading({
                    message: '加载中',
                    forbidClick: true,
                    duration: 0
                });
                GetAllMvAPI({area, type, order, limit}).then(res => {
                    let result = res.data.data;
                    console.log(result);
                    result.forEach(item => {
                        this.allMv.push(createAllMvInfo(item));
                    });
                    if (this.allMv.length >= 30) {
                        this.allMv = unique(this.allMv);
                        this.$toast.clear();
                        this.$refs.scroll.finishPullUp();
                        this.$refs.scroll.refresh();
                    }
                    this.$toast.clear()

                }).catch(error => {
                    console.log('全部MV获取失败');
                    console.log(error);
                })
            },
            ToMvDetail(id) {
                if (id) {
                    this.$router.push({
                        path: '/music-mv',
                        query: {
                            mvId: id
                        }
                    });
                }
            },
            filterClick(item, index, clickType) {
                switch (clickType) {
                    case 0:
                        this.allMv = [];
                        this.limit = 30;
                        this.areaCurrent = item;
                        this.getAllMv(
                            {
                                area: this.areaCurrent,
                                type: this.typeCurrent,
                                order: this.orderType,
                                limit: this.limit
                            }
                        );
                        break;
                    case 1:
                        this.allMv = [];
                        this.limit = 30;
                        this.typeCurrent = item;
                        this.getAllMv(
                            {
                                area: this.areaCurrent,
                                type: this.typeCurrent,
                                order: this.orderType,
                                limit: this.limit
                            }
                        );
                        break;
                    case 2:
                        this.allMv = [];
                        this.limit = 30;
                        this.orderType = item;
                        this.getAllMv(
                            {
                                area: this.areaCurrent,
                                type: this.typeCurrent,
                                order: this.orderType,
                                limit: this.limit
                            }
                        );
                        break;
                }
            },
            pullingUp() {
                this.limit += 20;
                this.$toast.loading({
                    message: '加载中',
                    forbidClick: true,
                    duration: 0
                });
                this.getAllMv({area: "全部", type: "全部", order: "上升最快", limit: this.limit});
            }
        },
        components: {
            [Cell.name]: Cell,
            [VanImage.name]: VanImage,
            scroll,
            [Divider.name]: Divider,
            [CollapseItem.name]: CollapseItem,
            [Collapse.name]: Collapse
        },
        filters: {
            formatDuring(mss) {
                return formatDuring(mss);
            }
        }
    }

</script>

<style lang="less" scoped>
    .homeMv {
        .content {
            overflow: hidden;
            position: absolute;
            top: 280px;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 0;
            touch-action: none;


            .mvBox {
                position: relative;
                margin: 15px 30px;

                .durationTime {
                    position: absolute;
                    top: 0;
                    left: 10px;
                    color: white;
                    padding: 8px;
                    font-size: 36px;
                    background: rgba(0, 0, 0, 0.2);
                    backdrop-filter: blur(50px);
                    border-radius: 15px;
                }

                .desc {
                    padding: 30px;
                    white-space: pre-wrap;
                    font-size: 44px;
                }

                .artist {
                    padding-left: 30px;
                    padding-bottom: 30px;
                }
            }
        }

        .collapseItem {
            position: relative;
            z-index: 2048;
        }

        .area, .type, .order {
            display: flex;
            justify-content: space-around;
            margin-bottom: 15px;

        }

        .area > p:first-child,
        .type > p:first-child,
        .order > p:first-child {
            color: #c2463a;
            font-size: 40px;
        }

        .current {
            color: #c2463a;
        }
    }
</style>
