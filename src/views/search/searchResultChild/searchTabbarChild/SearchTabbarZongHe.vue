<template>
    <div class="fatherBox">
        <div>
            <van-cell class="BoxFirst"
                      :to="{path:'/singer',query:{id:$store.state.searchResultList.artist.artists[0].id}}">
                <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                <template #icon>
                    <div class="BoxFirstImgFatherBox"
                         :style="{'background-image':'url('+$store.state.searchResultList.artist.artists[0].picUrl+')'}">
                    </div>
                </template>
                <template #title>
                    <div class="BoxFirstBox">
                        <p class="BoxFirstBoxFirstTitle">
                            <span>歌手:</span>
                            <span v-if="$store.state.searchResultList.artist.artists[0].name">{{$store.state.searchResultList.artist.artists[0].name}}</span>
                            <span v-if="$store.state.searchResultList.artist.artists[0].alias.length!==0">{{'('+$store.state.searchResultList.artist.artists[0].alia[0]+')'}}</span>
                        </p>
                        <p class="BoxFirstBoxSecondTitle">
                            专辑:{{$store.state.searchResultList.artist.artists[0].albumSize}}</p>
                    </div>
                </template>
            </van-cell>
        </div>
        <!--        单曲-->
        <div class="BoxSecond">
            <div style="border-bottom: 1px solid #f5f6f7;padding-bottom: 10px">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">单曲</span>
                <van-button round type="info" plain hairline color="#BEBFC0" size="mini"
                            style="width:60px;height: 24px;float: right;margin-right: 10px;display: inline-block;vertical-align: middle">
                    <van-icon name="play-circle-o" color="black" style="margin-top: 2px"/>
                    <span style="color: black">播放</span></van-button>
            </div>

            <div v-for="item in $store.state.searchResultList.song.songs">
                <van-cell
                        @click="getMusicId(item.id)"
                        label-class="labelStyle"
                        title-class="titleStyle">
                    <template #title>
                        <span>{{item.name}}</span>
                        <span class="titleSecond" v-if="item.alia.length!==0"> ({{item.alia[0]}})</span>
                    </template>
                    <template #label>
                    <span v-for="(niubi,index) in item.ar">
                        <span v-if="index !==0">/</span>
                        <span :style="{color:niubi.name===$store.state.addWord?'#5A6E88':''}">{{niubi.name}}</span>
                    </span>
                        <span> - </span>
                        <span :style="{color:item.al.name.includes($store.state.addWord)?'#5A6E88':''}">{{item.al.name}}</span>
                        <span v-if="item.alia.length!==0"> ({{item.alia[0]}})</span>
                    </template>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #right-icon>
                        <img src="../../../../../src/assets/MV.png" alt="" class="mvImg" @click.stop="pushMV(item.mv)"
                             v-if="item.mv !== 0">
                        <van-icon name="ellipsis" class="search-icon" size="18px"/>
                    </template>
                </van-cell>
                <div class="border"></div>
            </div>
            <div class="BoxSecondMore">
                <p @click="pushDetail(1)">
                    <span>查看更多</span>
                    <span :style="{color:$store.state.searchResultList.song.songs[0].ar[0].name.includes($store.state.addWord)?'#9ab4d1':''}">{{$store.state.searchResultList.song.songs[0].ar[0].name}}</span>
                    <span>的歌曲></span>
                </p>
            </div>
        </div>
        <img src="../../../../assets/jietu.png" style="width: 100%;height: auto"/>
        <!--        歌单-->
        <div class="BoxSecond">
            <div style="height: 30px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">歌单</span>
            </div>

            <div v-for="item in $store.state.searchResultList.playList.playLists">
                <van-card @click="getSongListData(item.id)" style="height: 90px">
                    <template #thumb>
                        <van-image :src="item.coverImgUrl" style="width: 76px;height: 76px" lazy-load/>
                    </template>
                    <template #desc>
                        <div style="margin-top: 4px;overflow: hidden;text-overflow: ellipsis">
                            <span> {{item.trackCount+'首'+' by '+item.creator.nickname+','+'播放'+Math.round(item.playCount/10000*Math.pow(10,1))/Math.pow(10,1)+'万次'}}</span>
                        </div>
                    </template>
                    <template #title>
                        <div style="font-size: 16px;overflow: hidden;text-overflow: ellipsis"
                             :style="{color:item.name.includes($store.state.addWord)?'#9ab4d1':''}">{{item.name}}
                        </div>
                    </template>
                    <template #tags>
                        <div v-for="biaoqian in item.officialTags" style="margin-top: 8px">
                            <van-tag plain type="danger"
                                     style="background-color:#FFDCDB;font-size: 12px;float: left;margin-left: 5px">
                                {{biaoqian}}
                            </van-tag>
                        </div>
                    </template>
                </van-card>
                <div class="borderLine"></div>
            </div>

            <div class="BoxSecondMore">
                <p @click="pushDetail(6)">
                    <span>查看更多</span>
                    <span :style="{color:$store.state.searchResultList.song.songs[0].ar[0].name.includes($store.state.addWord)?'#9ab4d1':''}">{{$store.state.searchResultList.song.songs[0].ar[0].name}}</span>
                    <span>的相关歌单></span>
                </p>
            </div>
        </div>
        <img src="../../../../assets/jietu.png" style="width: 100%;height: auto"/>

        <!--        视频-->
        <div class="BoxSecond">
            <div style="height: 30px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">视频</span>
            </div>
            <div v-for="item in $store.state.searchResultList.video.videos">
                <van-card @click="getVideoDetailData(item.vid)">
                    <template #thumb>
                        <van-image :src="item.coverUrl" class="videoImg" lazy-load/>
                        <img src="../../../../../src/assets/play.png"
                             style="position: absolute;left: 50%;top: 24%;width: 22px;opacity: 0.8">
                    </template>
                    <template #title>
                        <div style="font-size: 14px;margin-left: 16px;;margin-top: 4px;margin-bottom: 6px"
                             class="videoLineText">
                            {{item.title}}
                        </div>
                    </template>
                    <template #tags>
                        <span style="margin-left: 16px;">{{item.durationms|formatDuring}}</span>
                        <span> by </span>
                        <span v-for="creator in item.creator">{{creator.userName}}</span>
                    </template>
                </van-card>

                <div class="borderLine"></div>
            </div>

            <div class="BoxSecondMore">
                <p @click="pushDetail(3)">
                    <span>查看更多</span>
                    <span :style="{color:$store.state.searchResultList.song.songs[0].ar[0].name.includes($store.state.addWord)?'#9ab4d1':''}">{{$store.state.searchResultList.song.songs[0].ar[0].name}}</span>
                    <span>的相关视频></span>
                </p>
            </div>
        </div>
        <!--       相关搜索-->
        <div class="BoxSecond" style="margin-top: 20px;padding-bottom: 12px">
            <div style="height: 30px;margin-top: 4px;">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">相关搜索</span>
            </div>
            <div class="historyFather">
                <div v-for="item in $store.state.searchResultList.sim_query.sim_querys"
                     @click="relevantSearch(item.keyword)"
                     style="background-color:#F3F3F3;font-size: 15px"
                     class="historySon">{{item.keyword}}
                </div>
            </div>
        </div>
        <!--               歌手-->
        <div class="BoxSecond" style="margin-top: 20px">
            <div style="height: 30px;margin-top: 6px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">歌手</span>
            </div>
            <div v-for="item in $store.state.searchResultList.artist.artists">
                <van-cell @click="pushSinger(item.id)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-image :src="item.img1v1Url" class="getgold_top_head_img" round/>
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 22px;left: 14px">
                                <span :style="{color:item.name.includes($store.state.addWord)?'#5A6E88':''}">{{item.name}}</span>
                                <span v-for="name in item.alia">{{name}}</span>
                            </div>
                        </div>
                    </template>
                </van-cell>
            </div>
        </div>
        <!--            专辑-->
        <div class="BoxSecond" style="margin-top: 20px;">
            <div style="height: 30px;margin-top: 6px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">专辑</span>
            </div>
            <div v-for="item in $store.state.searchResultList.album.albums">
                <van-cell @click="pushAlbum(item.id)">
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <van-image :src="item.picUrl" style="width: 56px;height: auto;" lazy-load/>
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 6px;left: 12px;font-size: 15px">
                                <span>{{item.name}}</span>
                                <span v-for="name in item.alia">{{name}}</span></div>
                        </div>
                    </template>
                    <template #label>
                        <div style="position: relative;top: 2px;left: 12px;font-size: 12px">
                            <span :style="{color:item.artist.name.includes($store.state.addWord)?'#5A6E88':''}">{{item.artist.name}} </span>
                            <span style="padding-left: 10px"> {{item.publishTime|formatDate}}</span>
                        </div>
                    </template>
                </van-cell>

            </div>
            <div class="BoxSecondMore" style="border-top: 1px solid #f5f6f7" @click="pushDetail(5)">
                <span>{{$store.state.searchResultList.album.moreText}} &gt</span>
            </div>
        </div>
        <!--用户-->
        <div class="BoxSecond" style="margin-top: 20px">
            <div style="height: 30px;margin-top: 6px;border-bottom: 1px solid #f5f6f7">
                <span style="margin-left: 18px;font-weight: bold;font-size: 18px">用户</span>
            </div>
            <div v-for="item in $store.state.searchResultList.user.users">
                <van-cell>
                    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
                    <template #icon>
                        <img :src="item.avatarUrl" style="width: 60px;height: 60px;border-radius: 50%">
                    </template>
                    <template #title>
                        <div>
                            <div style="position: relative;top: 10px;left: 14px">
                                <span :style="{color:item.nickname.includes($store.state.addWord)?'#5A6E88':''}">{{item.nickname}}</span>
                            </div>
                        </div>
                    </template>
                    <template #label>
                        <div style="position: relative;top: 5px;left: 14px">
                            <span :style="{color:item.description.includes($store.state.addWord)?'#5A6E88':''}">{{item.description}} </span>
                        </div>
                    </template>
                    <div class="userFocus">+ 关注</div>
                </van-cell>
            </div>
            <div class="BoxSecondMore" style="border-top: 1px solid #f5f6f7" @click="pushDetail(7)">
                <span>{{$store.state.searchResultList.user.moreText}} &gt</span>
            </div>
        </div>
    </div>
