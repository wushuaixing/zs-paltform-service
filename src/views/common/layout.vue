<template>
  <div style="height: 100%" id="root-node-wrapper">
    <a-layout style="min-height: 100%" v-if="!loading" class="layout-wrapper">
      <a-layout-header class="header-wrapper" :style="{ position: 'fixed', zIndex: 99, width: '100%' }">
        <a-icon class="header-icon" type="codepen"/>
        <span class="header-title">浙商资产服务商招募管理系统-运营后台</span>
        <div class="header-info">
          <a-icon type="bell" />
          <a-dropdown :trigger="['click']" placement="bottomRight" size="middle">
            <a-menu slot="overlay" >
              <a-menu-item key="1"> <a-icon type="user" />1st menu item </a-menu-item>
              <a-menu-item key="2"> <a-icon type="user" />2nd menu item </a-menu-item>
              <a-menu-item key="3"> <a-icon type="user" />3rd item </a-menu-item>
            </a-menu>
            <a-button type="link" icon="down">Hi，访问者</a-button>
          </a-dropdown>
        </div>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" :style="siderStyle">
          <Menu />
        </a-layout-sider>
        <a-layout style="padding: 80px 16px 16px; margin-left: 200px;">
          <div style="height: 100%">
            <a-layout-content :style="{ background: '#fff', margin: 0, height: '100%' }">
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

<style lang="scss">
.layout-wrapper {
  .header{
    &-wrapper{
      padding: 0 20px;
    }
    &-icon{
      margin-right: 15px;
      font-size: 20px;
      color: #fff;
    }
    &-title{
      color: #fff;
      font-size: 16px;
    }
    &-info{
      float: right;
    }
  }
}
.spin-wrapper{
  width: 100%;
  padding-top: 10vh!important;
}
</style>
