<template>
  <div class="project-detail">
    <div
      style="background: #ececec; padding: 16px"
      class="project-detail-content"
    >
      <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
      <a-card :bordered="false" style="width: 100%; height: 810px">
        <a-row>
          <a-col :span="12">
            <div class="ctitle">项目基本信息</div>
          </a-col>
          <a-col :span="4">
            <div class="subtitle">
              项目状态：<span class="spantext">{{info.aimedStatus==='2'?projectStatus.caseFileStatus[info.caseFileStatus]:projectStatus.aimedStatus[info.aimedStatus]}}</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="subtitle">
              报名日期：<span class="spantext">{{}}</span>
            </div>
          </a-col>
          <a-col :span="4">
            <div class="subtitle">
              方案提交截止日期：<span class="spantext">{{}}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <div class="subtitle">
              债务人名称：<span class="spantext">{{info.debtor}}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="subtitle">
              当前诉讼状态：<span class="spantext">{{info.isLawsuit|isLawsuitType}}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="subtitle">
              担保方式：<span class="spantext">{{info.security|guarantyType}}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <div class="subtitle">
              债权本金：<span class="spantext">{{info.debtCaptial|amountTh}}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div class="subtitle">
              债权利息：<span class="spantext">{{info.debtInterest|amountTh}}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <div class="subtitle">
              保证人清单：<span class="spantext">{{info.amcProjectGuarantors.guarantorName}}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="display: flex">
            <div class="subtitle">抵押物清单:</div>
            <div>
              <p v-for="(i,index) in info.amcProjectCollaterals" :key="index">{{index+1}}.{{i.collateralType}},{{i.provinceCode+i.cityCode+i.areaCode}}</p>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <div class="ctitle">我提交的服务方案</div>
          </a-col>
        </a-row>
        <div><a-tag color="#f50">方案提交即将截止</a-tag></div>
        <div class="submit-plan">
          <img src="@/assets/img/tempty.png" alt="" />
          <p class="text">您暂未提交服务方案</p>
          <button class="submitbtn">去提交</button>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { amcBidDetail } from "@/plugin/api/my-biding";
import Breadcrumb from "@/components/bread-crumb";
export default {
  data() {
    return {
      navData: [
        { id: 1, title: "服务商管理", path: "/provider/review" },
        { id: 2, title: "待审查", path: "/provider/review" },
        { id: 3, title: "项目详情", path: "/provider/review" },
      ],
      projectStatus:{
        aimedStatus:{
            '1':'已放弃',
            '2':'进行中',
            '3':'已中标',
            '4':'未中标'
        },
        caseFileStatus:{
            '0':'方案待提交',
            '1':'方案已提交',
            '2':'方案审核中'
        }
      },
      info: {
        abandonDate: '',
        aggrementDate: '',
        aimBackPrice: '',
        aimedStatus: '',
        amcBidFiles: '',
        amcProjectCollaterals: '',
        amcProjectGuarantors: '',
        caseFileStatus: '',
        debtCaptial: '',
        debtInterest: '',
        debtor: '',
        debtorAddress: '',
        gmtCreate: '',
        id: '',
        isDeleted: '',
        isLawsuit: '',
        realSubmitDeadline: '',
        recallDate: '',
        scheduleManagements: '',
        security: '',
        serviceCaseUpdateTime: '',
        serviceTime: '',
        submitDeadline: '',
      },
    };
  },
  components: {
    Breadcrumb,
  },
  methods: {},
  created() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    amcBidDetail(id).then((res) => {
      console.log(res);
      this.info = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.project-detail{
  &-content {
    .ant-row ~ .ant-row {
      margin-top: 24px;
    }
    .submit-plan {
      width: 265px;
      margin: 0 auto;
      text-align: center;
      margin-top: 60px;
      .text {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 22px;
        margin-top: 12px;
      }
      .submitbtn {
        width: 74px;
        height: 32px;
        background-color: #008cb0;
        border: none;
        font-size: 14px;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
        margin-top: 24px;
      }
    }
    .ctitle {
      font-size: 18px;
      font-weight: 600;
      color: #262626;
      line-height: 20px;
    }
    .subtitle {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 14px;
      .spantest {
        font-size: 14px;
        font-weight: 400;
        color: #666666;
        line-height: 14px;
      }
    }
  }
}
</style>