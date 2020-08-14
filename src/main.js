import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import base from './http/base'
import './assets/common/common.less'


// 全局引入vant组件
import {Toast} from "vant";

Vue.use(Toast);
Vue.use(base);
Vue.config.productionTip = false;

store.state.isLogin = sessionStorage.token !== undefined;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
;
