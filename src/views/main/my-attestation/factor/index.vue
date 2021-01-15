<template>
  <div class="factor-wrapper qualifies-wrapper">
    <a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......"/>
    <template v-if="!spinning">
      <!-- 填写相关要素信息 -->
			<div v-if="identity && status(0)">
				<FormItem :dataSource="dataSource" :is-lawyer="identity === 1" @toTellRes="handleSubmit">
					<div class="qualifies-item qualifies-status" slot="title">
						<div class="item-title status-title">
							<div class="status-title-identity">
								<span>我的服务商身份：</span>
								<img :src="mine.icon" alt="" style="height: 32px;vertical-align: top;">
								<span style="margin-left: 10px">{{mine.text}}</span>
							</div>
						</div>
					</div>
				</FormItem>
			</div>
      <!-- 要素相关审核 展示 -->
      <template v-if="identity && !status(0)">
				<a-affix :offset-top="64">
					<!-- 要素认证信息 -->
					<div class="qualifies-item qualifies-status">
						<div class="item-title status-title">
							<div class="status-title-identity">
								<span>我的服务商身份：</span>
								<img :src="mine.icon" alt="" style="height: 32px;vertical-align: top;">
								<span style="margin-left: 10px">{{mine.text}}</span>
							</div>
							<ul class="status-title-attribute">
								<li>当前要素认证状态：<font :class="info.class">{{info.desc}}</font></li>
								<li v-if="statusInfo.elementModifyDate">要素信息更新日期：{{statusInfo.elementModifyDate}}</li>
							</ul>
						</div>
					</div>
					<!-- 要素认证提醒 -->
					<div class="qualifies-item qualifies-status" v-if="status(245) || info.halfStatus">
						<div class="status-content" v-if="info.halfStatus">
							<div>您已有半年未更新要素认证信息，若要素认证信息发生变化，请及时进行更新！</div>
							<a-button type="primary"  @click="handleEdit">立即更新</a-button>
							<a-button @click="handleDelayUpdate">确认无变化，暂不更新</a-button>
						</div>
						<template v-else>
							<div class="status-content" v-if="status(245)">
								<div>{{info.text}}</div>
								<a-button @click="getFactorLog" type="primary" :loading="loading">{{info.btn}}</a-button>
								<a-button v-if="status(5)" @click="handleDrop">放弃修改</a-button>
							</div>
						</template>
					</div>
					<!-- 要素认证状态 -->
					<div class="qualifies-info" v-if="status(1)">
						<div class="info-image-status">
							<img src="../../../../assets/img/no_data.png" alt="">
							<p class="image-status-remark">您要提交的要素认证信息正在审核中 ，请您耐心等待</p>
							<a-button @click="getFactorLog" type="primary" :loading="visibleLoading">查看我提交的要素认证</a-button>
						</div>
					</div>
				</a-affix>

				<!-- 要素信息展示 -->
        <DetailInfo v-if="status(3456)" :is-lawyer="identity === 1" :source="dataSource"
										isEdit @editInfo="handleEdit" @addOffice="handleAddOffice" :fixed="status(1245)?235:124"/>
				<div class="qualifies-info" v-if="status(9)">
					<div class="info-image-status">
						<img src="../../../../assets/img/no-finished.png" alt="" style="width: 400px;">
						<p class="image-status-remark">网络请求异常，请稍后重试!</p>
					</div>
				</div>

      </template>
			<div class="qualifies-info" v-if="status(99)">
				<div class="info-image-status" style="margin-top: 180px">
					<img src="../../../../assets/img/no-finished.png" alt="" style="width: 265px;">
					<p class="image-status-remark">您尚未完成资质认证，请先完成资质认证！</p>
					<router-link to="/attest/qualifies">
						<a-button type="primary">立即前往资质认证</a-button>
					</router-link>
				</div>
			</div>
    </template>
		<a-modal v-model="modalVisible" :title="modalTitle" :maskClosable="false" :width="1000" class="factor-modal-wrapper" :keyboard="false">
			<DetailInfo :source="dataSourceLog" :is-lawyer="identity === 1" v-if="modalStep===0" />
			<FormItem :isLawyer="identity === 1" v-if="modalStep===1" noSubmit :onlyUpdateOffice="!!dataSourceLog.lawOffice"
								:dataSource="dataSourceLog" @toTellRes="handleSubmit" ref="fillFromRef" />
			<template slot="footer">
				<div style="text-align: center" v-if="modalStep === 0">
					<a-space>
						<a-button key="back" @click="handleModalClose">关闭</a-button>
						<a-button key="submit" type="primary" @click="modalStep = 1">修改并重新提交</a-button>
					</a-space>
				</div>
				<div style="text-align: center" v-if="modalStep === 1">
					<a-space>
						<a-button key="back" @click="handleModalClose">关闭</a-button>
						<a-button key="back" @click="modalStep=0" v-show="onlyEdit">取消</a-button>
						<a-button key="submit" type="primary" @click="handleEditInfo">确认修改并提交</a-button>

					</a-space>
				</div>
			</template>
		</a-modal>
		<a-modal v-model="modalVisibleOffice" title="律所信息认证" :maskClosable="false" :width="1000">
			<FormItemOffice ref="OfficeFormRef" />
			<template slot="footer">
				<div style="text-align: center" >
					<a-button key="submit" type="primary" :loading="auctionLoading" @click="toAddOffice">
						确认修改并提交</a-button>
					<a-button key="back" @click="modalVisibleOffice = false" style="margin-left: 30px">关闭</a-button>
				</div>
			</template>
		</a-modal>
	</div>
