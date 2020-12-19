<template>
  <div class="register-wrapper">
    <div class="register-container">
      <!-- logo图片 -->
      <div class="logo">
        <img class="logo-pic" src="" alt="" />
      </div>
      <!-- 注册表单 -->
      <div class="register-block" v-if="next">
        <a-form :form="form" class="register-form" @submit="handleSubmit">
          <a-form-item class="user-name-item">
            <a-input
              class="form-userName-input"
              v-decorator="[
                'username',
                {
                  rules: [{ required: true, message: '请输入您的名字' }],
                },
              ]"
              placeholder="请输入您的姓名"
            >
              <a-icon
                slot="prefix"
                type="user"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item class="tel-item">
            <a-input
              class="form-tel-input"
              v-decorator="[
                'phone',
                {
                  rules: [
                    {
                      required: true,
                      message: '请输入11位数字',
                      len: 11,
                    },
                  ],
                },
              ]"
              placeholder="请输入您本人实名登记的手机号码"
            >
              <a-icon
                slot="prefix"
                type="mobile"
                style="color: rgba(0, 0, 0, 0.25)"
              />
            </a-input>
          </a-form-item>
          <a-form-item class="verify-item">
            <a-input
              v-decorator="[
                'code',
                {
                  rules: [{ required: true, message: '请输入验证码' }],
                },
              ]"
              placeholder="请输入验证码"
            >
              <div slot="suffix" @click="sendVerifyCode" class="code">
                发送验证码 <span v-if="countdown">({{ countdown }}s)</span>
              </div>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              class="register-form-button"
              >下一步</a-button
            >
          </a-form-item>
        </a-form>
      </div>
      <!-- 注册成功 -->
      <div class="register-success-block" v-else>
        <div class="success">
          <img class="success-pic" src="" alt="" />
          <div class="success-prompt">您已成功注册成为浙商资产服务商！</div>
          <div class="verify-prompt">
            为了更精准地给您推送优质项目，请您尽快进行服务商要素认证
          </div>
          <div class="login-attestation">登陆并前往资质认证</div>
        </div>
      </div>
      <div class="login">使用已有账号登录</div>
    </div>
  </div>
</template>

<script>
import { registerCode, authRegister } from "@/plugin/api/register";
export default {
  name: "RegisterView",
  nameComment: "注册页面",
  data() {
    return {
      next: true,
      countdown: null,
    };
  },
  methods: {
    //点击下一步注册
    handleSubmit() {
      this.form.validateFields(
        ["username", "phone", "code"],
        (errors, values) => {
          console.log(errors, values);
          if (errors) {
            this.$message.error("请输入正确的手机号码");
            return;
          }
          authRegister({
            code: "111111",
            phone: "13767401613",
            username: "ww",
          }).then((res) => {
            console.log(res);
            if (res.code === 20000) {
              this.$$message.success("注册成功");
              this.next = false;
            }
            
          });
        }
      );
      // this.next = false;
    },
    //点击发送验证码
    sendVerifyCode() {
      if (this.countdown) return;
      this.countdown = 60;
      var timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) clearInterval(timer);
      }, 1000);
      registerCode("13767401613").then((res) => {
        console.log(res);
      });
    },
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
};
</script>

<style scoped lang='scss'>
.register-wrapper {
  background-color: $background-base;
  height: 100vh;
  display: flex;
  .register {
    &-container {
      width: 402px;
      height: 512px;
      background: #ffffff;
      box-shadow: 4px 6px 15px 0 rgba(0, 0, 0, 0.2);
      border-radius: 2px;
      margin: auto;
      .logo {
        width: 190px;
        height: 60px;
        margin: 0 auto;
        margin-top: 52px;
        &-pic {
          width: 100%;
          height: 100%;
        }
      }
      .register-form {
        // overflow: hidden;
        height: 254px;
        .ant-form-item {
          width: 338px;
          height: 40px;
          margin: 0 auto;
          text-align: center;
          /deep/.ant-input {
            width: 338px;
            height: 40px;
            background: #ffffff;
            border-radius: 2px;
            border: 1px solid #dadde6;
            &::placeholder {
              font-size: 16px;
              font-weight: 400;
              color: #bfbfbf;
              line-height: 18px;
            }
          }
          .register-form-button {
            width: 338px;
            height: 40px;
            font-size: 16px;
            line-height: 16px;
            font-weight: 500;
            color: #ffffff;
            background: #008cb0;
            border-radius: 2px;
            margin-top: 46px;
          }
        }
        .user-name-item {
          margin-top: 44px;
        }
        .tel-item {
          margin-top: 24px;
        }
        .verify-item {
          margin-top: 24px;
          .code {
            height: 16px;
            font-size: 16px;
            font-weight: 400;
            color: #bfbfbf;
            line-height: 16px;
            cursor: pointer;
          }
        }
      }
      .register-success-block {
        .success {
          text-align: center;
          margin-top: 44px;
          &-pic {
            width: 88px;
            height: 88px;
            border-radius: 50%;
          }
          .success-prompt {
            width: 224px;
            height: 20px;
            font-size: 14px;
            font-weight: 400;
            color: #595959;
            line-height: 20px;
            margin: 0 auto;
            margin-top: 24px;
          }
          .verify-prompt {
            width: 294px;
            height: 40px;
            font-size: 14px;
            font-weight: 400;
            color: #595959;
            line-height: 20px;
            margin: 0 auto;
            margin-top: 8px;
          }
          .login-attestation {
            margin: 0 auto;
            margin-top: 34px;
            width: 176px;
            height: 40px;
            background: #008cb0;
            border-radius: 2px;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            line-height: 40px;
          }
        }
      }
      .login {
        font-size: 14px;
        font-weight: 400;
        color: #008cb0;
        line-height: 20px;
        margin-top: 24px;
        text-align: center;
        cursor: pointer;
      }
    }
  }
}
</style>
