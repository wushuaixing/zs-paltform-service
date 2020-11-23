<template>
  <div>
    <a-breadcrumb style="padding: 16px">
      <a-breadcrumb-item>招商管理</a-breadcrumb-item>
      <a-breadcrumb-item>招商项目管理</a-breadcrumb-item>
      <a-breadcrumb-item>招商项目详情</a-breadcrumb-item>
    </a-breadcrumb>
    <div style="padding: 16px">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Investment',
  data() {
    return {
      routerState:'toReview'
    };
  },
  created() {
    console.log(this.$route);
  }
}
</script>

<style scoped>

</style>
