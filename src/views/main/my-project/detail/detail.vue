<template>
  <div class="project-detail">
    <a-spin v-if="loading" class="spin-wrapper" size="large"/>
    <div
      style="background: #ececec; padding: 16px"
      class="project-detail-content"
      v-else
    >
      <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
      <a-card :bordered="false" style="width: 100%; min-height: 810px">
        <div class="head flex-style">
          <div class="ctitle">项目基本信息</div>
          <div class="right flex-style">
            <div style="margin-right: 30px">
              <span class="subtitle">项目状态：</span>
              <span class="spantext" :style="{color:info.aimedStatus === '2'
              ? projectStatus.caseFileStatus[info.caseFileStatus].color
              : projectStatus.aimedStatus[info.aimedStatus].color}">{{
                info.aimedStatus === "2"
                  ? projectStatus.caseFileStatus[info.caseFileStatus].text
                  : projectStatus.aimedStatus[info.aimedStatus].text
              }}</span>
            </div>
            <div style="margin-right: 30px" v-if="info.aimedStatus === '2'">
              <span class="subtitle">报名日期：</span>
              <span class="spantext">{{ info.gmtCreate |show_}}</span>
            </div>
            <div v-if="info.aimedStatus === '2' ">
              <span class="subtitle">方案提交截止日期：</span>
              <span class="spantext">{{ info.submitDeadline|show_ }}</span>
            </div>
            <!--项目已中标 -->
            <div v-if="info.aimedStatus === '3'">
              <span class="subtitle">合同签订日期：</span>
              <span class="spantext">{{ info.aggrementDate|show_ }}</span>
            </div>
            <!-- 已放弃-->
            <div v-if="info.aimedStatus === '1'">
              <span class="subtitle">放弃日期：</span>
              <span class="spantext">{{ info.abandonDate|show_ }}</span>
            </div>
            <!-- 已失效日期-->
            <div v-if="info.aimedStatus === '4'">
              <span class="subtitle">失效日期：</span>
              <span class="spantext">{{ info.realSubmitDeadline|show_ }}</span>
            </div>
          </div>
        </div>
        <a-row>
          <a-col :span="8">
            <div style="padding-left:10px">
              <span class="subtitle">债务人名称：</span
              ><span class="spantext">{{ info.debtor|show_ }}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div>
              <span class="subtitle">当前诉讼状态：</span
              ><span class="spantext">{{
                info.isLawsuit | isLawsuitType
              }}</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div>
              <span class="subtitle">担保方式：</span
              ><span class="spantext">{{ info.security | guarantyType }}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <div style="padding-left:10px">
              <span class="subtitle">债权本金：</span
              ><span class="spantext"
                >{{ info.debtCaptial | amountTh }}万元</span>
            </div>
          </a-col>
          <a-col :span="8">
            <div>
              <span class="subtitle">债权利息：</span
              ><span class="spantext"
                >{{ info.debtInterest | amountTh }}万元</span
              >
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <div style="padding-left:10px">
              <span class="subtitle" style="white-space:nowrap">保证人清单：</span
              ><span class="spantext">{{
                info.amcProjectGuarantors | guarantorsList
              }}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="display: flex">
            <div class="subtitle" style="padding-left:10px;white-space:nowrap">抵质押物清单：</div>
            <div v-if="info.amcProjectCollaterals.length!==0">
              <p v-for="(i, index) in info.amcProjectCollaterals" :key="index" style="margin-bottom:16px">
                {{index+1}}. {{i.collateralType|collateralType}}，{{i|areaText}}，{{i.collateralName}}
              </p>
            </div>
            <div v-else>-</div>
          </a-col>
        </a-row>
        <div class="flex-style" style="margin-top: 16px">
          <div class="ctitle">我提交的服务方案</div>
          <div class="flex-style" v-if="info.aimedStatus === '3'">
            <div style="margin-right: 30px">
              <span class="subtitle">方案结束日期：</span>
              <span class="spantext">{{dateOprate(info.aggrementDate,info.serviceTime)}}</span>
            </div>
            <div>
              <span class="subtitle">方案开始日期：</span>
              <span class="spantext">{{info.aggrementDate|show_ }}</span>
            </div>
          </div>
          <div class="flex-style" v-if="info.aimedStatus !== '3'">
            <div
              style="margin-right: 30px"
              v-if="info.caseFileStatus === '1' || info.caseFileStatus === '2'"
            >
              <span class="subtitle">方案最后更新日期：</span
              ><span class="spantext">{{ info.serviceCaseUpdateTime|show_ }}</span>
            </div>
          </div>
        </div>
        <div v-if="info.caseFileStatus === '0' && info.closeSubmitDeadline === 1" class="tips">
          方案提交即将截止
        </div>
        <!-- 未中标黄色图标-->
        <div
          v-if="info.aimedStatus === '4'"
          class="absence_sign"
        >
          未中标
        </div>
        <div class="submit-plan"  v-if="info.aimedStatus === '2' && info.caseFileStatus == '0'">
          <img src="@/assets/img/tempty.png" alt="" />
          <p class="text" >您暂未提交服务方案</p>
          <button
            class="submitbtn"
            @click="goSubmit"
          >
            去提交
          </button>
        </div>
        <div class="submit-plan"  v-else-if="info.aimedStatus !== '2' && info.caseFileStatus == '0'">
          <img src="@/assets/img/tempty.png" alt="" />
          <p class="text" >您暂未提交服务方案</p>
        </div>
        <div v-else>
          <div class="serviceTime-aimBackPrice-row">
            <div style="padding-left:10px">
              <span class="subtitle">服务期限：</span>
              <span class="spantext">{{ info.serviceTime|show_ }}个月</span>
            </div>
            <div>
              <span class="subtitle">目标回款：</span>
              <span class="spantext">{{ info.aimBackPrice|show_ }}万元</span>
            </div>
          </div>
          <div class="plan" style="padding-left:10px">
            <div class="subtitle">处置计划：</div>
          </div>
          <div style="margin-top:24px" class="step-container">
            <a-steps :current="20">
              <a-popover slot="progressDot"  slot-scope="item">
                <template slot="content">
                  <span>{{ item.title }}</span>
                </template>
                <span :class="`${item.prefixCls}-icon-dot`" />
              </a-popover>
              <a-step v-for="(item,index) in info.scheduleManagements" :key="index"  :title="item.dateMatters" :description="info.aimedStatus==='3'?`${item.dateDay}前`:`${item.dateMonth}个月内`" />
            </a-steps>
          </div>
          <div class="plan_scheme">
            <div class="subtitle" style="padding-left:10px">方案文档：<a :href="url">{{fileName}}</a></div>
            <button class="modify_scheme" @click="goSubmit" v-if="info.aimedStatus === '2' && info.caseFileStatus === '1'">
              修改服务方案
            </button>
          </div>
        </div>
      </a-card>
    </div>
    <PlanModal :projectInfo="info" ref="planModal" />
  </div>
