<template>
  <div class="factor-form-wrapper">

  </div>
</template>

<script>
export default {
  name: 'FormLawyerInfo',
  nameComment: '要素信息表单-律师基本信息',
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
