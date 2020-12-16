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
                            <el-form-item class="btns">
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
// import {login} from "@/plugin/api/login";
// import { encryptInfo } from "@/plugin/tools/encrypt";
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
        const normal = this.$refs.reform.model.mobile === '15639782785' && this.$refs.reform.model.password === '123456' && this.form.verificationCode === '1111'
        // console.log('提交表单数据')
        // console.log(this.$refs)
        if (this.num > 0 && this.num <= 3) {
          if (this.num >= 2) {
            // console.log('输入3次了');
            this.titleClass = true
            }
          // if(!check&&!checkVerification) return
          this.$message.error('账号或者密码错误')
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
              return false
            }
            // return
        // 校验手机号和密码
        // const normal = this.$refs.reform.model.mobile === '15639782785' && this.$refs.reform.model.password === '123456' && this.form.verificationCode === '1111'
        const check = this.$refs.reform.model.mobile !== '15639782785' || this.$refs.reform.model.password !== '123456'
        if (check) {
          if (this.num === 0) {
            this.$message.error('账号或者密码错误')
          }
          parseInt(this.num++)
          return
        }
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

<style scoped>

</style>