</template>

<script>

import  {getArea} from "@/plugin/tools"
import {queryOptions} from "@/views/investment-center/source"
import { amcBidDetail } from "@/plugin/api/my-biding";
import {getDownLoadToken} from "@/plugin/api/base"
import Breadcrumb from "@/components/bread-crumb";
import PlanModal from "../Plan-modal.vue";

export default {
  data() {
    return {
      loading:true,
      url:'',
      fileName:'',
      navData: [
        { id: 1, title: "我的项目", path: "biding" },
        { id: 2, title: "我的竞标", path: "biding" },
        { id: 3, title: "项目详情", path: "detail" },
      ],
      projectStatus: {
        aimedStatus: {
          1: {text:'已放弃',color:'#F5222D'},
          2: {text:'进行中',color:'#fff'},
          3: {text:'已中标',color:'#52C41A'},
          4: {text:'已失效',color:'#F5222D'},
        },
        caseFileStatus: {
          0: {text:'方案待提交',color:'#F5222D'},
          1: {text:'方案已提交',color:'#52C41A'},
          2: {text:'方案审核中',color:'#FAAD14'},
        },
      },
      tipStyle: {},
      info: {
        abandonDate: "",
        aggrementDate: "",
        aimBackPrice: "",
        aimedStatus: "",
        amcBidFiles: [],
        amcProjectCollaterals: [],
        amcProjectGuarantors: [],
        caseFileStatus: "",
        closeSubmitDeadline:'',
        debtCaptial: "",
        debtInterest: "",
        debtor: "",
        debtorAddress: "",
        gmtCreate: "",
        id: '',
        isDeleted: "",
        isLawsuit: "",
        realSubmitDeadline: "",
        recallDate: "",
        scheduleManagements: [],
        security: "",
        serviceCaseUpdateTime: "",
        serviceTime: "",
        submitDeadline: "",
      },
    };
  },
  components: {
    Breadcrumb,
    PlanModal,
  },
  filters: {
    guarantorsList: (arr = []) => {
      if(arr.length === 0) return '-';
      return arr.map((i) => i.guarantorName).join("、");
    },
    areaText:(params) => {
      return getArea(params.provinceCode,params.cityCode,params.areaCode);
    },
    collateralType:(val)=>{
      if(!val)return"-";
      return queryOptions[1].list.find(i=>val === i.value).label;
    }
  },
  methods: {
    goSubmit() {
      this.$refs.planModal.handleOpenModal();
    },
    //计算方案结束日期
    dateOprate(time,month){
      var date = new Date(time);
      date.toLocaleDateString();
      date.setMonth(date.getMonth() + month);
      return date.toLocaleDateString().replaceAll('/','-');
    },
    getProjectDetail(){
      let {id,type} = this.$route.query;
      amcBidDetail(id,type).then((res) => {
        if(res.code === 20000){
          this.loading = false;
          this.info = res.data;
          if(this.info.amcBidFiles.length !== 0){
            const length = this.info.amcBidFiles.length;
            const caseFileAddress = this.info.amcBidFiles[length - 1].caseFileAddress;
            this.fileName = (caseFileAddress.split('_'))[2];
            return getDownLoadToken(caseFileAddress).then(res=>{
              if(res.code === 20000){
                this.url = res.data;
              }else{
                return false;
              }
            })
          }
        }else{
          this.$message.error("获取项目详情失败,请刷新页面")
        }
      });
    }
  },
  computed: {},
  created() {
    this.getProjectDetail();

  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.spin-wrapper{
  width: 100%;
  padding-top: 10vh!important;
}
.project-detail {
  &-content {
    .ant-row {
      margin-top: 24px;
    }
    .flex-style {
      display: flex;
      justify-content: space-between;
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
    }

    .subtitle {
      font-size: 14px;
      font-weight: 400;
      color: #333333;
    }

    .spantest {
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      line-height: 14px;
    }
  }
}

.serviceTime-aimBackPrice-row {
  margin-top: 24px;
  display: flex;

  div ~ div {
    margin-left: 30px;
  }
}

.plan {
  margin-top: 24px;

  .step {
    margin-top: 24px;
  }
}

.plan_scheme {
  margin-top: 24px;

  .modify_scheme {
    display: block;
    margin: 70px auto;
    width: 116px;
    height: 32px;
    background-color: #008cb0;
    font-size: 14px;
    color: #ffffff;
    border: 0;
  }
}
.tips {
  width: 104px;
  height: 22px;
  font-size: 12px;
  text-align: center;
  line-height: 22px;
  border-radius: 2px;
  border: 1px dashed #f5222d;
  margin-top: 4px;
  color: #f5222d;
}
.absence_sign {
  width: 44px;
  height: 22px;
  color: #faad14;
  font-size: 12px;
  border: 1px dashed #faad14;
  border-radius: 2px;
  margin-top: 4px;
}
.sutitle-text{
  margin-left: 10px;
  margin-top: -2px;
}

</style>
<style lang="scss" >
.step-container{
  .ant-steps{
    margin: 0 auto;
    padding: 5px 0 24px;
    width: 90%;
    overflow-x: scroll;
    .ant-steps-item{
      margin: 0 auto;
    }
    &::-webkit-scrollbar {
      height: 8px;
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: transparent;
      border-radius: 8px;
    }
    &:hover::-webkit-scrollbar-thumb {
      background: #e8e8e8;
    }
  }
  .ant-steps-item-title{
    width: 70px;
    color: #333333;
    font-size: 14px;
    white-space: nowrap;
    text-overflow:ellipsis;
    overflow:hidden;
  }
}
</style>