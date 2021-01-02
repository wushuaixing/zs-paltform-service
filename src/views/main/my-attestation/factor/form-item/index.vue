<template>
  <div>
		<FormLaw ref="LawFormRef" :source="lawData" :isFirst="true" v-if="role===1"></FormLaw>
		<FormOrg ref="OrgFormRef" :source="orgData" :isFirst="false" v-if="role===2"></FormOrg>
		<FormPublic ref="PublicFormRef" :source="publicData" :role="roleType" :isFirst="true"></FormPublic>
		<FormOffice v-if="role===1&&officeInfo" ref="OfficeFormRef" :source="officeData" :isFirst="true"></FormOffice>
    <a-form-item :wrapperCol="{span:24}" v-if="!officeInfo && role===1">
      <a-button type="dashed" block icon="plus" @click="handleAddOffice">添加律所信息</a-button>
    </a-form-item>
    <a-form-item class="submit-btn">
      <a-button type="primary" @click="handleSubmit"> 确认无误并提交</a-button>
    </a-form-item>
  </div>
</template>

<script>
import FormLaw from './form-law';
import FormOffice from './form-office';
import FormOrg from './form-org';
import FormPublic from './form-public';
// import {factor} from "@/plugin/api/attest";

export default {
  name: "FactorForm",
  components: {
    FormLaw,
    FormOffice,
    FormOrg,
    FormPublic,
  },
  data() {
    return {
      officeInfo: false,
      visible: false,
      lawData: {
        area: "11,1101,110101",
        areasOfGoodCases: "擅长业务区域",
        badAssetsWorkExp: "执业经历（不良）",
        competentCourt: "主要代理案件管辖法院",
        // confidentialityCommitmentLetter: "[{"uid":"vc-upload-1609379176277-5","name":"新建 Microsoft Word 文档.docx","type":"application/vnd.openxmlformats-officedocument.wordprocessingml.document","hash":"FjcvE1OJLumVFIL9kww2MtgXgKi3"}]",
        familiarCourts: "熟悉法院",
        formerWorkUnit: "曾就业律所",
        graduateSchool: "毕业院校",
        isInStorage: "1",
        isWorkOfPublicSecurityOrgans: "1",
        isWorkOther: "1",
        major: "专业",
        notBadAssetsWorkExp: "执业经历（非不良）",
        otherGoodCases: "擅长其他业务类型",
        otherResources: '1,4',
        otherResourcesAdvantage: "其他社会资源优势",
        workArea: "14,14/1404",
        workRole: "兼职/任职职务",
        workUnitName: "兼职任职单位",
        workingTime: "2",
        goodCases: '1,3,5',
        otherResourcesDetail: '其他资源补充',
      },
      officeData: {
        hasOtherOffice: "1",
        isWorkForThreeYear: "1",
        lawOfficeAddress: "律所地址",
        lawOfficeInformation: "律所简介",
        lawOfficeName: "律所名称",
        lawOfficeQualify: "律所资质",
        lawOfficeQualifyPerformance: "律所业绩介绍",
        lawOfficeType: "1",
        officeWorkAddress: "15/1505/150523",
        otherOfficeStaffInfo: "分所人员情况",
        otherOfficeWorkAddress: "15",
        roleInLawOffice: "1",
        totalTeamSize: "3434",
      },
      orgData: {
        areasOfGoodCases: "13,14,15", //擅长业务区域
        branchOfficeAddress: "15/1505",//分布地区
        goodCases: "0,1,2,4,3", //擅长业务类型
        hasInvestmentBankExperience: "1", //是否有投行项目经验
        hasInvestmentIntention: "1", //是否有投资意向
        headOfficeAddress: "11,1101,110101", //机构总部所在地
        investmentArea: "11,1101,110101", //投资区域
        investmentBankProjectCase: "423423",//历史投行项目案例
        investmentExperience: "423423423", //以往投资经历
        investmentPreferenceType: "1,5,9,4", //投资偏好类型
        numberOfCompany: 432423, //公司总人数
        numberOfTeams: 432423, //团队数
        organizationInformation: "workingTime",//机构简介
        organizationalStructureInformation: "423432",//组织架构描述
        otherGoodCases: "432423",//擅长的其他业务类型
        otherMasterSubject: "423432",//所控制的其他主体
        otherResourcesAdvantage: "423432432",//其他社会资源优势
        totalTeamSize: 423432,//团队总人数
        workingTime: "0",//从业时间
      },
      publicData: {
        cooperatedAmc: '1,3',
        cooperatedAmcDetail: "具体合作AMC",
        cooperationIntention: '1,3,4,5,6,7,',
        cooperationSituation: "其他AMC合作情况",
        isCooperatedWithOtherAmc: "1",
        isCooperatedWithZheshang: "1",
        isCooperatedWithZheshangDetail: "是否曾于浙商合作补充",
        once_col: "历史清收情况",
        otherCooperationIntention: "合作意向补充",
        typeOfCooperationCode: '1,3',
      },
    }
  },
  props: {
    role: {
      type: Number,
      default: 1,
    },
    //是否填写律师
    isOfficeFill:{
      type: Boolean,
      default: true,
    }
  },
	computed:{
		roleType(){
			return this.role === 1 ? 'lawyer' : 'org'
		}
	},
  methods: {
    async handleSubmit(e) {
      const {OrgFormRef,OfficeFormRef} = this.$refs;
      if (this.role === 1) {
        // PublicFormRef.handleSubmit(e);
        OfficeFormRef.handleSubmit(e);
        // console.log(await OfficeFormRef.handleSubmit(e))
      } else {
        OrgFormRef.handleSubmit(e);
        // PublicFormRef.handleSubmit(e);
      }
    },
    visibleChange(val) {
      this.visible = val;
    },
    // 移除 律所相关信息警告
    DeleteLawInfo() {
      const _this = this;
      this.$confirm({
        title: '警告',
        content: '确认退出律所信息添加吗',
        okText: '确定',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          _this.officeInfo = false;
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
    handleAddOffice() {
      this.officeInfo = true;
    },

  },

}
</script>

<style scoped>

</style>
