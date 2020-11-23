<template>
  <div style="height: 100%">
<!--    <a-breadcrumb style="margin: 16px 0">-->
<!--      <a-breadcrumb-item>Home</a-breadcrumb-item>-->
<!--      <a-breadcrumb-item>List</a-breadcrumb-item>-->
<!--      <a-breadcrumb-item>App</a-breadcrumb-item>-->
<!--    </a-breadcrumb>-->
    <a-layout-content :style="{ background: '#fff', margin: 0, minHeight: '100%', }">
      <router-view/>
    </a-layout-content>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  data() {
    return {
      collapsed: false,
    };
  },
  mounted() {
    console.log('默认页面：首次加载！');
  }
}
</script>

<style scoped>

</style>
