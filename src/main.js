import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import base from './http/base'
import './assets/common/common.less'

// 视频播放
import vueMiniPlayer from 'vue-mini-player'
import 'vue-mini-player/lib/vue-mini-player.css'
import {Search} from 'vant';

Vue.use(vueMiniPlayer);

// 全局引入vant组件
import {Cell, CellGroup, Tab, Tabs, Dialog, Toast} from 'vant';

Vue.use(Toast);
Vue.use(base);
Vue.use(Search);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Dialog);
Vue.use(Tab);
Vue.use(Tabs);
Vue.config.productionTip = false;

store.state.isLogin = sessionStorage.token !== undefined;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
;
