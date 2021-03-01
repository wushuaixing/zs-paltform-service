<template>
  <div class="register-wrapper">
    <div class="register-container">
      <div class="register-content">
        <div class="video-wrapper">
          <div class="zs-logo">
            <img class="zs-logo-pic" src="../../assets/img/zs-logo.png" alt="">
          </div>
					<div style="width: 853px; height: 480px;overflow: hidden;">
						<video muted autoplay controls src="https://zsamc-public.zsamc.com/promotion-vedio.mp4"></video>
					</div>
        </div>
        <div class="login-wrapper" ref="loginContainer">
          <div class="login-title">服务商招募管理系统</div>
          <a-form-model
            layout="inline"
            :model="params"
            @submit.native.prevent
            :rules="rules"
            ref="ruleForm"
            class="login-form-wrapper"
            autoComplete="off"
          >
            <a-tabs
              v-model="params.loginType"
              class="login-tab-theme"
              @change="handleTabChange"
              size="large"
            >
              <a-tab-pane :key="0" tab="快捷登录"> </a-tab-pane>
              <a-tab-pane :key="1" tab="密码登录"> </a-tab-pane>
            </a-tabs>
            <div style="height: 196px">
              <a-form-model-item prop="phone">
                <a-input
                  v-model="params.phone"
                  placeholder="请输入您的手机号码"
                  v-bind="styleProps"
                  :maxLength="11"
                >
                  <a-icon slot="prefix" type="user" style="color: #bfbfbf" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="phoneCode" v-if="params.loginType === 0">
                <a-input
                  v-model="params.phoneCode"
                  placeholder="请输入短信验证码"
                  v-bind="styleProps"
                  :maxLength="6"
                  autoComplete="new-password"
                  @pressEnter="handleSubmit"
                >
                  <a-icon slot="prefix" type="lock" style="color: #bfbfbf" />
                  <template slot="suffix">
                    <a-button
                      type="link"
                      @click="handleCode"
                      :style="code.disabled && { color: '#999' }"
                      >{{ code.text }}</a-button
                    >
                  </template>
                </a-input>
              </a-form-model-item>
              <template v-if="params.loginType === 1">
                <a-form-model-item prop="password">
                  <a-input
                    v-model="params.password"
                    type="password"
                    v-bind="styleProps"
                    @pressEnter="handleSubmit"
                    placeholder="请输入登录密码"
                    autoComplete="new-password"
                  >
                    <a-icon slot="prefix" type="lock" style="color: #bfbfbf" />
                  </a-input>
                </a-form-model-item>
                <a-form-model-item prop="pictureCode" v-if="imgCode.status">
                  <a-input
                    v-model="params.pictureCode"
                    placeholder="请输入图形验证码"
                    v-bind="styleProps"
                    :maxLength="4"
                    @pressEnter="handleSubmit"
                  >
                    <a-icon
                      slot="prefix"
                      type="safety"
                      style="color: #bfbfbf"
                    />
                    <template slot="suffix" @click="toGetImageCode">
                      <a-spin :spinning="imgCode.loading">
                        <div
                          style="height: 34px; overflow: hidden; width: 110px"
                          @click="toGetImageCode"
                        >
                          <img
                            :src="imgCode.url"
                            alt=""
                            style="
                              height: 39px;
                              width: 117px;
                              margin: -3px 0 0 -4px;
                            "
                          />
                        </div>
                      </a-spin>
                    </template>
                  </a-input>
                </a-form-model-item>
              </template>
            </div>
          </a-form-model>
          <a-button type="primary" block @click="handleSubmit" size="large" :loading="loading"
            >登 录</a-button
          >
          <div style="text-align: right; margin-top: 24px">
            <router-link to="/register" style="text-decoration: underline"
              >注册成为浙商资产服务商</router-link
            >
          </div>
        </div>
      </div>
			<div class="register-record">
				浙公网安备 33010202000630号  Copyright © 2014 浙江省浙商资产管理有限公司版权所有 浙ICP备14030345号-1
			</div>
    </div>
  </div>
</template>

<script>
import * as api from "@/plugin/api/login";
import { encryptInfo } from "@/plugin/tools/encrypt";

