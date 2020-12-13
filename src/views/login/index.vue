<template>
  <div class="login-container">
      <div class="login-box">
          <div class="login-img">
          </div>
             <!-- 表单区域 -->
            <div class="login-content">
              <div class="title">浙商资产服务商招募管理系统</div>
                <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs" >
                  <el-tab-pane class="q-login" label="快捷登录" name="first">
                    <el-form ref="reform" :model="form" class="login-form" :rules="rules">
                          <el-form-item prop="mobile">
                              <el-input v-model="form.mobile" class="input" placeholder="请输入手机号" prefix-icon="el-icon-user"></el-input>
                            </el-form-item>
                            <el-form-item prop="verificationCode">
                                <el-input placeholder="请输入验证码" id="inp" v-model="form.verificationCode" >
                                  <template slot="suffix" width="200px">
                                    <div class="checking" @click="test">获取验证码</div>
                                  </template>
                                </el-input>
                            </el-form-item>
                            <el-form-item class="btns" :class="{titleClass}">
                                <el-button  class="login-text" type="info" @click="login">登 录</el-button>
                            </el-form-item>
                            <!-- 注册成为浙商资产服务商 -->
                          <div class="login-service"><u>注册成为浙商资产服务商</u></div>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane label="密码登录" name="second" >
                        <el-form ref="reform" :model="form" class="login-form" :rules="rules">
                          <el-form-item prop="mobile">
                              <el-input v-model="form.mobile" prefix-icon="el-icon-user" placeholder="请输入手机号"></el-input>
                          </el-form-item>
                          <el-form-item prop="password">
                              <el-input v-model="form.password" type="password"  prefix-icon="el-icon-user" placeholder="请输入密码"></el-input>
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
      form: {
        mobile: '15639782785',
        password: '123456',
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
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ],
        verificationCode: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 3, max: 4, message: '长度在 3 到 4个字符', trigger: 'blur' }
        ],
      },
      // 计算登陆错误的次数
      num: 0,
      isNum:5
    }
  },

  created () {

  },
  methods: {
    resetForm () {
      this.$refs.reform.resetFields()
    },
    login () {
      this.$refs.reform.validate(flag => {
        console.log(flag)
        if (!flag) return
        console.log('提交表单数据')
        console.log(this.$refs)
        if (this.num >0&&this.num<=2) {
          this.$message.error('账号或者密码错误')
        }
        if (this.num >= 2) {
            console.log('输入3次了');
            this.titleClass = true
            if (this.num>=4&&this.num<9) {
              this.$message.error(`账号或者密码错误，您还可以尝试${this.isNum}次`)
              parseInt(this.isNum--)
            }
            if (this.num>=9) {
              this.$message.error('您的账号已被冻结，一小时后再尝试')
              return false
            }
        }
        
        // 校验手机号和密码
        const check = this.$refs.reform.model.mobile !== '15639782785' || this.$refs.reform.model.password !== '123456'
        if (check) {
          if (this.num === 0) {
            this.$message.error('账号或者密码错误')
          }
          parseInt(this.num++)
          return
        } 
        console.log(23);
        // 验证码校验 
        const checkVerification = this.form.verificationCode !== '1111'
        if (checkVerification) {
          return this.$message.error('验证码错误')
        }

        this.$message.success('登陆验证成功')
        this.$router.push('/overview')
      })
    },
    // 点击tab触发
    handleClick () {
      // this.form.password= ''
    },
    test () {
      console.log("点击");
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
            width: 1200px;
            height: 598px;
            background: #FFFFFF;
            box-shadow: 4px 6px 15px 0px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            box-sizing: border-box;
            display: flex;
            .login-img {
              width: 678px;
              height: 456px;
              margin: 71px 0 71px 50px;
              background-color: #ccc;
            }
            .login-content {
              position: relative;
              width: 472px;
              height: 456px;
              margin: 71px 0 71px 50px;
              background-color: #fff;
              .tabs {
                width: 368px;
                /deep/.el-tabs__nav-scroll {
                  width: 368px;
                  display: flex;
                  margin-top: 50px;
                  justify-content: space-around;
                }
              }
              //输入框
              /deep/.input-code {
                padding: 0!important;
              }
              .el-tabs__nav-scroll {
                position: relative;
              }
              /deep/.el-tabs__item  {
                width: 112px;
                font-size: 16px;
                text-align: center;
                box-sizing: content-box;
              }
              /deep/.el-tabs__active-bar {
                width: 112px;
                height: 2px;
                background: #086DD9;
              }
              .el-tabs__item {
                position: relative;
              }
              .title {
                margin-top: 42px;
                width: 368px;
                height: 28px;
                font-size: 28px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: #086DD9;
                line-height: 28px;
              }
              .titleClass {
                margin-top: 30px!important;
              }
              /deep/#inp {
                padding: 0px 12px!important;
              }
              .el-input {
                width: 368px;
                height: 40px;
                background: #FFFFFF;
                border-radius: 2px;
                margin-top: 8px;
                position: relative;
                .checking {
                  position: absolute;
                  top: 12px;
                  right: 16px;
                  width: 80px;
                  height: 16px;
                  font-size: 16px;
                  font-family: PingFangSC-Regular, PingFang SC;
                  font-weight: 400;
                  color: #086DD9;
                  line-height: 16px;
                }
              }
              /deep/.el-tabs__active-bar {
                width: 112px;
                height: 2px;
                background: #086DD9;
              }
            }
            // 按钮
            .btns {
              width: 368px;
              height: 40px;
              line-height: 40px;
              background: #CCCCCC;
              border-radius: 2px;
              color: #ccc;
              text-align: center;
              margin-top: 52px;
              .login-text {
              width: 100%;
              height: 24px;
              font-size: 16px;
              font-family: PingFangSC-Regular, PingFang SC;
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
              .verification-get {
                position: absolute;
                top: 8px;
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
              width: 184px;
              height: 40px;
              background: #FFFFFF;
              border-radius: 2px;
              border: 1px solid #D9D9D9;
            }  
       }
    }
    // input外层组件包裹样式清除
    // /deep/.el-form-item {
    //   width: 368px;
    //   height: 40px;
    //   background: #FFFFFF;
    //   border-radius: 2px;
    //   margin-top: 8px;
    //   position: relative;
    // }
    .login-service {
      width: 154px;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #086DD9;
      line-height: 14px;
      float: right;
    }
</style>
