<template>
  <div class="qualifies-info-wrapper">
    <slot name="title"/>
    <div class="factor-content">
      <!--机构信息展示-->
      <div class="info-item" v-if="userinfo.identity === 2">
        <div class="info-type">
          <span>机构信息</span>
          <span><a-icon type="edit"/> 编辑我的要素信息</span>
        </div>
        <a-form v-bind="formItemLayout">
          <div class="factor-form-subtitle"><span>基本背景</span></div>
          <a-form-item label="机构简介">{{ organizationElementVO.organizationInformation }}</a-form-item>
          <a-form-item label="从业不良经验时间">暂未有落地项目</a-form-item>
          <a-form-item label="公司总部所在地">{{ organizationElementVO.headOfficeAddress }}</a-form-item>
          <a-form-item label="清收团队数">{{ organizationElementVO.numberOfTeams }}</a-form-item>
          <a-form-item label="清收团队总人数">{{ organizationElementVO.numberOfCompany }}</a-form-item>
          <a-form-item label="组织架构">{{ organizationElementVO.organizationalStructureInformation }}</a-form-item>
        </a-form>
        <a-form v-bind="formItemLayout">
          <div class="factor-form-subtitle"><span>擅长优势</span></div>
          <a-form-item label="擅长业务类型">{{ organizationElementVO.otherGoodCases | typeBusiness }}</a-form-item>
          <a-form-item label="擅长业务区域">{{ organizationElementVO.areasOfGoodCases }}</a-form-item>
        </a-form>
        <a-form v-bind="formItemLayout">
          <div class="factor-form-subtitle"><span>历史合作情况</span></div>
          <a-form-item label="是否曾与四大合作">-</a-form-item>
          <a-form-item label="历史合作四大">{{ organizationElementVO.branchOfficeAddress | historyCooperation }}</a-form-item>
          <a-form-item label="是否曾与浙商合作">{{ organizationElementVO.isCooperatedWithZheshang | factorWith }}</a-form-item>
          <a-form-item label="过往合作类型">{{ organizationElementVO.typeOfCooperationCode |typeCooperation }}</a-form-item>
          <a-form-item label="历史合作团队">{{ organizationElementVO.cooperationTeam }}</a-form-item>
          <a-form-item label="历史清收情况">{{ organizationElementVO.liquidationSituation }}</a-form-item>
          <a-form-item label="其他AMC合作情况">{{ organizationElementVO.cooperationSituation }}</a-form-item>
        </a-form>
        <a-form v-bind="formItemLayout">
          <div class="factor-form-subtitle"><span>后续期望合作方向</span></div>
          <a-form-item label="合作意向">{{ organizationElementVO.cooperationIntention | IntentionCooperation }}
          </a-form-item>
        </a-form>
      </div>
      <!--律师详情展示-->
      <div class="info-item" v-if="userinfo.identity === 1" id="attorney">
        <a href="#attorney" :class="btn === '律师信息' ? 'button-attorney attorney_btn' : 'attorney_btn'"
           @click="switchInform('律师信息')">律师信息</a>
        <a href="#lawOffice " :class="btn === '律所信息' ? 'button-attorney attorney_btn' : 'attorney_btn'"
           @click="switchInform('律所信息')">律所信息</a>
        <!--律师信息-->
        <div>
          <div class="info-type">
            <span>律师信息</span>
            <span><a-icon type="edit"/> 编辑我的要素信息</span>
          </div>
          <a-form v-bind="formItemLayout">
            <div class="factor-form-subtitle"><span>个人背景</span></div>
            <a-form-item label="毕业院校">{{ element.graduateSchool }}</a-form-item>
            <a-form-item label="专业">{{ element.major }}</a-form-item>
            <a-form-item label="从业不良经验">暂定</a-form-item>
            <a-form-item label="主要涉及地区">{{ element.workArea }}</a-form-item>
            <a-form-item label="是否有公检法等工作经历">{{ whether[element.isWorkOfPublicSecurityOrgans] }}</a-form-item>
            <a-form-item label="当前是否存在其他兼职/任职">{{ element.workRole }}</a-form-item>
          </a-form>
          <a-form v-bind="formItemLayout">
            <div class="factor-form-subtitle"><span>擅长优势</span></div>
            <a-form-item label="擅长业务类型">{{ coodClass[element.goodCases] }}</a-form-item>
            <a-form-item label="擅长业务区域">{{ element.areasOfGoodCases }}</a-form-item>
            <a-form-item label="其他资源">{{ resources[element.otherResources] }}</a-form-item>
          </a-form>
          <a-form v-bind="formItemLayout">
            <div class="factor-form-subtitle"><span>历史合作情况</span></div>
            <a-form-item label="历史合作四大">{{ element.cooperatedAmc | historyCooperation }}</a-form-item>
            <a-form-item label="是否曾与浙商合作">{{ whether[element.isCooperatedWithZheshang] }}</a-form-item>
            <a-form-item label="其他AMC合作情况">{{ whether[element.isCooperatedWithOtherAmc] }}</a-form-item>
          </a-form>
          <a-form v-bind="formItemLayout">
            <div class="factor-form-subtitle"><span>后续期望合作方向</span></div>
            <a-form-item label="合作意向">{{ cooperIntention[element.cooperationIntention] }}</a-form-item>
          </a-form>
        </div>
        <!--律所信息-->
        <div id="lawOffice">
          <div class="info-type">
            <span>律所信息</span>
          </div>
          <!--判断有没律所-->
          <div v-if="true" class="notAddLawyer">
            <img src="@/assets/img/no-finished.png"/>
            <div class="text">您还未添加挂靠律师信息认证，请尽快添加！</div>
            <button>立即添加</button>
          </div>
          <div v-if="false">
            <a-form v-bind="formItemLayout">
              <div class="factor-form-subtitle"><span>后续期的合作方向</span></div>
              <a-form-item label="律所信息展示">律所信息展示</a-form-item>
            </a-form>
            <a-form v-bind="formItemLayout">
              <div class="factor-form-subtitle"><span>律所信息</span></div>
              <a-form-item label="擅长业务类型"></a-form-item>
              <a-form-item label="擅长业务区域"></a-form-item>
              <a-form-item label="其他资源"></a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {formItemLayout} from "../common/style";

