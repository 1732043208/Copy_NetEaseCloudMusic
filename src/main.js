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
import {Toast} from 'vant';

Vue.use(Toast);

Vue.config.productionTip = false;


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
;
