<template>
  <a-layout>
    <a-layout-sider width="200" :style="siderStyle"><Menu /></a-layout-sider>
    <a-layout style="padding: 80px 16px 16px; margin-left: 200px;">
      <div style="height: 100%">
        <a-layout-content :style="{ background: '#fff', margin: 0, height: '100%' }">
          <router-view/>
        </a-layout-content>
      </div>
    </a-layout>
  </a-layout>
</template>
<script>
import Menu from '../common/menu'
export default {
  data() {
    return {
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
};
</script>
