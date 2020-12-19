<template>
  <div class="login-container">
      <div class="login-box">
          <div class="logo">
            <img src="../../assets/image/logo.jpg" alt="logo">
          </div>
          <div class="login-video">
          </div>
             <!-- 表单区域 -->
            <div class="login-content">
              <div class="title">服务商招募管理系统</div>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs" >
                  <el-tab-pane class="q-login" label="快捷登录" name="first">
                    <el-form ref="reform1" :model="form1" class="login-form" :rules="dynamincRules">
                          <el-form-item prop="mobile">
                              <el-input v-model="form1.mobile" class="input" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
                            </el-form-item>
                            <el-form-item prop="verificationCode">
                                <el-input placeholder="请输入验证码" id="inp" v-model="form1.verificationCode" >
                                  <template slot="suffix" width="200px">
                                    <div class="checking" @click="test">获取验证码</div>
                                  </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="btns">
                                <el-button  class="login-text" type="info" @click="login1">登 录</el-button>
                            </el-form-item>
                            <!-- 注册成为浙商资产服务商 -->
                          <div class="login-service"><u>注册成为浙商资产服务商</u></div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="密码登录" name="second" >
                        <el-form ref="reform" :model="form" class="login-form" :rules="dynamincRules">
                          <el-form-item prop="mobile">
                              <el-input v-model="form.mobile" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
                          </el-form-item>
                          <el-form-item prop="password">
                              <el-input v-model="form.password" type="password" v-if="loginType ===2" prefix-icon="el-icon-user" placeholder="请输入密码"></el-input>
                          </el-form-item>
                          <el-form-item prop="verificationCode" v-if="num >= 3"  class="verification-item" >
                              <el-input v-model="form.verificationCode" id="verification-code" placeholder="请输入验证码">
                              </el-input>
                                  <span class="verification-get">验证码图片</span>
                          </el-form-item>
                          <el-form-item class="btns" :class="{titleClass}">
                              <el-button
                              v-if="this.isNum===0 ? disabled : disabled='false'"
                              class="login-text"
                              type="info"
                              @click="login"
                              plain
                              >登 录</el-button>
                          </el-form-item>
                          <!-- <el-form-item>
                            <el-button
                                class="login-text"
                                type="info"
                                @click="handleSubmit"
                                plain
                            >模 拟 登 录</el-button>
                          </el-form-item> -->
                          <!-- 注册成为浙商资产服务商 -->
                          <div class="login-service"><u>注册成为浙商资产服务商</u></div>
                        </el-form>
                  </el-tab-pane>
                </el-tabs>
            </div>
      </div>
  </div>
</template>

