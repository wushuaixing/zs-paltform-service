import Vue from 'vue'
import App from './App.vue'
import Antd,{Form} from 'ant-design-vue';
import router from './router'
import store from './plugin/store'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$form = Form

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
