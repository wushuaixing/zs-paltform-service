<template>
  <div class="register-wrapper">
    <div class="register-container">
      <div class="register-content">
        <div class="video-wrapper">
          {{123}}
        </div>
        <div class="login-wrapper">
          <div class="login-title">服务商招募管理系统</div>
          <a-form-model layout="inline" :model="params"  @submit.native.prevent :rules="rules" ref="ruleForm" class="login-form-wrapper" autoComplete="off">
            <a-tabs v-model="params.loginType" class="login-tab-theme" @change="handleTabChange" size="large">
              <a-tab-pane :key="0" tab="快捷登录"> </a-tab-pane>
              <a-tab-pane :key="1" tab="密码登录"> </a-tab-pane>
            </a-tabs>
            <div style="height: 196px">
              <a-form-model-item prop="phone">
                <a-input v-model="params.phone" placeholder="请输入您的手机号码" v-bind="styleProps" :maxLength="11">
                  <a-icon slot="prefix" type="user" style="color:#BFBFBF" />
                </a-input>
              </a-form-model-item>
              <a-form-model-item prop="phoneCode" v-if="params.loginType===0">
                <a-input v-model="params.phoneCode" placeholder="请输入短信验证码" v-bind="styleProps" :maxLength="6"
                         autoComplete="new-password" @pressEnter="handleSubmit">
                  <a-icon slot="prefix" type="lock" style="color:#BFBFBF" />
                  <template slot="suffix">
                    <a-button type="link" @click="handleCode" :style="code.disabled && {color:'#999'}">{{code.text}}</a-button>
                  </template>
                </a-input>
              </a-form-model-item>
              <template v-if="params.loginType===1">
                <a-form-model-item prop="password">
                  <a-input v-model="params.password" type="password"  v-bind="styleProps" @pressEnter="handleSubmit"
                           placeholder="请输入登录密码" autoComplete="new-password">
                    <a-icon slot="prefix" type="lock" style="color:#BFBFBF" />
                  </a-input>
                </a-form-model-item>
                <a-form-model-item prop="pictureCode" v-if="imgCode.status">
                  <a-input v-model="params.pictureCode" placeholder="请输入图形验证码" v-bind="styleProps" :maxLength="4"
                           @pressEnter="handleSubmit">
                    <a-icon slot="prefix" type="safety" style="color:#BFBFBF"  />
                    <template slot="suffix">
                      <a-spin :spinning="imgCode.loading">
                        <div style="height: 34px;overflow: hidden;width: 110px;">
                          <img :src="imgCode.url" alt="" style="height: 39px;width:117px;margin: -3px 0 0 -4px;">
                        </div>
                      </a-spin>
                    </template>
                  </a-input>
                </a-form-model-item>
              </template>

            </div>

          </a-form-model>
          <a-button type="primary" block @click="handleSubmit" size="large">登 录</a-button>
          <div style="text-align: right;margin-top: 24px">
            <router-link to="/register" style="text-decoration:underline">注册成为浙商资产服务商</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as api from "@/plugin/api/login";
import { encryptInfo } from "@/plugin/tools/encrypt";

