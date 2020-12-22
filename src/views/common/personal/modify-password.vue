<template>
  <div class="personal-main">
    <div class="container">
      <a-modal :bodyStyle="{display:'flex',justifyContent:'center'}" :centered="true" :maskStyle="{background: 'rgba(0, 0, 0, 0.5)'}" v-model="visible" title="修改登录密码" @ok="handleOk">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="原密码" prop="name">
            <a-input placeholder="请输入原密码" v-model="form.oldPwd" />
          </a-form-model-item>
          <a-form-model-item ref="name" label="新密码" prop="name">
            <a-input placeholder="请输入长度6-20位，同时包含数字和字母密码" v-model="form.newPwd" />
          </a-form-model-item>
          <a-form-model-item ref="name" label="确认密码" prop="name">
            <a-input placeholder="请再次输入登录密码" v-model="form.confirmPwd" />
          </a-form-model-item>
        </a-form-model>
        <button slot="footer" class="save-btn">保存</button>
        <button slot="footer" class="cancel-btn">取消</button>
      </a-modal>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      form: {
        oldPwd: "",
        newPwd: "",
        confirmPwd: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur",
          },
        ],
      },
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
    .save-btn{
        width: 60px;
        height: 32px;
        background: #CCCCCC;
        border-radius: 2px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #FFFFFF;
        line-height: 20px;
        border: none;
    }
    .cancel-btn{
        width: 60px;
        height: 32px;
        background: #FFFFFF;
        border-radius: 2px;
        border: 1px solid #D9D9D9;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
        margin-left: 10px;
    }
</style>