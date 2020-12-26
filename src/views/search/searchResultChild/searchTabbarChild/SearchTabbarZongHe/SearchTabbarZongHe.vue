<template>
    <div class="fatherBox">
        <!--推荐歌手-->
        <recommend-singer></recommend-singer>
        <!--单曲-->
        <single-song @pushDetail="pushDetail"></single-song>
        <!--歌单-->
        <song-list @pushDetail="pushDetail"></song-list>
        <!--视频-->
        <videos @pushDetail="pushDetail"></videos>
        <!--相关搜索-->
        <relevant-search></relevant-search>
        <!--歌手-->
        <singer></singer>
        <!--专辑-->
        <album @pushDetail="pushDetail"></album>
        <!--用户-->
       <users @pushDetail="pushDetail"></users>
    </div>
</template>

<script>
    import {Icon, Button, Card, Tag, Cell, CellGroup, Image as VanImage} from 'vant';
    import RecommendSinger from "./ZongHeChildComps/RecommendSinger";
    import SingleSong from "./ZongHeChildComps/SingleSong";
    import SongList from "./ZongHeChildComps/SongList";
    import videos from "./ZongHeChildComps/videos";
    import RelevantSearch from "./ZongHeChildComps/RelevantSearch";
    import Singer from "./ZongHeChildComps/Singer";
    import Album from "./ZongHeChildComps/Album";
    import Users from "./ZongHeChildComps/Users";

    export default {
        name: "SearchTabbarZongHe",
        created() {
            console.log(this.$store.state.searchResultList);
        },
        methods: {
            //接收子组件传递的参数，改变当前活跃tabbar页面
            pushDetail(val) {
                this.$emit('pushDetail', val)
            },
        },
        components: {
            [Icon.name]: Icon,
            [Button.name]: Button,
            [Card.name]: Card,
            [Tag.name]: Tag,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            [VanImage.name]: VanImage,
            RecommendSinger,
            SingleSong,
            SongList,
            videos,
            RelevantSearch,
            Singer,
            Album,
            Users
        },
    }
</script>

<style scoped>
    .fatherBox {
        background-color: #F7F7F7;
        padding: 40px 40px 150px 40px;
    }

</style>
