<template>
    <div class="registerPage">
        <van-nav-bar
                class="nav"
                title="手机号登录"
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
                    type="password"
                    left-icon="bag-o"
                    placeholder="请输入密码"
                    input-align="left"
                    name="password"
                    :border=true
                    :center=true
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

    //导入md5加密密码
    import md5 from 'js-md5';
    //导入api请求方法
    import {PhoneLoginAPI} from "../../http/all-api";
    import {userInfoModel} from "../../../model/userInfo";

    export default {
        name: "phone-login",
        data() {
            return {
                tel: '',
                password: ''
            }
        },
        computed: {
            isNotEmpty() {
                return this.tel.trim().length > 0 && this.password.trim().length > 0;
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

            nextBtnClick() {
                // 使用md5加密 密码
                let md5pad = md5(this.password);
                this.$toast.loading({
                    message: '登录中',
                    forbidClick: true,
                    duration: 0
                });
                PhoneLoginAPI(this.tel, md5pad).then(res => {
                    console.log(res.data);
                    if (res.data.code === 200) {
                        this.$toast.clear();
                        this.$toast.success({
                            message: '登录成功',
                            duration: 1000
                        });
                        console.log('手机登录请求成功');
                        this.$store.state.userInfo = new userInfoModel(res.data.profile)
                        console.log(this.$store.state.userInfo);
                        this.$router.push({
                            path: '/'
                        })
                    } else {
                        this.$toast.clear();
                        this.$toast({
                            message: res.data.message,
                            duration: 1000
                        })
                    }
                }).catch(error => {
                    this.$toast.clear();
                    console.log(error);
                    this.$toast({
                        message: error.data.message,
                        duration: 1000
                    })
                })
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
    .registerPage {
        width: 100vw;
        height: 100vh;
    }

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

    .telInput {
        margin-top: 120px;
        margin-bottom: 30px;
    }

    .btn {
        margin-top: 85px;

    }

    .activeBtn {
        .nextBtn();
        color: white !important;
    }

    .disabledBtn {
        .nextBtn();
    }
</style>