export default {
  name: 'FactorInfo',
  nameComment: '要素信息展示',
  props: {
    source: {},
    isLawyer: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      formItemLayout,
      btn: '律师信息',//锚点控制按钮
      userinfo: {},
      whether: {1: '是', 2: '否', 0: '其他'},
      coodClass: {
        1: '立案/保全',
        2: '诉讼',
        3: '执行',
        4: '财产发现',
        5: '拍卖腾空',
        6: '破产/重组',
        7: '代位权',
        8: '担保合同纠纷',
        9: '资管',
        10: '境外追查',
        11: '股东责任',
        12: '公司法律纠纷',
        13: '贸融',
        14: '能矿',
        15: '房地产',
        16: '票据',
        17: '刑事交叉',
        18: '融资租赁',
        19: '并购重组',
        20: '资产推介',
        21: '投行业务',
        0: '其他',
      },
      resources: {
        1: '仲裁',
        2: '政府',
        3: '资金方',
        4: '公正',
        0: '其他',
      },
      cooperIntention: {
        1: '合作清收',
        2: '保底清收',
        3: '合作清收',
        4: '介绍投资人',
        5: '担保类项目',
        0: '其他'
      },
      //机构展示数据
      organizationElementVO: {
        areasOfGoodCases: "擅长业务区域",
        branchOfficeAddress: 1,//"历史合作（1东方，2长城，3融资，4信达0地方持牌AMC）"
        cooperatedAmc: "",
        cooperatedAmcDetail: "",
        cooperationIntention: 1,//1合作请收，2保底请收，3跟投，4介绍投资人，5担保类项目，0其他
        cooperationSituation: "其他AMC合作情况",
        cooperationTeam: "历史合作团队",
        cooperationTeamManager: "",
        endAmountOfSubject: "",
        goodCases: "1",
        hasInvestmentBankExperience: "",
        hasInvestmentIntention: "",
        headOfficeAddress: "公司总部所在地",
        investmentArea: "",
        investmentBankProjectCase: "",
        investmentExperience: "",
        investmentPreferenceType: "",
        isCooperatedWithOtherAmc: "",
        isCooperatedWithZheshang: 0,//"是否与浙商合作过（1：是，2否，0：其他）"
        isCooperatedWithZheshangDetail: "",
        liquidationSituation: "历史清收情况",
        logId: 0,
        numberOfCompany: '清收团队总人数20',
        numberOfTeams: '清收团队数6',
        organizationInformation: "机构简介",
        organizationalStructureInformation: "组织架构",
        otherCooperationIntention: "",
        otherGoodCases: 1,//（1工业2商业3住宅，0其他）
        otherMasterSubject: "",
        otherResourcesAdvantage: "",
        startAmountOfSubject: "",
        totalTeamSize: 0,
        typeOfCooperationCode: 1,//过往的合作类型（1，配资收购2资产包收购3债券请收，0其他）
        workingTime: "从业不良时间"
      },
      //律师律所信息
      element: {
        amcLawOfficeInfoId: 0,
        area: "",
        areasOfGoodCases: '律师擅长业务区域',
        badAssetsWorkExp: "",
        classicCase: "",
        competentCourt: "",
        cooperatedAmc: 1,
        cooperatedAmcDetail: "",
        cooperationIntention: 0,
        cooperationSituation: "",
        cooperationTeam: "",
        cooperationTeamManager: "",
        familiarCourts: "",
        formerWorkUnit: "",
        goodCases: 17,
        graduateSchool: "浙江大学",
        isCooperatedWithOtherAmc: 1,
        isCooperatedWithZheshang: 2,
        isCooperatedWithZheshangDetail: "",
        isInStorage: "",
        isWorkOfPublicSecurityOrgans: 1,
        isWorkOther: "",
        lawOffice: {
          code: "",
          hasOtherOffice: "",
          id: 0,
          isWorkForThreeYear: "",
          lawOfficeAddress: "",
          lawOfficeInformation: "",
          lawOfficeName: "",
          lawOfficeQualify: "",
          lawOfficeQualifyPerformance: "",
          lawOfficeType: "",
          officeWorkAddress: "",
          otherOfficeStaffInfo: "",
          otherOfficeWorkAddress: "",
          totalTeamSize: 0
        },
        liquidationSituation: "",
        major: "专业律师",
        notBadAssetsWorkExp: "",
        otherCooperationIntention: "",
        otherGoodCases: "",
        otherResources: 1,
        otherResourcesAdvantage: "",
        otherResourcesDetail: "",
        roleInLawOffice: "",
        typeOfCooperationCode: "",
        workArea: "浙江",
        workRole: "兼职/任职职务",
        workUnitName: "",
        workingTime: ""
      },
    }
  },
  methods: {
    switchInform(val) {
      this.btn = val
    }
  },
  created() {
    this.userinfo = this.$store.getters.getInfo;
    console.log(this.$store.getters.getInfo);
  },
}
</script>

