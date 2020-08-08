<template>
<div class="recommend">
    <div v-for="item in recommend" class="recommend-item">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
</div>
</template>

<script>
    export default {
        name: "HomeRecommendView",
        props:{
            recommend:{
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>

<style scoped>
.recommend{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;
    padding: 5px 0 15px;
    border-bottom: 8px solid #eee;
}
    .recommend-item{
        flex: 1;
    }
    .recommend-item a{
        text-decoration: none;
        color: black;
    }
    .recommend-item img{
        width: 90%;
        height: 67%;
        margin-bottom: 10px;
    }
</style>
