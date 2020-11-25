<template>
  <div>
    <div class="bread-crumb-wrapper">
      <a-breadcrumb>
        <a-breadcrumb-item>招商管理</a-breadcrumb-item>
        <a-breadcrumb-item>招商项目管理</a-breadcrumb-item>
        <a-breadcrumb-item>招商项目详情</a-breadcrumb-item>
      </a-breadcrumb>
      <div class="bread-crumb-slot">{{ elements }}</div>
    </div>
    <div style="padding: 16px">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { eventBus } from '@/plugin/tools/event-bus';
export default {
  name: 'Investment',
  data() {
    return {
      routerState:'toReview',
      elements:"",
    };
  },
  methods:{
    createEle(ele){
      if(ele) this.elements =ele;
    }
  },
  created() {
    eventBus.$on('investmentSlot',this.createEle())
    // console.log(this.$route);
  },
  beforeDestroy() {
    eventBus.$off('investmentSlot',this.createEle())
  }
}
</script>

<style scoped>
  .bread-crumb-wrapper{
    padding: 16px;
    position: relative;
  }
  .bread-crumb-wrapper .bread-crumb-slot{
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 1;
  }
</style>