<script>
import { authLogin } from "@/plugin/api/login";
import { encryptInfo } from "@/plugin/tools/encrypt";
export default {
  data () {
    // 手机号校验规则
    const checkMobile = (rule, value, callback) => {
      const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if (reg.test(value)) {
        return callback()
      }
      return callback(new Error('手机号格式不正确'))
    }
    return {
      activeName: 'second',
      loginType: 2,
      form: {
        mobile: '15639782785',
        password: '123456',
        verificationCode: '1111',
      },
      form1: {
        mobile: '15981858092',
        verificationCode: '1111',
      },
      // 控制title的位置
        titleClass: false,
      // 定义校验规则
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      rules1: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
      },
      // 计算登陆错误的次数
      num: 0,
      // 快捷登录的次数
      queryNum: 0,
      isNum:5
    }
  },
  methods: {
    resetForm () {
      this.$refs.reform.resetFields()
    },
    login () {
      // console.log(this.$refs.reform.rules);
      this.$refs.reform.validate(flag => {
        console.log(flag)
        if (!flag) return
        const correct = this.$refs.reform.model.mobile === '15639782785' && this.$refs.reform.model.password === '123456'
        if(correct) {
          this.$message.success('登陆验证成功')
          this.$router.push('/overview')
          return
        }
        const normal = this.$refs.reform.model.mobile === '15639782785' && this.$refs.reform.model.password === '123456' && this.form.verificationCode === '1111'
        if (this.num > 0 && this.num <= 3) {
          if (this.num >= 2 && this.num < 4) {
            // console.log('输入3次了');
            this.titleClass = true
          }
          this.$message.error('账号或者密码错误,请重新登录') 
        } 
        if (this.num >= 4 && this.num < 9) {
              if(normal) {
                this.$message.success('登陆验证成功')
                this.$router.push('/overview')
                return
              }
              this.$message.error(`账号或者密码错误，您还可以尝试${this.isNum}次`)
              parseInt(this.isNum--)
            }
            if (this.num >= 9) {
              this.$message.error('您的账号已被冻结，一小时后再尝试')
              return
            }
        // 校验手机号和密码
        const check = this.$refs.reform.model.mobile !== '15639782785' || this.$refs.reform.model.password !== '123456'
        if (check) {
          console.log(check);
          if (this.num === 0) {
            this.$message.error('账号或者密码错误,请重新登录')
          }
          parseInt(this.num++)
          return
        }
        // // 验证码校验
        // const checkVerification = this.form.verificationCode !== '1111'
        // if (checkVerification) {
        //   return this.$message.error('验证码错误')
        // }
        this.$message.success('登陆验证成功')
        this.$router.push('/overview')
      })
    },
    // 点击快捷登录按钮
    login1 () {
      this.$refs.reform1.validate(flag => {
        // console.log(flag)
        if (!flag) return
        const current = this.$refs.reform1.model.mobile === '15981858092' && this.form1.verificationCode === '1111'
        if (current) {
          this.$message.success('登陆验证成功')
          this.$router.push('/overview')
          return
        }
        if (this.queryNum > 0 && this.queryNum < 4 ) {
          this.$message.error('账号或者验证码错误,请重新登录') 
        } 
        if (this.queryNum >= 4 && this.queryNum < 9) {
          this.$message.error(`账号或者验证码错误，您还可以尝试${this.isNum}次`)
          parseInt(this.isNum--)
        }
        if (this.queryNum >= 9) {
          this.$message.error('您的账号已被冻结，一小时后再尝试')
          return
        }
        // 校验手机号和密码
        const queryCheck = this.$refs.reform1.model.mobile !== '15981858092' || this.form1.verificationCode !== '1111'
          if (queryCheck) {
            if (this.queryNum === 0) {
              this.$message.error('账号或者验证码错误,请重新登录')
            }
            parseInt(this.queryNum++)
            return
          }
        this.$message.success('登陆验证成功')
        this.$router.push('/overview')
      })
    },
    // 点击tab触发
    handleClick () {
      // 触发tab标签清空校验规则
      // this.$refs.reform.resetFields()
      // this.$refs.reform1.resetFields()
      this.password = ''
    },
    test () {
      console.log("点击");
    },
    handleSubmit() {
      authLogin(encryptInfo({
        "loginType": 1,
        "password": "123456",
        "phone": "17630829902",
        "phoneCode": "",
        "pictureCode": ""
      })).then(({data,code})=>{
        if(code === 20000){
          console.log(data);
          this.$store.dispatch('login',data)
          this.$info({
            title: 'This is a notification message',
            content: '登录成功！确认后跳转',
            onOk:()=> {
              this.$router.push('/');
            },
          })
        }
      })
    },
  },
  mounted() {

  },
  computed :{
    // 动态切换校验规则
    dynamincRules () {
      console.log(1);
      return this.activeName === 'second' ? this.rules : this.rules1
    }
  }
}
</script>

