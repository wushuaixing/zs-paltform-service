<template>
  <div class="factor-form-wrapper">

  </div>
</template>

<script>
export default {
  name: 'FormOfficeInfo',
  nameComment: '要素信息表单-律所基本信息',
  props:{
    userType:{
      type:String,
      default:'lawyer'
    }
  },
  data() {
    return {};
  },
  created() {
    this.form = this.$form.createForm(this);
  },
}
</script>

<style scoped lang='scss'>

</style>