<style scoped lang="scss">

.factor-content {
  .info-item {
    .attorney_btn {
      display: inline-block;
      width: 72px;
      height: 32px;
      border: 1px solid #666666;
      font-size: 14px;
      color: #666666;
      text-align: center;
      line-height: 32px;
      border-radius: 2px;
      margin-right: 13px;
      margin-bottom: 12px;
    }
    .notAddLawyer{
      text-align: center;
      margin: 60px 0;
      .text{
        color: #666666;
        font-size: 14px;
        margin:24px 0 ;
      }
      button{
        width: 88px;
        height: 32px;
        color: #FFFFFF;
        background-color: #008CB0;
        border: 0;
      }
    }
  }

  .info-type {
    height: 28px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px #E8E8E8 solid;
    margin-bottom: 16px;

    span:nth-child(1) {
      font-size: 16px;
      color: #333333;
      font-weight: 600;
    }

    span:nth-child(2) {
      font-size: 14px;
      color: #008CB0;
    }
  }

  padding: 0 32px;

  .ant-form-item {
    margin: 0;
    padding: 0;
  }

  .factor-form-subtitle {
    text-align: left;
    padding: 10px 0 0 0;
    color: #333333;

    span {
      display: block;
      font-size: 14px;
      line-height: 20px;
      height: 20px;
      color: #333333;
      font-weight: 600;
    }
  }
}

.button-attorney {
  border: 1px solid #008CB0 !important;
  color: #008CB0 !important;
}
</style>
