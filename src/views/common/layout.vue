<template>
  <div style="height: 100%" id="root-node-wrapper">
    <a-layout style="min-height: 100%" v-if="!loading" class="layout-wrapper">
      <a-layout-header class="header" :style="{ position: 'fixed', zIndex: 99, width: '100%' }">
        <div class="logo" />
        <div class="content" style="color: aliceblue">浙商资产服务商招募管理系统-运营后台</div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" :style="siderStyle">
          <Menu />
        </a-layout-sider>
        <a-layout style="padding: 80px 16px 16px; margin-left: 200px;">
          <div style="height: 100%">
            <a-layout-content :style="{ background: '#fff', margin: 0, height: '100%', }">
              <router-view/>
            </a-layout-content>
          </div>
        </a-layout>
      </a-layout>
    </a-layout>
    <a-spin v-if="loading" class="spin-wrapper" size="large" tip="数据加载中，请稍后..." />
  </div>
</template>
<script>
import Menu from './menu'
export default {
  data() {
    return {
      collapsed: false,
      loading:true,
      siderStyle:{
        position: 'fixed',
        left: 0,
        top:'64px',
        bottom:0,
        overflow:'hidden auto',
        background: '#fff'
      }
    };
  },
  components: {
    Menu
  },
  created() {
    setTimeout(()=>{
      this.loading = false;
    },500)
  },
  mounted() {
    console.log('默认页面：首次加载！');
    console.log('检查校验：判断及检查相关token信息！');
  }
};
</script>

<style>
.layout-wrapper .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.spin-wrapper{
  width: 100%;
  padding-top: 10vh!important;
}
</style>
