<template>
  <div class="factor-wrapper qualifies-wrapper">
    <a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......"/>
    <template v-if="!spinning">
      <!-- 填写相关要素信息 -->
      <template v-if="identity && status(0)">
				<span>填写相关要素信息</span>
      </template>
      <!-- 要素相关审核 展示 -->
      <template v-if="identity && !status(0)">
        <!-- 要素认证信息 -->
        <div class="qualifies-item qualifies-status">
          <div class="item-title status-title">
            <div class="status-title-identity">
              <span>我的服务商身份：</span>
							<img :src="mine.icon" alt="" style="height: 32px;vertical-align: top;">
							<span style="margin-left: 10px">{{mine.text}}</span>
            </div>
            <ul class="status-title-attribute">
              <li>当前要素认证状态：<b :class="info.class">{{info.desc}}</b></li>
              <li v-if="statusInfo.elementAuditStatus">要素信息更新日期：{{statusInfo.elementModifyDate}}</li>
            </ul>
          </div>
        </div>
        <!-- 要素认证提醒 -->
        <div class="qualifies-item qualifies-status" v-if="status(245) || info.halfStatus">
          <div class="status-content" v-if="status(245)">
            <div>{{info.text}}</div>
						<a-button @click="getFactorLog" type="primary" :loading="loading">{{info.btn}}</a-button>
						<a-button v-if="status(5)">放弃修改</a-button>
          </div>
          <div class="status-content" v-if="info.halfStatus">
            <div>您已有半年未更新要素认证信息，若要素认证信息发生变化，请及时进行更新！</div>
						<a-button type="primary">立即更新</a-button>
						<a-button>放弃修改</a-button>
          </div>
        </div>
        <!-- 要素认证状态 -->
        <div class="qualifies-info" v-if="status(1)">
          <div class="info-image-status">
            <img src="../../../../assets/img/blank_nodata.png" alt="">
            <p class="image-status-remark">您要提交的要素认证信息正在审核中 ，请您耐心等待</p>
            <a-button @click="getFactorLog" type="primary" :loading="loading">查看我提交的资质认证</a-button>
          </div>
        </div>
        <!-- 要素信息展示 -->
        <DetailInfo v-if="status(23456)" :is-lawyer="identity === 1"/>
      </template>
    </template>
  </div>
</template>

<script>

// import { FormOrg, FormLaw, FormLawOff } from './form';
import DetailInfo from './detail';
import { factor } from "@/plugin/api/attest";
import IconLaw from '@/assets/img/lawyer.png';
import IconOrg from '@/assets/img/org.png';

// 要素审核相关状态
const factorStatus = {
  0:{ desc:"未认证", text:""},
  1:{ desc:"认证审核中", text:"",class:'text-error'},
  2:{ desc:"认证未通过", text:"您提交的要素认证信息未通过审核，未通过原因：",class:'text-dangerous',btn:'编辑并重新提交'},
  3:{ desc:"认证审核通过", text:"",class:'text-success'},
  4:{ desc:"认证修改审核中", text:"您提交的要素认证信息修改正在审核中，请耐心等待审核结果",class:'text-error',btn:'查看我提交的认证修改信息'},
  5:{ desc:"认证修改未通过", text:"您提交的要素认证信息修改未通过审核，未通过原因：",class:'text-dangerous',btn:'编辑并重新提交'},
  6:{ desc:"认证修改审核通过", text:"",class:'text-success'},
};

export default {
  name: 'factor',
  nameComment: '要素认证',
  components:{
	  DetailInfo,
  },
  data() {
    return {
      spinning:false,
			loading:false,
      identity:'',
      statusInfo:{
        elementAuditStatus: 3,
        elementModifyDate: '',
        reasonOfNotPass: '',
        remindBaseTime: '',
      },
    };
  },
  methods:{
    // 判断数据当前状态
    status(rule){
      const { elementAuditStatus: q} = this.statusInfo;
      return  rule.toString() ? new RegExp(q).test(rule) : q;
    },
	  // 查询记录表中，当前最新记录
	  getFactorLog(){
		  console.log('getFactorLog');
	  },
		// 放弃更新

  },
  computed:{
    info() {
      const { reasonOfNotPass, elementAuditStatus, remindBaseTime} = this.statusInfo;
      return {
        ...factorStatus[elementAuditStatus],
        text:factorStatus[elementAuditStatus].text + (reasonOfNotPass || ''),
        halfStatus: Boolean(remindBaseTime),
      };
    },
	  mine(){
			return {
				icon: this.identity === 1 ? IconLaw : IconOrg,
				text: this.identity === 1 ? '律师' : '机构',
			}
		},
  },
  mounted() {
    // this.identity = this.$store.getters.getInfo.identity;
    this.identity = 2;
    factor.element().then(res=>{
      console.log( res);
    })
  },
}
</script>

<style scoped lang='scss'>
.factor-wrapper {
  height: 100%;
  background-color: #fff;
}
</style>
<style lang='scss'>
.factor-form-wrapper{
  padding: 20px;
	.badge-dot{
		width: 15px;
		height: 15px;
		display: inline-block;
		border-radius: 50%;
		background: red;
	}
  .factor-form-subtitle{
    text-align: left;
    padding: 10px 0;
    span{
      display: block;
      padding-left: 10px;
      border-left: 4px solid $common-base;
      font-size: 16px;
      line-height: 20px;
      height: 20px;
    }
  }
  .factor-form-classTitle-wrapper{

  }
  .factor-form-classTitle{
    display: flex;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 1px solid $border-base;
    margin-bottom: 14px;
    .classTitle_subtitle{
      font-size: 16px;
      line-height: 32px;
      span{
        margin-left: 10px;
      }
    }
  }
  .form-item-row{
    .ant-form-item-children{
      display: block;
      .ant-radio-group,.ant-checkbox-group{
        display: block;
      }
    }
    .ant-row{
      line-height: 32px;
    }
  }
  .form-item-no-title{
    .ant-form-item-label label:after{
      content:' '
    }
  }
}
</style>
