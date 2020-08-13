<template>
    <div class="tab-control">
        <div class="tab-control-item"
             v-for="(item,index) in title"
             :class="{active:currentIndex === index}"
             @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TabControl",
        props: {
            title: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex = index;
                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style scoped>
    .tab-control {
        position: relative;
        height: 60px;
        display: flex;
        text-align: center;
        padding: 10px 0 10px;
        background: white;
        z-index: 200;
    }

    .tab-control-item {
        flex: 1;
        font-size: 40px;

    }

    .active{
        color: #c2463a;
    }
    .active span{
        padding: 5px;
        border-bottom: 10px solid #c2463a;
        border-radius: 5px;
    }
</style>
