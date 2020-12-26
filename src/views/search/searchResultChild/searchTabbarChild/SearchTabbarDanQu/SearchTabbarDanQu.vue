<template>
    <div style="padding-bottom: 50px">
        <div v-for="item in songsList">
            <van-cell
                    @click="getMusicId(item.id)"
                    title-class="titleStyle" label-class="labelStyle">
                <template #title>
                    <span>{{item.name}}</span>
                    <span class="titleSecond" v-if="item.alia.length!==0"> ({{item.alia[0]}})</span>
                </template>
                <template #label>
                    <span v-for="(val,index) in item.ar">
                        <span v-if="index !==0">/</span>
                       <span :style="{color:val.name===$store.state.addWord?'#5A6E88':''}">{{val.name}}</span>
                    </span>
                    <span>{{' - '+item.al.name}}</span>
                    <!--                    <span v-if="item.alias.length!==0"> ({{item.alias[0]}})</span>-->
                </template>
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #right-icon>
                    <img src="../../../../../assets/MV.png" alt="" class="mvImg" @click.stop="pushMV(item.mv)"
                         v-if="item.mv !== 0">
                    <van-icon name="ellipsis" class="search-icon" size="18px"/>
                </template>
            </van-cell>
        </div>

    </div>
</template>

<script>
    import {GetSearchApi, GetSingerDanQuApi} from "../../../../../http/all-api";
    import {Cell, CellGroup, List, PullRefresh, Icon, Button} from 'vant';

    export default {
        name: "SearchTabbarDanQu",
        data() {
            return {
                songsList: [],
            }
        },
        methods: {
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
            },
            pushMV(vid) {
                this.$router.push({
                    path: '/music-mv',
                    query: {
                        mvId: vid
                    }
                })
            },

        },
        created() {
            GetSearchApi(this.$store.state.addWord).then(res => {
                //通过搜索关键词，获取到歌手id
                let id = res.data.result.songs[0].artists[0].id;

                GetSingerDanQuApi(id).then(res => {

                    this.songsList = res.data.hotSongs;
                    console.log(this.songsList);
                })
            }).catch(error => {
                console.log(error);
            });

        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [List.name]: List,
            [PullRefresh.name]: PullRefresh,

        }
    }
</script>

<style scoped>
    .titleStyle {
        font-size: 44px;
    }

    .labelStyle {
        width: 500px;
        font-size: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .titleSecond {
        font-size: 44px;
        color: #BEBFC0;
    }

    .search-icon {
        position: relative;
        top: 30px;

    }

    .mvImg {
        width: 50px;
        height: 50px;
        margin-top: 30px;
        margin-right: 20px;
    }
</style>
