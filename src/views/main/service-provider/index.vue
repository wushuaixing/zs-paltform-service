<template>
  <div>
     <a-breadcrumb style="padding: 16px">
      <a-breadcrumb-item>服务商管理</a-breadcrumb-item>
      <a-breadcrumb-item v-if="routerState==='toReview'">待审查</a-breadcrumb-item>
      <a-breadcrumb-item v-if="routerState==='beStorage'">已入库</a-breadcrumb-item>
    </a-breadcrumb>
    <div style="padding: 16px">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceProvider',
  data() {
    return {
      routerState:'toReview'
    };
  },
}
</script>

<style scoped>

</style>
