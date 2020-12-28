import Vue from 'vue'
import App from './App.vue'
import Antd, { Form, message } from 'ant-design-vue';
import router from './router'
import store from './plugin/store'
import { install, filter } from "./plugin/library";
import 'ant-design-vue/dist/antd.less';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/public.scss';
import './version';
import './plugin/element';

Vue.use(Antd);
Vue.use(install, filter);
Vue.prototype.$form = Form;
Vue.config.productionTip = false;

message.config({
  top: `47vh`,
  duration: 2,
  maxCount: 3,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
