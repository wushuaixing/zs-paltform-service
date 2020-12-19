<template>
  <a-layout>
    <a-layout-sider width="200" :style="siderStyle"><Menu /></a-layout-sider>
    <a-layout style="padding: 64px 0 0; margin-left: 200px;">
      <a-layout-content :style="{ margin: 0, height: '100%' }">
        <router-view/>
      </a-layout-content>
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
        background: '#fff',
        zIndex:99,
      }
    };
  },
  components: {
    Menu
  },
};
</script>
