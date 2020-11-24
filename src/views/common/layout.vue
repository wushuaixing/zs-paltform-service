<template>
  <a-layout id="components-layout-demo-top-side-2" style="min-height: 100%">
    <a-layout-header class="header" :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <div class="content" style="color: aliceblue">浙商资产服务商招募管理系统-运营后台</div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" :style="{ position: 'fixed', left: 0,top:'64px',bottom:0,overflow:'hidden auto',background: '#fff' }">
        <Menu />
      </a-layout-sider>
      <a-layout style="padding: 80px 16px 16px; margin-left: 200px;">
        <MainView />
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import MainView from '../main';
import Menu from './menu'
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: {
    MainView,
    Menu
  }
};
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
</style>
