<template>
    <div class="btnMore">
        {{title}}
        <slot name="icon"></slot>
    </div>
</template>

<script>
    export default {
        name: "btnMore",
        props: {
            title: String
        }
    }
</script>

<style scoped lang="less">

    .btnMore {
        line-height: 55px;
        font-size: 30px;
        border: 1px solid darkgray;
        border-radius: 50px;
        padding: 0 15px;
    }

</style>