</template>

<script>

// import { FormOrg, FormLaw, FormLawOff } from './form';
import DetailInfo from './detail';
import FormItem from './form-item';
import FormItemOffice from './form-item/form-office';
import { factor } from "@/plugin/api/attest";
import IconLaw from '@/assets/img/lawyer.png';
import IconOrg from '@/assets/img/org.png';

// 要素审核相关状态
const factorStatus = {
  0:{ desc:"未认证", text:""},
  1:{ desc:"认证审核中", text:"",class:'text-error'},
  2:{ desc:"认证未通过", text:"您提交的要素认证信息未通过审核，未通过原因：",class:'text-dangerous',btn:'编辑并重新提交'},
  3:{ desc:"审核通过", text:"",class:'text-success'},
  4:{ desc:"认证修改审核中", text:"您提交的要素认证信息修改正在审核中，请耐心等待审核结果",class:'text-warning',btn:'查看我提交的认证修改信息'},
  5:{ desc:"认证修改未通过", text:"您提交的要素认证信息修改未通过审核，未通过原因：",class:'text-dangerous',btn:'编辑并重新提交'},
  6:{ desc:"审核通过", text:"",class:'text-success'},
};

export default {
  name: 'factor',
  nameComment: '要素认证',
  components:{
	  DetailInfo,
	  FormItem,
	  FormItemOffice,
  },
  data() {
    return {
      spinning: true,
			loading: false,
	    visibleLoading: false,
	    modalVisible: false,
	    modalVisibleOffice: false,
			auctionLoading:false,
	    onlyEdit:false,
	    modalStep: 0,
      identity: '',
      statusInfo:{
        elementAuditStatus: 0,
        elementModifyDate: '',
        reasonOfNotPass: '',
        remindBaseTime: '',
      },
			dataSource: {},
			dataSourceLog: {},
			logId:'',
    };
  },
  methods:{
    // 判断数据当前状态
    status(rule){
      const { elementAuditStatus: q} = this.statusInfo;
      if(rule === '') return false;
      return  rule.toString() ? new RegExp(q).test(rule) : q;
    },
	  // 查询记录表中，当前最新记录
	  getFactorLog(){
		  this.visibleLoading = true;
		  const api = this.identity === 1 ? factor.lawyerLog : factor.orgLog;
		  api().then(({data = {},code})=>{
			  if(code === 20000){
				  const { element = {},organizationElementVO = {} } = data || {};
				  this.dataSourceLog = {
					  ...element,
					  ...organizationElementVO
				  };
				  this.modalVisible = true;
				  this.modalStep = 0;
			  }else{
				  this.$message.error('网络请求异常，请重新请求!');
			  }
		  }).finally(()=>{
			  this.visibleLoading = false;
		  })
	  },
	  // 查询当前服务商的要素属性状态
	  queryFactor(){
		  factor.element().then(({data = {},code})=>{
			  if(code === 20000){
				  const {
					  elementCondition, element = {}, organizationElementVO = {},logId
				  } = (data['lawyerElementDetail'] || data['organizationElementDetail']) || {};
				  this.statusInfo = elementCondition || {};
				  this.logId = logId;
				  this.dataSource = {
					  ...element,
					  ...organizationElementVO,
						...elementCondition,
				  };
				  this.spinning = false;

			  } else if(code === 80001){
				  this.statusInfo = {
					  elementAuditStatus: 0,
					  elementModifyDate: '',
					  reasonOfNotPass: '',
					  remindBaseTime: '',
				  };
				  this.spinning = false;
			  } else{
				  this.$error({
					  title: '提示',
					  content: '网络请求异常，请重新请求!',
				  });
				  this.statusInfo = {
					  elementAuditStatus: 9,
					  elementModifyDate: '',
					  reasonOfNotPass: '',
					  remindBaseTime: '',
				  };
			  }
		  }).catch(()=>{
			  this.$error({
				  title: '提示',
				  content: '网络请求异常，请重新请求!',
			  });
		  })
	  },
	  // 关闭弹窗
	  handleModalClose(){
		  this.modalStep = 0;
		  this.modalVisible = false;
	  },
		// 添加律所信息
	  handleAddOffice(){
			console.log('handleAddOffice',this.logId);
			this.modalVisibleOffice = true;
		},
		toAddOffice(){
			const office = this.$refs.OfficeFormRef;
			if(office){
				office.handleSubmit().then(data=>{
					this.auctionLoading = true;
					factor.officeAdd({
						elementId:this.logId,
						roleInLawOffice:data.roleInLawOffice,
						lawOffice:data
					}).then(res=>{
						if(res.code === 20000){
							this.$message.success('律所信息添加成功！',1,()=>{
								this.modalVisibleOffice = false;
								this.queryFactor();
							})
						}else{
							this.$message.error('网络请求错误！')
						}
					}).finally(()=>{
						this.auctionLoading = false;
					})
				})
			}
		},
	  // 提交我的资质信息
	  handleSubmit(val){
		  console.log(val);
		  this.$store.commit("updateElement");
		  this.$message.success('要素认证提交成功！');
		  this.queryFactor();
		  this.handleModalClose();
	  },
	  // 编辑我的资质信息 - 查看且编辑
	  handleEditInfo(e){
		  const { fillFromRef } = this.$refs;
		  fillFromRef.handleSubmit(e);
	  },
	  // 编辑我的资质信息 - 仅编辑
	  handleEdit(){
		  this.modalVisible = true;
		  this.dataSourceLog = {...this.dataSource};
		  this.modalStep = 1;
		  this.onlyEdit = false;
	  },
	  // 放弃修改
	  handleDrop(){
		  factor.dropModify().then(res=>{
			  if(res.code === 20000){
				  this.$message.success('当前认证修改申请，已放弃');
				  this.queryFactor();
			  }else{
				  this.$message.error('操作失败，请稍后操作！');
			  }
		  })
	  },
	  handleDelayUpdate(){
		  factor.delayUpdate().then(res=>{
			  if(res.code === 20000){
				  this.$message.success('推迟更新成功！');
				  this.queryFactor();
			  }else{
				  this.$message.error('操作失败，请稍后操作！');
			  }
		  })
	  },
  },
  computed:{
    info() {
      const { reasonOfNotPass, elementAuditStatus } = this.statusInfo;
	    // remindBaseTime
			let halfStatus = false;
			// if(remindBaseTime){
			// 	halfStatus = Date.parse(new Date(remindBaseTime)) < Date.parse(new Date())
			// }
	    return {
        ...factorStatus[elementAuditStatus],
        text:(factorStatus[elementAuditStatus] || {}).text + (reasonOfNotPass || ''),
        halfStatus,
      };
    },
	  mine(){
			return {
				icon: this.identity === 1 ? IconLaw : IconOrg,
				text: this.identity === 1 ? '律师' : '机构',
			}
		},
	  modalTitle(){
		  return this.modalStep === 0 ? "我提交的认证信息" : "我提交的认证信息-编辑";
	  },
  },
  mounted() {
		const info = this.$store.getters.getInfo;
    this.identity = info.identity;
    console.log(info);
    if(info.isSubmitCertify){
	    this.queryFactor();
    }else{
	    this.statusInfo = {
		    elementAuditStatus: 99,
		    elementModifyDate: '',
		    reasonOfNotPass: '',
		    remindBaseTime: '',
	    };
	    this.spinning = false;
		}
  },
}

