<template>
  <div class="factor-form-wrapper">
    <a-form v-bind="formItemLayout" :form="form" autocomplete="off" class="attest-form">
    </a-form>
  </div>
</template>

<script>
  import { formItemLayout } from "../../common/style";
  export default {
    name: 'FormOfficeInfo',
    nameComment: '要素信息表单-律所基本信息',
    props:{
      userType:{
        type:String,
        default:'lawyer'
      },
      form:{
        type:Object,
      }
    },
    data() {
      return {
        formItemLayout
      };
    },
    created() {
      // this.form = this.$form.createForm(this);
      console.log(this.form);
    },
  }
</script>

<style scoped lang='scss'>

</style>
