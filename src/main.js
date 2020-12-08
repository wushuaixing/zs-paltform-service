import Vue from 'vue'
import App from './App.vue'
import Antd,{Form} from 'ant-design-vue';
import router from './router'
import store from './plugin/store'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false;
Vue.use(Antd);
Vue.prototype.$form = Form

const Version = 'v1.0.0';
const BetaNumber = '.1';
const info = `Version：${Version}${BetaNumber ? `-beta${BetaNumber}` : ''}`;
window.CurrentVersions = info;
if (window.location.protocol === 'http:') {
  console.info(info);
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
