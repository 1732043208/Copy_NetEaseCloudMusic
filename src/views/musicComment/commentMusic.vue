<template>
    <div class="commentMusic">
      <comm-nav title="评论"></comm-nav>
    </div>
</template>

<script>
    import CommNav from "../../components/nav/commNav";
    export default {
        name: "commentMusic",
        created() {
          console.log(this.$route.query.musicName);
          console.log(this.$route.query.songer);
          console.log(this.$route.query.musicPic);
        },
        components:{
            CommNav
        }
    }
</script>

<style scoped lang="less">

</style>
