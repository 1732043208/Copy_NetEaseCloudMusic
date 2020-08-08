<template>
    <div class="registerPage">
        <van-nav-bar
                class="nav"
                title="手机号注册"
                left-arrow
                @click-left="onClickLeft"
        />
        <van-form validate-first>
            <van-field
                    class="telInput"
                    v-model="tel"
                    label="+86"
                    :label-width="30"
                    label-align="center"
                    left-icon="phone-o"
                    placeholder="请输入手机号"
                    input-align="left"
                    name="tel"
                    maxlength=11
                    :border=true
                    :center=true
                    :rules="[{ validator:telTest,
                    message: '请输入手机号' }]"
            />
            <van-field
                    v-model="password"
                    left-icon="bag-o"
                    placeholder="设置登录密码,不小于6位"
                    input-align="left"
                    name="password"
                    :border=true
                    :center=true
                    :rules="[{ validator:padTest,
                    message: '请输入大于6位'}]"
            />
            <van-button class="btn"color="#c2463a" round block type="info" native-type="submit">
                下一步
            </van-button>
        </van-form>
    </div>
</template>

<script>
    // 引入Vant组件库
    import {NavBar, Field, Toast, Form, Button} from 'vant';

    export default {
        name: "register",
        data() {
            return {
                tel: '',
                password: ''
            }
        },
        methods: {
            // 导航左上角按钮，返回上一页
            onClickLeft() {
                this.$router.go(-1);
            },
            // 手机号码正则检测
            telTest(val) {
                return /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/.test(val)
            },
            // 密码不小于6位
            padTest(val) {
                let test = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}/.test(val);
                if (test) {
                    return true;
                } else {
                    Toast('密码不能为纯数字或纯英文字母');
                    return false;
                }
            }
        },
        components: {
            // 注册Vant组件库的组件
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Toast.name]: Toast,
            [Form.name]: Form,
            [Button.name]: Button,
        }
    }
</script>

<style scoped lang="less">
    .registerPage{
        width: 100vw;
        height: 100vh;
    }
.telInput{
    margin-top: 120px;
    margin-bottom: 30px;
}
    .btn{
        margin-top: 85px;

    }
</style>
