<template>
  <div style="height: 100%" id="root-node-wrapper">
    <a-layout style="min-height: 100%" v-if="!loading" class="layout-wrapper">
      <a-layout-header class="header-wrapper" :style="{ position: 'fixed', zIndex: 99, width: '100%' }">
        <a-icon class="header-icon" type="codepen"/>
        <span class="header-title">浙商资产服务商招募管理系统</span>
        <a-menu theme="dark" mode="horizontal" :default-selected-keys="[selectedKey]"
                :style="{ lineHeight: '64px',display:'inline-block',verticalAlign: 'top',height:'64px' }">
          <a-menu-item key="a">
            <router-link to="/">我的</router-link>
          </a-menu-item>
          <a-menu-item key="b">
            <router-link to="/center">服务项目招商中心</router-link>
          </a-menu-item>
        </a-menu>
        <div class="header-info">
          <a-icon type="bell" class="header-info-icon"/>
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
      <router-view/>
    </a-layout>
    <a-spin v-if="loading" class="spin-wrapper" size="large" tip="数据加载中，请稍后..." />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      selectedKey:'a'
    };
  },
  components: {
  },
  created() {
    const { pathname } = window.location;
    if(/center/.test(pathname))this.selectedKey='b';
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
.root-node-wrapper{

}
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
      margin-right: 15px;
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