<style scoped lang='scss'>
    .login-container {
        position: relative;
        height: 100%;
        width: 100%;
        background-color: #2b4b6b;
        /deep/.el-tabs__nav-wrap::after {
          width: 0;
        }
        .login-box {
            position: absolute;
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%);
            width: 1306px;
            height: 480px;
            // background: #FFFFFF;
            box-shadow: 4px 6px 15px 0 rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            box-sizing: border-box;
            display: flex;
            .logo {
              position: absolute;
              width: 223px;
              height: 72px;
              top: -96px;
              left: 0;
              img {
                width: 100%;
                height: 100%;
              }
            }
            .login-video {
            width: 879px;
            height: 480px;
            background-color: #ccc;
            }
            .login-content {
              // position: relative;
              margin-left: 25px;
              width: 402px;
              height: 480px;
              background: #FFFFFF;
              box-shadow: 4px 6px 15px 0px rgba(0, 0, 0, 0.2);
              border-radius: 2px;
              .tabs {
                width: 368px;
                 color: #008CB0;
                /deep/.el-tabs__nav-scroll {
                  width: 368px;
                  display: flex;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #008CB0;
                  // margin-top: 50px;
                  justify-content: space-around;
                }
              }
              //输入框
              /deep/.input-code {
                padding: 0!important;
              }
              .el-tabs__nav-scroll {
                position: relative;
                // color: pink;
              }
              /deep/.el-tabs__item  {
                position: relative;
                width: 112px;
                font-size: 16px;
                text-align: center;
                color: #666;
                box-sizing: content-box;
              }
              /deep/.el-tabs__active-bar {
                width: 112px;
                height: 2px;
                background: #008CB0;
              }
              /deep/.is-active {
                color: #008CB0;
              }
              .title {
                margin: 42px 55px 50px;
                width: 254px;
                height: 28px;
                font-size: 28px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #008CB0;
                line-height: 28px;
              }
              .titleClass {
                margin-top: 30px!important;
              }
              /deep/#inp {
                padding: 0 12px!important;
              }
              .el-input {
                width: 338px;
                height: 40px;
                background: #FFFFFF;
                border-radius: 2px;
                // border: 1px solid #D9D9D9;
                margin: 0 30px;
                // margin-top: 8px;
                position: relative;
                // 验证码
                .checking {
                  position: absolute;
                  top: 12px;
                  right: 16px;
                  width: 128px;
                  height: 40px;
                  font-size: 16px;
                  font-weight: 400;
                  color: #008CB0;
                  line-height: 16px;
                }
              }
              /deep/.el-form-item__error {
                padding-left: 30px;
              }
            }
            // 按钮
            .btns {
              margin: 0 30px;
              margin-top: 70px;
              width: 338px;
              height: 40px;
              line-height: 40px;
              background: #008CB0;
              border-radius: 2px;
              color: #ccc;
              text-align: center;
              .login-text {
              width: 100%;
              height: 40px;
              background: #008CB0;
              border-radius: 2px;
              height: 24px;
              font-size: 16px;
              font-weight: 400;
              color: #FFFFFF;
              line-height: 24px;
              }
              .el-button {
                padding: unset;
                background: unset;
                border: unset;
              }
            }
            .el-button {
              width: 100%;
            }
            // 验证码框外层
            .verification-item {
              position: relative!important;
              border: none;
              .verification-get {
                position: absolute;
                top: 0;
                right: 0;
                text-align: center;
                width: 128px;
                height: 40px;
                background: #FFFFFF;
                border-radius: 2px;
                border: 1px solid #D9D9D9;
              }
            }
            // 验证码左侧框
            /deep/#verification-code {
              position: relative;
              width: 200px;
              height: 40px;
              background: #FFFFFF;
              border-radius: 2px;
              border: 1px solid #D9D9D9;
            }
       }
    }
    // input外层组件包裹样式清除
    /deep/.el-form-item {
      width: 368px;
      height: 40px;
      background: #FFFFFF;
      border-radius: 2px;
      margin-top: 8px;
      position: relative;
    }
    .login-service {
      margin-top: 24px;
      width: 154px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #008CB0;
      line-height: 14px;
      float: right;
    }
</style>
