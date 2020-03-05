import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

// vant样式
// https://youzan.github.io
import 'vant/lib/index.css';
import {
    Toast
} from 'vant';
Vue.use(Toast)


import api from './api/request'
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')