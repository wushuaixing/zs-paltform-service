<template>
  <div class="personal-main">
    <div class="container" ref="container">
      <a-modal
        :bodyStyle="{ display: 'flex', justifyContent: 'center' }"
        :centered="true"
        :getContainer="()=>$refs.container"
        :maskStyle="{ background: 'rgba(0, 0, 0, 0.5)' }"
        v-model="visible"
        title="修改登录密码"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="原密码" prop="oldPassword">
            <a-input placeholder="请输入原密码" v-model="form.oldPassword" />
          </a-form-model-item>
          <a-form-model-item label="新密码" prop="newPassword">
            <a-input
              placeholder="请输入长度6-20位，同时包含数字和字母密码"
              v-model="form.newPassword"
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
        <button slot="footer" class="cancel-btn" @click="cancel">取消</button>
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
        newPassword: "",
        oldPassword: "",
        confirmPwd: "",
      },
      rules: {
        oldPwd: [
          {
            required: true,
            message: "请输入原密码",
            trigger: "blur",
          },
        ],
        newPwd: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur",
          },
        ],
        confirmPwd: [
          {
            required: true,
            message: "Please input Activity name",
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
    cancel(){
      this.visible = false;
    }
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
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  margin-left: 10px;
}
</style>