// const _dataSource = {
// 	lawData: {
// 		area: "11,1101,110101",
// 		areasOfGoodCases: "擅长业务区域",
// 		badAssetsWorkExp: "执业经历（不良）",
// 		competentCourt: "主要代理案件管辖法院",
// 		familiarCourts: "熟悉法院",
// 		formerWorkUnit: "曾就业律所",
// 		graduateSchool: "毕业院校",
// 		isInStorage: "1",
// 		isWorkOfPublicSecurityOrgans: "1",
// 		isWorkOther: "1",
// 		major: "专业",
// 		notBadAssetsWorkExp: "执业经历（非不良）",
// 		otherGoodCases: "擅长其他业务类型",
// 		otherResources: '1,4',
// 		otherResourcesAdvantage: "其他社会资源优势",
// 		workArea: "14,14/1404",
// 		workRole: "兼职/任职职务",
// 		workUnitName: "兼职任职单位",
// 		workingTime: "2",
// 		goodCases: '1,3,5',
// 		otherResourcesDetail: '其他资源补充',
// 		cooperatedAmc: '1,3',
// 		cooperatedAmcDetail: "具体合作AMC",
// 		cooperationIntention: '1,3,4,5,6,7,',
// 		cooperationSituation: "其他AMC合作情况",
// 		isCooperatedWithOtherAmc: "1",
// 		isCooperatedWithZheshang: "1",
// 		isCooperatedWithZheshangDetail: "是否曾于浙商合作补充",
// 		once_col: "历史清收情况",
// 		otherCooperationIntention: "合作意向补充",
// 		typeOfCooperationCode: '1,3',
// 		officeData: {
// 			hasOtherOffice: "1",
// 			isWorkForThreeYear: "1",
// 			lawOfficeAddress: "律所地址",
// 			lawOfficeInformation: "律所简介",
// 			lawOfficeName: "律所名称",
// 			lawOfficeQualify: "律所资质",
// 			lawOfficeQualifyPerformance: "律所业绩介绍",
// 			lawOfficeType: "1",
// 			officeWorkAddress: "15/1505/150523",
// 			otherOfficeStaffInfo: "分所人员情况",
// 			otherOfficeWorkAddress: "15",
// 			roleInLawOffice: "1",
// 			totalTeamSize: "3434",
// 		},
// 	},
// 	orgData: {
// 		areasOfGoodCases: "13,14,15", //擅长业务区域
// 		branchOfficeAddress: "15/1505",//分布地区
// 		goodCases: "0,1,2,4,3", //擅长业务类型
// 		hasInvestmentBankExperience: "1", //是否有投行项目经验
// 		hasInvestmentIntention: "1", //是否有投资意向
// 		headOfficeAddress: "11,1101,110101", //机构总部所在地
// 		investmentArea: "11,1101,110101", //投资区域
// 		investmentBankProjectCase: "423423",//历史投行项目案例
// 		investmentExperience: "423423423", //以往投资经历
// 		investmentPreferenceType: "1,5,9,4", //投资偏好类型
// 		numberOfCompany: 432423, //公司总人数
// 		numberOfTeams: 432423, //团队数
// 		organizationInformation: "workingTime",//机构简介
// 		organizationalStructureInformation: "423432",//组织架构描述
// 		otherGoodCases: "432423",//擅长的其他业务类型
// 		otherMasterSubject: "423432",//所控制的其他主体
// 		otherResourcesAdvantage: "423432432",//其他社会资源优势
// 		totalTeamSize: 423432,//团队总人数
// 		workingTime: "0",//从业时间
// 		cooperatedAmc: '1,3',
// 		cooperatedAmcDetail: "具体合作AMC",
// 		cooperationIntention: '1,3,4,5,6,7,',
// 		cooperationSituation: "其他AMC合作情况",
// 		isCooperatedWithOtherAmc: "1",
// 		isCooperatedWithZheshang: "1",
// 		isCooperatedWithZheshangDetail: "是否曾于浙商合作补充",
// 		once_col: "历史清收情况",
// 		otherCooperationIntention: "合作意向补充",
// 		typeOfCooperationCode: '1,3',
// 	},
// 	lawData2: {
// 		area: "11,1101,110101",
// 		areasOfGoodCases: "擅长业务区域",
// 		badAssetsWorkExp: "执业经历（不良）",
// 		competentCourt: "主要代理案件管辖法院",
// 		// confidentialityCommitmentLetter: "[{"uid":"vc-upload-1609379176277-5","name":"新建 Microsoft Word 文档.docx","type":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","hash":"FjcvE1OJLumVFIL9kww2MtgXgKi3"}]",
// 		familiarCourts: "熟悉法院",
// 		formerWorkUnit: "曾就业律所",
// 		graduateSchool: "毕业院校",
// 		isInStorage: "1",
// 		isWorkOfPublicSecurityOrgans: "1",
// 		isWorkOther: "1",
// 		major: "专业",
// 		notBadAssetsWorkExp: "执业经历（非不良）",
// 		otherGoodCases: "擅长其他业务类型",
// 		otherResources: '1,4',
// 		otherResourcesAdvantage: "其他社会资源优势",
// 		workArea: "14,14/1404",
// 		workRole: "兼职/任职职务",
// 		workUnitName: "兼职任职单位",
// 		workingTime: "2",
// 		goodCases: '1,3,5',
// 		otherResourcesDetail: '其他资源补充',
// 	},
// 	officeData: {
// 		hasOtherOffice: "1",
// 		isWorkForThreeYear: "1",
// 		lawOfficeAddress: "律所地址",
// 		lawOfficeInformation: "律所简介",
// 		lawOfficeName: "律所名称",
// 		lawOfficeQualify: "律所资质",
// 		lawOfficeQualifyPerformance: "律所业绩介绍",
// 		lawOfficeType: "1",
// 		officeWorkAddress: "15/1505/150523",
// 		otherOfficeStaffInfo: "分所人员情况",
// 		otherOfficeWorkAddress: "15",
// 		roleInLawOffice: "1",
// 		totalTeamSize: "3434",
// 	},
// 	orgData2: {
// 		areasOfGoodCases: "13,14,15", //擅长业务区域
// 		branchOfficeAddress: "15/1505",//分布地区
// 		goodCases: "0,1,2,4,3", //擅长业务类型
// 		hasInvestmentBankExperience: "1", //是否有投行项目经验
// 		hasInvestmentIntention: "1", //是否有投资意向
// 		headOfficeAddress: "11,1101,110101", //机构总部所在地
// 		investmentArea: "11,1101,110101", //投资区域
// 		investmentBankProjectCase: "423423",//历史投行项目案例
// 		investmentExperience: "423423423", //以往投资经历
// 		investmentPreferenceType: "1,5,9,4", //投资偏好类型
// 		numberOfCompany: 432423, //公司总人数
// 		numberOfTeams: 432423, //团队数
// 		organizationInformation: "workingTime",//机构简介
// 		organizationalStructureInformation: "423432",//组织架构描述
// 		otherGoodCases: "432423",//擅长的其他业务类型
// 		otherMasterSubject: "423432",//所控制的其他主体
// 		otherResourcesAdvantage: "423432432",//其他社会资源优势
// 		totalTeamSize: 423432,//团队总人数
// 		workingTime: "0",//从业时间
// 	},
// 	publicData1: {
// 		cooperatedAmc: '1,3',
// 		cooperatedAmcDetail: "具体合作AMC",
// 		cooperationIntention: '1,3,4,5,6,7,',
// 		cooperationSituation: "其他AMC合作情况",
// 		isCooperatedWithOtherAmc: "1",
// 		isCooperatedWithZheshang: "1",
// 		isCooperatedWithZheshangDetail: "是否曾于浙商合作补充",
// 		once_col: "历史清收情况",
// 		otherCooperationIntention: "合作意向补充",
// 		typeOfCooperationCode: '1,3',
// 	},
// };
</script>

<style lang='scss'>
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
    margin-bottom: 25px;
    .classTitle_subtitle{
      font-size: 16px;
      line-height: 32px;
      font-weight: bolder;
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
	.factor-modal-wrapper{
		.ant-modal-body{
			padding: 0;
		}
	}
</style>
