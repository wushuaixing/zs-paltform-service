<template>
  <div class="factor-wrapper">
    <a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......"/>
    <!-- 服务商状态   -->
    <div class="factor-status" v-if="false">
      <div class="status-header">
        <div class="status-header_title">我的服务商身份</div>
        <div class="status-header_info">
          <span>当前要素认证状态：<span>认证审核中</span></span>
          <span>要素信息更新日期：2020-09-25</span>
        </div>
      </div>
      <div class="status-content">
        <p>您提交的要素认证信息未通过审核，未通过原因：xxxxxxxxxxxxxxxxxx</p>
        <a-button>Default</a-button>
      </div>
    </div>
    <!--  机构表单信息  -->
    <FormOrg v-if="false"></FormOrg>
    <FormLaw></FormLaw>
  </div>
</template>

<script>
import FormOrg from './form-org';
import FormLaw from './form-law';
export default {
  name: 'factor',
  nameComment: '要素认证',
  components:{
    FormOrg,
    FormLaw
  },
  data() {
    return {
      spinning:false
    };
  },
  mounted() {
    // console.log('当前要素未认证！=== not ');
    // setTimeout(()=>{
    //   this.spinning = false;
    // },300)
  },
}
</script>

<style scoped lang='scss'>
.factor-wrapper {
  height: 100%;
  background-color: #fff;
  .spin-wrapper {
    width: 100%;
    height: 40%;
    line-height: 3;
  }
  .factor-status{
    padding: 20px;
    line-height: 32px;
    border-bottom: 1px solid #dddddd;
    .status-header{
      display: flex;
      justify-content: space-between;
      &_title{
        font-size: 20px;
      }
      &_info{
        span:first-child{
          margin-right: 20px;
        }
      }
    }
    .status-content{
      text-align: center;
    }
  }
}
</style>
<style lang='scss'>
.factor-form-wrapper{
  padding: 20px;
  .factor-form-subtitle{
    padding-left: 10px;
    font-size: 16px;
    line-height: 20px;
    height: 20px;
    border-left: 4px solid $common-base;
    text-align: left;
    margin: 10px 0;
  }
  .form-item-row{
    .ant-form-item-children{
      display: block;
      .ant-radio-group,.ant-checkbox-group{
        display: block;
      }
    }
    .ant-row{
      line-height: 40px;
    }
  }
}
</style>
