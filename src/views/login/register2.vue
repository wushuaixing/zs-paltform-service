<template>
  <div class="register-wrapper">
    <div class="register-container">
      <div class="register-content">
        <div class="video-wrapper">111</div>
        <div class="login-wrapper">
          <div class="login-title">服务商招募管理系统</div>
          <a-form-model layout="inline" :model="params"  @submit.native.prevent :rules="rules" ref="ruleForm" class="login-form-wrapper" autoComplete="off">
            <a-tabs v-model="params.loginType" class="login-tab-theme" @change="handleTabChange" size="large">
              <a-tab-pane :key="1" tab="快捷登录"> </a-tab-pane>
              <a-tab-pane :key="2" tab="密码登录"> </a-tab-pane>
            </a-tabs>
            <div style="height: 196px">
              <a-form-model-item prop="user">
                <a-input v-model="params.user" placeholder="请输入您的手机号码" v-bind="styleProps" :maxLength="11">
                  <a-icon slot="prefix" type="user" style="color:#BFBFBF" />
                </a-input>
              </a-form-model-item>
              <template v-if="params.loginType===2">
                <a-form-model-item prop="password">
                  <a-input v-model="params.password" type="password"  v-bind="styleProps"
                           placeholder="请输入登录密码" autoComplete="new-password">
                    <a-icon slot="prefix" type="lock" style="color:#BFBFBF" />
                  </a-input>
                </a-form-model-item>
                <a-form-model-item prop="pictureCode">
                  <a-input v-model="params.pictureCode" placeholder="请输入图形验证码" v-bind="styleProps" :maxLength="4">
                    <a-icon slot="prefix" type="safety" style="color:#BFBFBF"  />
                    <template slot="suffix">
                      <div style="height: 34px;overflow: hidden;width: 110px;">
                        <img :src="imgUrl" alt="" style="height: 39px;width:117px;margin: -3px 0 0 -4px;">
                      </div>
                    </template>
                  </a-input>
                </a-form-model-item>
              </template>
              <a-form-model-item prop="phoneCode" v-show="params.loginType===1">
                <a-input v-model="params.phoneCode" placeholder="请输入短信验证码" v-bind="styleProps" :maxLength="6"
                         autoComplete="new-password">
                  <a-icon slot="prefix" type="lock" style="color:#BFBFBF" />
                  <template slot="suffix">
                    <a-button type="link" @click="handleCode">{{code.text}}</a-button>
                  </template>
                </a-input>
              </a-form-model-item>
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
  const imgUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAgAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAoAHYDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDt7W1t2tYWaCIkopJKDnirAs7b/n3h/wC+BTbP/jzg/wCua/yq0oqIxjyrQiMY8q0IxZWv/PtD/wB+xWFrF0LTxN4e0q1trXF/JM0+6EHEcaZOPTkiulAryHW/Hsdt8SjcR2L3B0+0e0WMNj96zjcfpgY966KGEniJclKN2DUVuj1wWFp/z6wf9+xUg0+z/wCfSD/v2K8tt9a8d+JL2GWOyksdPBDHYNnHBBJbkjkHjsDXp2n31vOBbi7jmuI1xIFPOQSp4+qt+Va4rAPDWUnFvrZ3t620FHlfQnGn2X/Pnb/9+h/hTxp1j/z52/8A36X/AAqdaoeINTTRtBu79zgRJkfOqZJ4HJ47/wCHNcsKXPJRitWVyx7FkWOmmQx/ZbTeACV8tcgHODj8D+RqYaZYf8+Nt/36X/CvNPh3qtzrGoSalfTHCh1jE/7zaFwX2ydVOWX5T1BHXbXpttqFndOyQXMcjL1Ctnuw/mjfka6MVgnhqjpyWq3FFRavYUaXp/8Az423/fpf8KkGlaf/AM+Fr/35X/CrCiuO+JHi288K6GJNPWI3Up+UuM7VBAZsfVlH/AqjD4WWIqxo01qwaildo6waTp3/AED7X/vyv+FPGkab/wBA+0/78r/hXOfDa/v9Y8HW2q6lO01zcu5LHgYV2UYA4HQ12IFTXw/sasqUkrxbT+Q0otXscn4wsLO10iJ7e1giczgFo4wpI2txxRVnxx/yBIf+vhf/AEFqK8jFJKpoediUlU0Muz/484P+ua/yq0oqtZf8eUH/AFzX+VQa1rum+HdPN9qlyIIM7VJBJZsE7QB1PBr0o/Cj0Y/Ci/cXEVnaTXM7qkUKF3ZjgAAZJJr5u0jxJdQ+LNU1HS9Pe+muJS8aiFpCAG3BsDnqAa3raXxD8T9auLu7N5D4WjkzJFHJtQKvRR/eboSecZ7cV3+leLPA/hyye2sFjtEiYqUSMlmI4yT1J9zXo4FYjmbow5/K1+66eoSt1ZwMHxS8VWOpgX9vOV6NA0AQgey+1TeJ/Emnw65ba5psl9p1zuDyW9xA8TP82cdNpGOevenxi88f+M2v7e18m2UDzJGX5QoGOT2JGfxq74mOqeJdQj0vS7KVbCItEZNhweQCW6/7P6Gvo3h3SxNPlcYy5ffTS5V5NK1/zMb3TJYPH1x4g1aFNPF0qhQMJNkqo4z07krz1Az757rxpcNb+DGSRXA2YkRWYHoBgHOCM+uQa8vi8H2OiahHBqsUqSsdsc8JMTxydduVPJ9OfmB45FdX4u8N6vpfhU31l4pv7m1Cg/ZtRCSkbhj/AFh2sMAn1NeZiowjiqSpQXLdWab97XzLjfldzH+H/hweJbd0u7k29iqjKQSbS7qTyc8/dJ6dqrWV23gT4hwQx3Lmy34m3HcvVgQM+mcZ9zUfg7xB4k0GwlnPh2TUIQAjSxt80Yxn7pGfu7RwQAMetZFxqNvr/iLbq076aJDsJuo/L2k8s3PCnOO9evHGRni60MTK1Jpqz/TuzPl91cu52Z+KHirXdcW08P20IUtsCMmecnqT9KyviZrOt3dnZWut6eLS9TKuyNlGU4bA/IH8Kj8B3tj4f8f5u5k+zyq3lyBlZW/unIJGc5rW+Nmp2d7d2MFu6yGMEsyHIDdMH8K6aNOhSzOjToUVyWupa32fXZibbg22eofDiHyPAmmRD7qocfic/wAya60CuV+HLiTwBo3PItwG+ua6sV8Ri7/WJ37v8zpjsjm/HP8AyBIf+vlf/QWopfHP/IDh/wCvlf8A0FqK8PF/xDzsV/EMa0urZbSBWuIgRGoILjjivJfGMGqeO/H1tpBgns9FtHK/apFwjDq7huhJwAoz+WTRRXVGtKyOiNWVket6dFpGl6bDp1nJbRWsKbEjEg6e/qT3PesW58F+D7u4aaWO3DMckLMFBPHofb9TRRW9LG16LbpScfRtDdRvdHQ6emjaZai2sms4IR/CjqKuJd6cn3bm1HfiRfpRRWTxE5O73D2rMjXNJ0jW5Y5nvrSOZFwHLK2cMCARuww4PBB65BHOblpbaVb6KNNbUYHUg7n8xOpOTgHIA7Adh+dFFafXKrioX0Qe1fYm0u18P6QrraS2abgAT5iZwAPzyeSTySSauyzaJcxmO4l0+VCMFZGRgR9DRRUSxE5O7D2rOR1n4cfD7WQWEdnYTnpLYzrFj/gIO39Kwp/hfaWkaJpXiqwuII5PNW11WOORS2McuhVunbFFFXDG1qatCVvRtA6je6N618X6/wCHbdLe98N6Xd2sQA83Q9QTAA9Inw3611ugeNNJ160edftFgUba0WoR+Q+fYE4I9wTRRWTrSY/bSKnjO/s7rRoUt7uCZxcKSscgYgbW54NFFFcVeTlO7OKvJyndn//Z';
export default {
  name: 'RegisterView',
  nameComment: '注册页面',
  data() {
    return {
      params: {
        loginType:1,
        user: '',
        password: '',
        phoneCode:'',
        pictureCode:''
      },
      code:{
        text:'获取验证码',
        disabled:false,
      },
      imgUrl,
      styleProps:{
        autoComplete:'off',
        size:'large',
        style:{
          width:'338px'
        }
      },
      rules:{
        user: [
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
    handleSubmit() {
      this.form.validate(valid => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleCode(){
      if(this.code.disabled) return;
      let countdown = 10;
      this.code = {
        disabled: true,
        text:`重新发送（${countdown}s）`,
      };
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
