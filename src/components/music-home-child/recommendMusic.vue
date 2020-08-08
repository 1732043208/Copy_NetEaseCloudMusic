<template>
    <div v-if="Object.keys(recommendMusic).length!==0" class="recommendMusic">
        <div class="topTitle">
            <h4>{{recommendMusic.uiElement.subTitle.title}}</h4>
            <btn-more :title="recommendMusic.uiElement.button.text"></btn-more>
        </div>
        <div class="box4"
             v-for="(item,index) in recommendMusic.creatives"
             :key="index">
            <van-cell-group :border="false">
                <van-cell
                        :center="true"
                        :border="false"
                        v-for="(value,indey) in item.resources"
                        :key="indey"
                        :title="value.uiElement.mainTitle.title"
                        value="内容"
                        :label="labelText(value)"
                        label-class="ov"
                        title-class="ov"
                />

            </van-cell-group>
        </div>
    </div>
</template>

<script>
    // vant导入
    import {Cell, CellGroup} from 'vant';
    import BtnMore from "../common/btnMore";

    export default {
        name: "recommendMusic",
        props: {
            recommendMusic: {
                type: Object,
                default: {}
            }
        },
        computed: {
            labelText() {
                return function (value) {
                    console.log(value.uiElement.subTitle);
                    if (value.uiElement.subTitle !== undefined) {
                        console.log(value.uiElement.subTitle.title);
                        return value.uiElement.subTitle.title
                    } else {
                        return ''
                    }
                }

            }
        },
        components: {
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup,
            BtnMore,
        }
    }
</script>

<style scoped lang="less">
    .recommendMusic {
        margin: 50px 30px;

        .topTitle {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            text-align: center;
        }
    }
    .ov{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>