</template>

<script>
    import {Icon, Button, Card, Tag, Cell, CellGroup, Image as VanImage} from 'vant';
    import {formatDuring, formatDate} from "../../../../components/common/utils";
    import {GetSearchApi} from "../../../../http/all-api";

    export default {
        name: "SearchTabbarZongHe",
        created() {
            console.log(this.$store.state.searchResultList);
        },
        methods: {
            getMusicId(musicId) {
                // 音乐id
                console.log(musicId);
                this.$store.commit('changeMusicId', musicId);
                this.musicCheck(musicId);
            },
            getVideoDetailData(vid) {
                this.$router.push({
                    path: '/videoDetail',
                    query: {
                        vid: vid
                    }
                })
            },
            relevantSearch(item) {
                GetSearchApi(item, '1018').then(res => {
                    let lists = res.data.result;
                    console.log(res);
                    this.$emit("isSearchResultFunc", true);
                    console.log(this.$store.state.searchResultShow);
                    this.$store.commit("searchResultList", lists);
                    this.$store.commit("searchWordFunc", item);
                    let IsShow = false;
                    this.$store.commit('searchResultShow', IsShow);
                    this.$store.commit('addWord', item);

                    this.$emit('backtop')

                }).catch(error => {

                });
            },
            getSongListData(id) {
                this.$router.push({
                    path: '/daySongList',
                    query: {
                        id: id
                    }
                })
            },
            pushDetail(val) {
                this.$emit('pushDetail', val)
            },
            //跳转到对应专辑页面
            pushAlbum(id) {
                this.$router.push({
                    path: '/album',
                    query: {
                        id: id
                    }
                })
            },
            //跳转到对应歌手页面
            pushSinger(id) {
                this.$router.push({
                    path: '/singer',
                    query: {
                        id: id
                    }
                })
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
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage
        },
        filters: {
            // 将整数转化成分秒
            formatDuring(second = 0) {
                return formatDuring(second)
            },
            formatDate(time) {
                let date = new Date(time);
                return formatDate(date, 'yyyy.MM.dd')
            }
        }
    }
</script>

<style scoped>
    .fatherBox {
        background-color: #F7F7F7;
        padding: 40px 40px 150px 40px;
    }

    .BoxFirst {
        border-radius: 40px;
        position: relative;
        margin-bottom: 40px;
    }

    .BoxFirstImgFatherBox {
        height: 160px;
        width: 160px;
        background-size: auto 110%;
        border-radius: 80px;
        background-repeat: no-repeat;
        background-position: center center;
    }


    .BoxFirstBox {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 20px;
        border-radius: 40px;
    }

    .BoxSecond {
        background-color: #fff;
        padding-top: 30px;
        border-radius: 40px;
    }

    .BoxSecondMore {
        font-size: 36px;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 30px;
        color: grey;
    }

    .BoxFirstBoxFirstTitle {
        font-weight: 700;
        font-size: 46px;
    }

    .BoxFirstBoxSecondTitle {
        font-size: 38px;
        color: #bbbbbb;
    }

    .titleStyle {
        font-size: 44px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .labelStyle {
        width: 700px;
        font-size: 36px;
        overflow: hidden;
        text-overflow: ellipsis;

    }

    .titleSecond {
        font-size: 40px;
        color: #BEBFC0;
        overflow: hidden;
        text-overflow: ellipsis;
        width: 100px;
    }

    .search-icon {
        position: relative;
        top: 30px;
    }

    .historyFather {
        margin: 0 6px 0 20px;
        flex-direction: row;
        flex-wrap: wrap;
        display: flex;
    }

    .historySon {
        margin: 12px 12px 6px 12px;
        padding: 12px 30px 12px 30px;
        background-color: #F3F3F3;
        border-radius: 100000px;
        height: 60px;
        white-space: normal;
        text-align: center;
        line-height: 60px;
    }

    .getgold_top_head_img {
        height: 180px;
        width: 180px;
        margin-left: 10px;
    }

    .borderLine {
        width: 90%;
        height: 1px;
        background-color: #f5f6f7;
        margin: 0 auto;
    }

    .videoLineText {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .videoImg {
        width: 300px;
        height: auto;
    }

    /*修改vant UI库默认样式*/
    .van-card {
        background-color: #fff;
        height: 240px;
        overflow: hidden;
    }

    .van-card__header {
        height: 60px
    }

    .van-card__content {
        height: 60px;
    }

    .mvImg {
        width: 50px;
        height: 50px;
        margin-top: 30px;
        margin-right: 20px;
    }

    .userFocus {
        width: 170px;
        height: 54px;
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        line-height: 54px;
        border: 1px solid #fe5151;
        border-radius: 54px;
        text-align: center;
        font-size: 34px;
        color: #fe5151;
    }
</style>
