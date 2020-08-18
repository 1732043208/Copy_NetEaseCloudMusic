<template>
    <div class="captchaPage">
        <Login_nav title="手机号验证"></Login_nav>
        <div class="info">
            <p>您的手机号:+86&nbsp{{this.$route.query.phone}}</p>
            <p>你会收到一条带有验证码的短信，请输入验证码</p>
        </div>
        <div class="captchaNumber">
            <van-password-input
                    :value="captchaNumber"
                    :length="4"
                    :gutter="15"
                    :mask="false"
                    :focused="showKeyboard"
                    @focus="showKeyboard = true"

            />
            <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
                    @blur="showKeyboard = false"
            />
        </div>
    </div>
</template>

<script>
    import Login_nav from "../../components/nav/login-nav";

    // 引入vant组件的验证码框,数字键盘
    import {PasswordInput, NumberKeyboard} from 'vant';

    // 导入api请求方法
    import {SendCaptchaAPI, CheckCaptchaAPI, RegisterAPI, LoginStatusAPI} from "../../http/all-api";
    import {userInfoModel} from "../../../model/userInfo";

    export default {
        name: "captcha",
        data() {
            return {
                captchaNumber: '',
                showKeyboard: true
            }
        },
        mounted() {
            // 发送验证码
            SendCaptchaAPI(this.$route.query.phone).then(res => {
                console.log('发送验证码请求成功');
            }).catch(error => {
                console.log(error);
            })
        },
        methods: {
            // 数字键盘点击事件
            onInput(key) {
                this.captchaNumber = (this.captchaNumber + key).slice(0, 4);
                if (this.captchaNumber.length === 4) {
                    // 验证 验证码
                    CheckCaptchaAPI(this.$route.query.phone, this.captchaNumber)
                        .then(res => {
                            if (res.data.code === 200) {
                                // todo 未检测是否成功
                                // 注册
                                RegisterAPI(
                                    this.captchaNumber,
                                    this.$route.query.phone,
                                    this.$route.query.password,
                                    'SuperSuperJoker'
                                ).then(res => {
                                    console.log('注册成功' + res);
                                    this.$toast.success({message: '注册成功'});
                                    this.$router.replace({
                                        path: '/'
                                    });
                                    // 成功注册后，获取用户信息
                                    LoginStatusAPI().then(res => {
                                        this.$store.state.userInfo = new userInfoModel(res.data.profile);
                                    }).catch(error => {
                                        if (error.status === 301) {
                                            this.$toast('未登录')
                                        }
                                    })
                                }).catch(err => {
                                    console.log(err);
                                    this.$toast(err.data.msg);
                                })
                            }
                        }).catch(err => {
                        console.log(err);
                    })
                }
            },
            onDelete() {
                this.captchaNumber = this.captchaNumber.slice(0, this.captchaNumber.length - 1);
            },
        },
        components: {
            Login_nav,
            [PasswordInput.name]: PasswordInput,
            [NumberKeyboard.name]: NumberKeyboard,
        }
    }
</script>

<style scoped lang="less">
    .captchaPage {
        height: 100vh;
        background-color: #f7f8fa;
    }

    .info {
        margin: 50px;

        p {
            color: #a7a6a7;
        }

    }

    .captchaNumber {
        margin: 30px 50px;
    }
</style>
