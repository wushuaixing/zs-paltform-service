<template>
  <div class="personal-main">
    <div class="container">
      <a-modal
        :bodyStyle="{ display: 'flex', justifyContent: 'center' }"
        :centered="true"
        :maskStyle="{ background: 'rgba(0, 0, 0, 0.5)' }"
        v-model="visible"
        title="设置登录密码"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="登录密码" prop="setPwd">
            <a-input
              placeholder="请输入长度6-20位，同时包含数字和字母密码"
              v-model="form.setPwd"
            />
          </a-form-model-item>
          <a-form-model-item label="确认密码" prop="confirmPwd">
            <a-input
              placeholder="请再次输入登录密码"
              v-model="form.confirmPwd"
            />
          </a-form-model-item>
        </a-form-model>
        <button slot="footer" class="save-btn">保存</button>
        <button slot="footer" class="cancel-btn">取消</button>
      </a-modal>
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
export default {
  data() {
    //自定义密码设置是否有空格校验
    const blankSpaceCheck = (rule, value, callback) => {
      const reg = /^[^ ]+$/;
      if (!reg.test(value)) {
        callback("• 不支持空格");
      }
      callback();
    };
    return {
      visible: false,
      form: {
        setPwd: "",
        confirmPwd: "",
      },
      countdown: null,
      rules: {
        setPwd: [
          {
            required:true,
            validator: "",
            message: "• 长度6-20位",
            trigger: "change",
          },
          {
            validator: "",
            message: "• 同时包含字母和数字",
            trigger: "change",
          },
          {
            validator: blankSpaceCheck,
            message: "• 不支持空格",
            trigger: "change",
          },
        ],
        confirmPwd: [
          {
            required: true,
            message: "请输入正确的手机号",
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
  },
};
</script>

<style lang="scss" scoped>
.save-btn {
  width: 60px;
  height: 32px;
  background: #cccccc;
  border-radius: 2px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 20px;
  border: none;
}
.cancel-btn {
  width: 60px;
  height: 32px;
  background: #ffffff;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-left: 10px;
}
</style>