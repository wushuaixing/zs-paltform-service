<template>
  <el-cascader v-bind="field.other" @change="handleEleCas" @blur="handleEleCasBlur" @visible-change="visibleChange"/>
</template>

<script>
export default {
  name: 'Cascader',
  nameComment: '级联选择器',
  props:{
    field:Object,
    form:Object,
  },
  data() {
    return {
      visible:false,
    };
  },
  methods:{
    visibleChange(val){
      this.visible = val;
    },
    handleEleCasBlur(){
      const dec = this.field.dec;
      const { setFields, getFieldValue } = this.form;

      console.log('handleEleCasBlur',this.visible);
      console.log(getFieldValue(dec[0]));
      if(!getFieldValue(dec[0]) && this.visible){
        setFields({
          [dec[0]]:{
            value:undefined,
            errors:[new Error('主要涉业地区不能为空')]
          }
        })
      }
    },
    handleEleCas(val = []){
      console.log(val,val.toString());
      const dec = this.field.dec;
      this.form.setFieldsValue({
        [dec[0]]:val.toString(),
      });
    },
  }
}
</script>


<style lang='scss'>
.factor-form-wrapper{
  .el-input__icon{
    font-weight: bold;
  }
  .el-input__inner{
    padding-left: 12px;
  }
  .has-error {
    .el-input__inner,.el-input__inner:hover{
      background-color: #fff;
      border-color: #f5222d;
    }
    .el-input__icon{
      color: #f5222d;
    }
  }
}
.el-popper[x-placement^=bottom]{
  margin-top: 5px;
}

</style>
