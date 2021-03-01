<template>
  <a-layout>
    <a-layout-sider :width="width" :style="siderStyle">
      <Menu @change="toggleCollapsed"/>
    </a-layout-sider>
    <a-layout :style="layoutStyle">
      <a-layout-content :style="{ margin: 0, height: '100%' }">
        <router-view/>
      </a-layout-content>
    </a-layout>
		<Element/>
	</a-layout>
</template>
<script>
import Menu from '../common/menu';
import Element from './element';
export default {
  data() {
    return {
      width:200,
      siderStyle:{
        position: 'fixed',
        left: 0,
        top:'64px',
        bottom:0,
        // overflow:'hidden auto',
        background: '#fff',
        zIndex:99,
      }
    };
  },
  methods:{
    toggleCollapsed(status){
      this.width = status ? 80 : 200;
    }
  },
  components: {
    Menu,
	  Element
  },
  computed:{
    layoutStyle:function () {
      return {
        padding:'64px 0 0',
        marginLeft:`${this.width}px`
      }
    }
  }
};
</script>
