<template>
    <div>
        <div v-for="item in this.videos">
            <van-card @click="getVideoDetailData(item.vid,item.type)">
                <template #thumb>
                    <van-image :src="item.coverUrl" style="width: 130px;height: auto" lazy-load />
                    <span style="position: absolute;left: 85px;color: white">{{Math.round(item.playTime/10000*Math.pow(10,1))/Math.pow(10,1)}}万</span>
                </template>
                <template #title>
                    <div style="font-size: 14px;margin-left: 46px;white-space: pre-wrap;margin-top: 4px;margin-bottom: 6px">
                        {{item.title}}
                    </div>
                </template>
                <template #tags>
                    <span style="margin-left: 46px;">{{item.durationms|formatDuring}}</span>
                    <span> by </span>
                    <span v-for="creator in item.creator">{{creator.userName}}</span>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
    import {Icon} from "vant";
    import {Button} from 'vant';
    import {Card} from 'vant';
    import {Tag,Image as VanImage} from 'vant';
    import {formatDuring} from "../../../../components/common/utils";
    import {Cell, CellGroup} from 'vant';
    import {GetSearchApi} from "../../../../http/all-api";

    export default {
        name: "SearchTabbarShiPin",
        data() {
            return {
                videos: []
            }
        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]:VanImage
        },
        created() {
            GetSearchApi(this.$store.state.addWord, '1014').then(res => {
                this.videos = res.data.result.videos;
                console.log(res);

            }).catch(error => {
                console.log(error);
            });
        },
        filters: {
            // 将整数转化成分秒
            formatDuring(second = 0) {
                return formatDuring(second)
            },

        },
        methods: {
            getVideoDetailData(vid, type) {
                if (type === 1) {
                    this.$router.push({
                        path: '/videoDetail',
                        query: {
                            vid: vid
                        }
                    })
                } else if (type === 0) {
                    this.$router.push({
                        path: '/music-mv',
                        query: {
                            mvId: vid
                        }
                    })
                }
            },
        }
    }
</script>

<style scoped>

</style>
