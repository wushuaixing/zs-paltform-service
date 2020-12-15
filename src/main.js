import Vue from 'vue'
import App from './App.vue'
import Antd,{Form} from 'ant-design-vue';
import router from './router'
import store from './plugin/store'
import { Cascader } from 'element-ui';
import { install, filter } from "./plugin/library";
import 'ant-design-vue/dist/antd.css';
import './version';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Antd);
Vue.use(Cascader);
Vue.use(install, filter);
Vue.prototype.$form = Form;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