export default {
  name: 'RegisterView',
  nameComment: '注册页面',
  data() {
    return {
      test:5,
      params: {
        loginType:0,
        phone: '',
        password: '',
        phoneCode:'',
        pictureCode:''
      },
      code:{
        text:'获取验证码',
        disabled:false,
      },
      imgCode:{
        status:false,
        loading:false,
        url:'',
      },
      styleProps:{
        autoComplete:'off',
        size:'large',
        style:{
          width:'338px'
        }
      },
      rules:{
        phone: [
          { required: true, message: '请输入正确的手机号码', trigger: 'change' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' },
        ],
        phoneCode:[
          { required: true, message: '请输入短信验证码', trigger: 'change' },
        ],
        pictureCode:[
          { required: true, message: '请输入图形验证码', trigger: 'change' },
        ]
      }
    };
  },
  mounted(){
    this.form = this.$refs.ruleForm;
  },
  methods: {
    handleTabChange(val){
      this.form.clearValidate();
      this.$nextTick(()=>{
        this.params.loginType = val;
      })
    },
    // 获取图片验证码
    toGetImageCode(){
      if(this.imgCode.loading)return;
      this.imgCode.loading = true;
      const phone = this.params.phone;
      api.getCaptcha({phone}).then(res=>{
        if(res.code === 20000){
          this.imgCode.url = res.data.captcha;
        }else{
          this.$message.error(res.message);
        }
      }).finally(()=>{
        this.imgCode.loading = false;
      })
    },
    toLogin(){
      const phone = this.params.phone;
      api.accountStatus({phone})
        .then(res=>{
          if(res.code === 20000){
            const { needPicCode } = res.data;
            const { status } = this.imgCode;
            if(needPicCode){
              if(status){
                return api.login(encryptInfo(this.params));
              }else{
                this.imgCode.status = true;
                this.toGetImageCode();
              }
            }else{
              return api.login(encryptInfo(this.params));
            }
          }
        })
        .then(res=>{
          if(res.code === 20000){
            this.$store.dispatch('login',res.data);
            this.$router.push('/');
          }else if(/300\d\d/.test(res.code)){
            this.params.pictureCode = '';
            if(res.code === 30010){
              this.toGetImageCode();
              this.$message.error('验证码输入错误！');
            }else{
              if(this.imgCode.status) this.toGetImageCode();
              this.$message.error(res.message);
            }
          }else{
            this.$message.error(res.message);
          }
        })
    },
    // 点击登录操作
    handleSubmit() {
      this.form.validate(valid => {
        if (valid) {
          this.toLogin();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 获取手机验证码
    handleCode(){
      if(!this.params.phone) return this.$message.error('手机号不能为空！');
      if(this.code.disabled) return;
      let countdown = 60;
      this.code.disabled = true;
      api.loginCode({ phone: this.params.phone }).then(res=>{
        if(res.code === 20000) {
          this.code.text = `重新发送（${countdown}s）`;
          this.interval = setInterval(()=>{
            countdown -= 1;
            this.code.text = `重新发送（${countdown}s）`;
            if(countdown === 0){
              this.code = {
                disabled:false,
                text:'获取验证码'
              };
              clearInterval(this.interval);
            }
          },1000)

        } else{
          this.$message.error(res.message);
          this.code.disabled = false;
        }
      });

    },
  },
  beforeDestroy() {
    if(this.interval) clearInterval(this.interval);
  }

}
</script>

<style scoped lang='scss'>
.register-wrapper{
  height: 100vh;
  display: flex;
  .register{
    &-container{
      width: 100%;
      height: 600px;
      background: #1a1939 url("../../assets/img/background.jpg") center no-repeat;
      margin: auto;
      padding-top: 60px;
    }
    &-content{
      width: 1306px;
      height: 480px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
    }
  }
  .video-wrapper{
    width: 879px;
    height: 100%;
    background-color: #fff;
  }
  .login{
    &-wrapper{
      width: 402px;
      height: auto;
      padding: 30px;
      background: #ffffff;
    }
    &-title{
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
  .login-wrapper{
    .login-tab-theme{
      .ant-tabs-bar{
        border-bottom: none!important;
        margin-bottom: 24px!important;
      }
      .ant-tabs-nav{
        padding-left: 47px;
      }
    }
    .login-form-wrapper{

      .ant-form-item {
        margin-bottom: 23px!important;

      }
      .ant-form-item-with-help{
        margin-bottom: -1px!important;
      }
      .ant-form-explain, .ant-form-extra{
        margin-top: 0;
        min-height: 25px;
      }
    }
    input,button{
      border-radius: 2px!important;
    }
  }

</style>
