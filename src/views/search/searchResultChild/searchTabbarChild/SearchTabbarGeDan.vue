<template>
    <div>
        <div v-for="item in songsList">
            <van-card @click="getSongListData(item.id)">
                <template #thumb><img :src="item.coverImgUrl" style="width: 70px;height: auto"></template>
                <template #desc>
                    <div style="margin-top: 4px">
                        <span> {{item.trackCount+'首'+' by '+item.creator.nickname+','+' 播放'+Math.round(item.playCount/10000*Math.pow(10,1))/Math.pow(10,1)+'万次'}}</span>
                    </div>
                </template>
                <template #title>
                    <div style="font-size: 16px">{{item.name}}</div>
                </template>
            </van-card>
        </div>
    </div>
</template>

<script>
    import {GetSearchApi} from "../../../../http/all-api";
    import {Button, Card, Cell, CellGroup, Icon, Tag} from "vant";

    export default {
        name: "SearchTabbarGeDan",
        data() {
            return {
                songsList: []
            }
        }, components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
        },
        created() {
            GetSearchApi(this.$store.state.addWord, '1000').then(res => {
                this.songsList = res.data.result.playlists
                console.log(this.songsList);

            }).catch(error => {
                console.log(error);
            });
        },
        methods:{
            getSongListData(id) {
                this.$router.push({
                    path: '/daySongList',
                    query: {
                        id: id
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>