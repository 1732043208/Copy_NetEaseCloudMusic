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
                    clearable
                    name="tel"
                    maxlength=11
                    :border=true
                    :center=true
                    :rules="[{ validator:telTest,
                    message: '请输入手机号' }]"
            />
            <van-field
                    type="password"
                    v-model="password"
                    left-icon="bag-o"
                    placeholder="设置登录密码,不小于6位"
                    input-align="left"
                    name="password"
                    :border=true
                    :center=true
                    :rules="[{ validator:padTest}]"
            />
            <button class="disabledBtn"
                    :class="{'activeBtn':isNotEmpty}"
                    :disabled="!isNotEmpty"
                    @click="nextBtnClick">下一步
            </button>
        </van-form>

    </div>
</template>

<script>
    // 引入Vant组件库
    import {NavBar, Field, Form, Button} from 'vant';

    import {CheckPhoneAPI} from "../../http/all-api";

    export default {
        name: "register",
        data() {
            return {
                tel: '',
                password: ''
            }
        },
        computed: {
            isNotEmpty() {
                if (this.tel.trim().length > 0 && this.password.trim().length > 0) {
                    return true;
                } else {
                    return false;
                }
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
                    this.$toast('密码不能为纯数字或纯英文字母并且不小于6位');
                    return false;
                }
            },
            nextBtnClick() {
                console.log('点击');
                // 当手机号和密码符合要求时
                if (this.telTest(this.tel) && this.padTest(this.password)) {
                    // 检验手机号是否注册过
                    CheckPhoneAPI(this.tel).then(res => {
                        if (res.data.exist === 1) {
                            this.$toast('手机号已注册');
                        } else {
                            this.$router.push({
                                path: '/captcha',
                                query: {
                                    'phone': this.tel,
                                    'password':this.password
                                }
                            });
                            this.$toast('验证码已发送');

                        }
                    }).catch(error => {
                        console.log(error);
                    });

                }

            }
        },
        components: {
            // 注册Vant组件库的组件
            [NavBar.name]: NavBar,
            [Field.name]: Field,
            [Form.name]: Form,
            [Button.name]: Button,
        }
    }
</script>

<style scoped lang="less">
    @button-height: 120px;
    .nextBtn() {
        display: block;
        width: 90vw;
        line-height: @button-height;
        background-color: @theme-color;
        color: darkgray;
        border-radius: @button-height/2;
        margin: 92px auto 0;
        text-align: center;
        border-color: transparent;
    }

    .registerPage {
        width: 100vw;
        height: 100vh;
    }

    .telInput {
        margin-top: 120px;
        margin-bottom: 30px;
    }

    .activeBtn {
        .nextBtn();
        color: white !important;
    }

    .disabledBtn {
        .nextBtn();
    }
</style>
