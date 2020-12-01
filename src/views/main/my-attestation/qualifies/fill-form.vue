<template>
  <div>
    <a-form @submit="handleSubmit" v-bind="formItemLayout">
      <a-form-item label="提交日期：">
        <a-input v-decorator="['username']" placeholder="请输入联络人姓名">
        </a-input>
      </a-form-item>
      <a-form-item label="提交日期：" style="margin-bottom:0;">
        <a-form-item :style="{ display: 'inline-block'}" >
          <a-date-picker style="width: 100%" placeholder="搜索范围起始日期"/>
        </a-form-item>
        <span :style="{ display: 'inline-block',marginLeft:'-5px',width:'20px'}">至</span>
        <a-form-item :style="{ display: 'inline-block'}">
          <a-date-picker style="width: 100%" placeholder="搜索范围截止日期"/>
        </a-form-item>
      </a-form-item>
      <a-form-item label="机构类型：">
        <a-select v-decorator="['type']" placeholder="请选择机构类型" style="width: 150px">
          <a-select-option value="1">Option 1</a-select-option>
          <a-select-option value="2">Option 2</a-select-option>
          <a-select-option value="3">Option 3</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">查询</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'FillForm',
  nameComment: '机构或律师（表单填写）',
  data() {
    return {
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      }
    };
  },
}
</script>

<style scoped lang='scss'>

</style>