export default {
  name: "RegisterView",
  nameComment: "注册页面",
  data() {
    //自定义手机号校验规则
    const phoneCheck = (rule, value, callback) => {
      const reg = /^(13[0-9]|14[01456879]|15[0-3,5-9]|16[2567]|17[0-8]|18[0-9]|19[0-3,5-9])\d{8}$/;
      if (!reg.test(value)) {
        callback("请输入正确的手机号码");
      }
      callback();
    };
    return {
      params: {
        loginType: 0,
        phone: "",
        password: "",
        phoneCode: "",
        pictureCode: "",
      },
	    loading:false,
      code: {
        text: "获取验证码",
        disabled: false,
      },
      imgCode: {
        status: false,
        loading: false,
        url: "",
      },
      styleProps: {
        autoComplete: "off",
        size: "large",
        style: {
          width: "338px",
        },
      },
      rules: {
        phone: [
          {
            required: true,
            message: "请输入正确的手机号码",
            trigger: "change",
            validator: phoneCheck,
          },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
        phoneCode: [
          { required: true, message: "请输入短信验证码", trigger: "change" },
        ],
        pictureCode: [
          { required: true, message: "请输入图形验证码", trigger: "change" },
        ],
      },
    };
  },
  mounted() {
    this.form = this.$refs.ruleForm;
  },
  methods: {
    handleTabChange(val) {
      this.form.clearValidate();
      this.$nextTick(() => {
        this.params.loginType = val;
      });
    },
    // 获取图片验证码
    toGetImageCode() {
      if (this.imgCode.loading) return;
      this.imgCode.loading = true;
      const phone = this.params.phone;
      api
        .getCaptcha({ phone })
        .then((res) => {
          if (res.code === 20000) {
            this.imgCode.url = res.data.captcha;
          } else {
            this.$message.error("获取图片验证码失败");
          }
        })
        .finally(() => {
          this.imgCode.loading = false;
        });
    },
    toLogin() {
			this.loading = true;
      const phone = this.params.phone;
      api
        .accountStatus({ phone })
        .then((res) => {
          if (res.code === 20000) {
            const { needPicCode } = res.data;
            const { status } = this.imgCode;
            if (needPicCode) {
              if (status) {
                return api.login(encryptInfo(this.params));
              } else {
                this.imgCode.status = true;
                this.toGetImageCode();
	              this.loading = false;
              }
            } else {
              return api.login(encryptInfo(this.params));
            }
          }
        })
        .then((res) => {
          if (res.code === 20000) {
            this.$store.dispatch("login", res.data);
            this.$router.push("/");
          } else{
	          this.loading = false;
	          this.params.pictureCode = "";
            if(this.imgCode.status) this.toGetImageCode();

            if (res.data && res.data.count >= 5)
							return this.$message.error(`账号或密码错误,您还可以尝试${10 - res.data.count}次`);
            if (res.code === 30001) return this.$message.error("账号或密码错误");
            if (res.code === 30003) return this.$message.error("验证码错误");
            if (res.code === 30006) return this.$warning({
              title:"账号冻结提示",
              content:"账号或密码输入错误次数过多，请在1小时后尝试",
              centered:true,
              mask:false,
              okText:"我知道了",
              getContainer:()=>this.$refs.loginContainer
            });
            if (res.code === 30009) return this.$message.error("手机号未注册,请先进行注册");
            if (res.code === 30010) return this.$message.error("图片验证码错误");
          }
        })
				.finally(()=>{
				})
			;
    },
    // 点击登录操作
    handleSubmit() {
      this.form.validate((valid) => {
        if (valid) {
          this.toLogin();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 获取手机验证码
    handleCode() {
      this.$refs.ruleForm.validateField("phone", (errorMessage) => {
        if (!errorMessage) {
          if (this.code.disabled) return;
          let countdown = 60;
          this.code.disabled = true;
          api.loginCode({ phone: this.params.phone }).then((res) => {
            if (res.code === 20000) {
              this.$message.success("验证码发送成功");
              this.code.text = `重新发送（${countdown}s）`;
              this.interval = setInterval(() => {
                countdown -= 1;
                this.code.text = `重新发送（${countdown}s）`;
                if (countdown === 0) {
                  this.code = {
                    disabled: false,
                    text: "获取验证码",
                  };
                  clearInterval(this.interval);
                }
              }, 1000);
            } else {
              if(res.code === 30002){
                this.$message.error("请勿重复发送验证码")
              }else{
                this.$message.error("验证码发送失败");
              }
              this.code.disabled = false;
            }
          });
        }
      });
    },
  },
  beforeDestroy() {
    if (this.interval) clearInterval(this.interval);
  },
};
</script>

<style scoped lang='scss'>
.register-wrapper {
  height: 100vh;
  display: flex;
	padding: 135px 0;
  .register {
    &-container {
      width: 100%;
      height: 560px;
      background: #1a1939 url("https://zsamc-public.zsamc.com/image/background.jpg") center
        no-repeat;
      margin: auto;
      padding-top: 40px;
			position: relative;
    }
    &-content {
      width: 1306px;
      height: 480px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
	.register-record{
		position: absolute;
		bottom: -40px;
		width: 100%;
		text-align: center;
		font-size: 14px;
	}
  .video-wrapper {
    position: relative;
    //width: 879px; 视频左右两侧会留白
    width: 853px;
    height: 100%;
    background-color: #fff;
    .zs-logo{
      position: absolute;
      top: -135px;
			z-index: 1;
    }
    video{
      // width: 100%;
      height: 100%;
      &:focus{
        outline: none;
      }
    }
  }
  .login {
    &-wrapper {
      width: 402px;
      height: auto;
      padding: 30px;
      background: #ffffff;
    }
    &-title {
      line-height: 52px;
      font-size: 28px;
      color: $common-base-active;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}
</style>
<style lang="scss">
.login-wrapper {
  .login-tab-theme {
    .ant-tabs-bar {
      border-bottom: none !important;
      margin-bottom: 24px !important;
    }
    .ant-tabs-nav {
      padding-left: 47px;
    }
  }
  .login-form-wrapper {
    .ant-form-item {
      margin-bottom: 23px !important;
    }
    .ant-form-item-with-help {
      margin-bottom: -1px !important;
    }
    .ant-form-explain,
    .ant-form-extra {
      margin-top: 0;
      min-height: 25px;
    }
  }
  input,
  button {
    border-radius: 2px !important;
  }
  .ant-btn-link{
    padding: 0;
  }
}
.register-content{
  .login-wrapper{
    .ant-modal{
      &-confirm-title{
        font-size: 16px;
        font-weight: 500;
        color: #333333;
        line-height: 22px;
      }
      &-confirm-title{
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 20px;
      }
      &-confirm-btns{
        width: 72px;
        height: 24px;
        background: #008CB1;
        border-radius: 2px;
        margin: 0 auto;
        margin-right: 50%;
        margin-top: 12px;
        transform: translateX(50%);
      }
    }
  }
}
</style>
