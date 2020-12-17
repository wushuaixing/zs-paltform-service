<template>
  <div class="register-wrapper">
    <div class="register-container">
      注册页面}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  nameComment: '注册页面',
  data() {
    return {};
  },
}
</script>

<style scoped lang='scss'>
.register-wrapper{
  background-color: $background-base;
  height: 100vh;
  display: flex;
  .register{
    &-container{
      width: 402px;
      height: 512px;
      background: #FFFFFF;
      box-shadow: 4px 6px 15px 0 rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      margin: auto;
    }
  }
}
</style>
