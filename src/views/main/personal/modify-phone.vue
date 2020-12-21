<template>
  <div class="personal-main">
    <div class="container">
      <a-modal :bodyStyle="{display:'flex',justifyContent:'center'}" :centered="true" :maskStyle="{background: 'rgba(0, 0, 0, 0.5)'}" v-model="visible" title="修改绑定手机号" @ok="handleOk">
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item v-if="true" ref="name" label="原账号" prop="name">
            <a-input placeholder="请输入原账号" v-model="form.oldAccount" />
          </a-form-model-item>
          <a-form-model-item v-else ref="name" label="新账号" prop="name">
            <a-input placeholder="请输入需要绑定的新手机号" v-model="form.newAccount" />
          </a-form-model-item>
          <a-form-model-item ref="name" label="验证码" prop="name">
            <a-input placeholder="请输入短信验证码" v-model="form.verifyCode">
                <div slot="suffix" class="verify-code">获取验证码</div>
            </a-input>
          </a-form-model-item>
        </a-form-model>
        <button slot="footer" class="next-btn">下一步</button>
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
        oldAccount: "",
        newAccount: "",
        verifyCode: ""
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
<style lang="scss">
.verify-code{
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #008CB0;
    line-height: 20px;
    cursor: pointer;
}
.next-btn{
    width: 74px;
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

</style>
<style lang="scss">
.ant-modal-root{
    .ant-modal-content{
      width: 600px;
      .ant-modal-title{
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #262626;
        line-height: 16px;
      }
      .ant-modal-body{
        padding: 0;
        .ant-form-item{
          margin-top: 24px;
          .ant-form-item-control-wrapper{
            .ant-form-item-control{
                width: 388px;
            }
            margin-left: 20px;
          }
          .ant-input{
            
            height: 32px;
            background: #FFFFFF;
            border-radius: 2px;
            border: 1px solid #D9D9D9;
            &::placeholder{
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #BFBFBF;
              line-height: 20px;
            }
          }
          .ant-form-item-required{
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            line-height: 20px;
          }
        }
      }
      .ant-modal-footer{
        text-align: center;
      }
    }
    .ant-input-suffix .verify-code{
        color: red;
    }
}
</style>