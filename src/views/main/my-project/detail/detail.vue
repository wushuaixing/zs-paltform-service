<template>
  <div class="project-detail">
    <div
        style="background: #ececec; padding: 16px"
        class="project-detail-content">
      <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
      <a-card :bordered="false" style="width: 100%; height: 810px">
        <div class="head flex-style">
          <div class="ctitle">项目基本信息</div>
          <div class="right flex-style">
            <div style="margin-right: 30px">
              <span class="subtitle">项目状态：</span>
              <span class="spantext">{{
                  info.aimedStatus === "2"
                      ? projectStatus.caseFileStatus[info.caseFileStatus]
                      : projectStatus.aimedStatus[info.aimedStatus]
                }}</span>
            </div>
              <div style="margin-right: 30px"  v-if="info.aimedStatus === '2'">
                <span class="subtitle">报名日期：</span>
                <span class="spantext">{{ info.gmtCreate }}</span>
              </div>
              <div  v-if="info.aimedStatus === '2'">
               <span class="subtitle">方案提交截止日期：</span>
                <span class="spantext">{{ info.submitDeadline }}</span>
              </div>
            <!--项目已中标 -->
            <div  v-if="info.aimedStatus === '3'">
              <span class="subtitle">合同签订日期：</span>
              <span class="spantext">{{ info.submitDeadline }}</span>
            </div>
            <!-- 已放弃-->
            <div  v-if="info.abandonDate">
              <span class="subtitle">放弃日期：</span>
              <span class="spantext">{{ info.abandonDate }}</span>
            </div>
            <!-- 已失效日期-->
            <div  v-if="info.realSubmitDeadline">
              <span class="subtitle">失效日期：</span>
              <span class="spantext">{{ info.realSubmitDeadline }}</span>
            </div>
          </div>
        </div>
        <a-row>
          <a-col :span="8">
            <div>
              <span class="subtitle">债务人名称：</span
              ><span class="spantext">{{ info.debtor }}</span>
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
            <div style="text-align: right;margin-right:60px">
              <span class="subtitle">担保方式：</span
              ><span class="spantext">{{ info.security | guarantyType }}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="8">
            <div>
              <span class="subtitle">债权本金：</span
              ><span class="spantext"
            >{{ info.debtCaptial | amountTh }}万元</span
            >
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
            <div>
              <span class="subtitle">保证人清单：</span
              ><span class="spantext">{{
                info.amcProjectGuarantors|guarantorsList
              }}</span>
            </div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24" style="display: flex">
            <div class="subtitle">抵押物清单:</div>
            <div>
              <p v-for="(i, index) in info.amcProjectCollaterals" :key="index">
                {{ index + 1 }}. {{ i.collateralType }},{{
                  i.provinceCode + i.cityCode + i.areaCode
                }}
              </p>
            </div>
          </a-col>
        </a-row>
        <div class="flex-style" style="margin-top: 24px">
          <div class="ctitle">我提交的服务方案</div>
          <div class="flex-style" v-if="info.aimedStatus === '3'">
            <div style="margin-right: 30px">
              <span class="subtitle">方案结束日期：</span>
              <span class="spantext">{{}}</span>
            </div>
            <div>
              <span class="subtitle">方案开始日期：</span>
              <span class="spantext">{{}}</span>
            </div>
          </div>
          <div class="flex-style" v-if="info.aimedStatus != '3'">
            <div style="margin-right: 30px" v-if="info.caseFileStatus ==='1' || info.caseFileStatus ==='2'">
              <span class="subtitle">方案最后更新日期：</span
              ><span class="spantext">{{ info.serviceCaseUpdateTime }}</span>
            </div>
          </div>
        </div>
        <div v-if="info.caseFileStatus === '0' " class="tips">方案提交即将截止</div>
        <!-- 未中标黄色图标-->
        <div v-if="info.amcBidFiles.length !== 0 && info.aimedStatus === '4'" class="absence_sign">未中标</div>
        <div class="submit-plan" v-if="info.amcBidFiles.length === 0">
          <img src="@/assets/img/tempty.png" alt=""/>
          <p class="text" v-if="info.aimedStatus !== '4'">您暂未提交服务方案</p>
          <button class="submitbtn" v-if="info.aimedStatus !== '4'">去提交</button>
        </div>
        <div v-else>
          <div class="serviceTime-aimBackPrice-row">
            <div>
              <span class="subtitle">服务期限：</span>
              <span class="spantext">{{ info.serviceTime }}</span>
            </div>
            <div>
              <span class="subtitle">目标回款：</span>
              <span class="spantext">{{ info.aimBackPrice }}</span>
            </div>
          </div>
          <div class="plan">
            <div class="subtitle">处置计划：</div>
            <div>
              <a-steps :current="2">
                <a-popover slot="progressDot" slot-scope="{ index, status,prefixCls}">
                  <template slot="content">
                    <span>step {{ index }} status: {{ status }}</span>
                  </template>
                  <span :class="`${prefixCls}-icon-dot`"/>
                </a-popover>
                <a-step title="申请执行" description="3个月内"/>
                <a-step title="执行裁定" description="6个月内"/>
                <a-step title="腾房完成" description="9个月内"/>
                <a-step title="评估完成" description="12个月内"/>
                <a-step title="处置完成" description="18个月内"/>
                <a-step title="回款" description="24个月内"/>
              </a-steps>
            </div>
          </div>
          <div class="plan_scheme">
            <div class="subtitle">方案文档：<a>服务方案.doc</a></div>
            <button class="modify_scheme" v-if=" info.caseFileStatus === '1'">修改服务方案</button>
          </div>
        </div>
      </a-card>
    </div>
    <PlanModal/>
  </div>
</template>

<script>
// import  {getArea} from "@/plugin/tools"
import {amcBidDetail} from "@/plugin/api/my-biding";
import Breadcrumb from "@/components/bread-crumb";
import PlanModal from '../Plan-modal.vue';

export default {
  data() {
    return {
      navData: [
        {id: 1, title: "服务商管理", path: "/provider/review"},
        {id: 2, title: "待审查", path: "/provider/review"},
        {id: 3, title: "项目详情", path: "/provider/review"},
      ],
      projectStatus: {
        aimedStatus: {
          1: "已放弃",
          2: "进行中",
          3: "已中标",
          4: "已失效",
        },
        caseFileStatus: {
          0: "方案待提交",
          1: "方案已提交",
          2: "方案审核中",
        },
      },
      tipStyle: {},
      info: {
        abandonDate: "",//2020-12-29
        aggrementDate: "2020-12-29",
        aimBackPrice: "999.99",
        aimedStatus: "4",
        amcBidFiles: [
          {
            amcBidId: 0,
            caseFileAddress: "",
            gmtCreate: "2020-12-29",
            gmtDelete: "2020-12-29",
            gmtModify: "2020-12-29",
            id: 0,
            isDelete: "0",
            serviceContractFileAddress: "",
          },
        ],
        amcProjectCollaterals: [
          {
            amcProjectId: 0,
            areaCode: 0,
            cityCode: 0,
            collateralName: "车子",
            collateralType: 0,
            gmtCreate: "2020-12-29",
            gmtDeleted: "2020-12-29",
            gmtModify: "2020-12-29",
            id: 0,
            isDeleted: "0",
            provinceCode: 0,
          },
        ],
        amcProjectGuarantors: [
          {
            amcProjectId: 0,
            gmtCreate: "2020-12-29",
            gmtDeleted: "2020-12-29",
            gmtModify: "2020-12-29",
            guarantorCard: "11111111111111",
            guarantorName: "马云",
            guarantorPhone: "10086",
            id: 0,
            isDeleted: "0",
          },
        ],
        caseFileStatus: "",
        debtCaptial: "130.15",
        debtInterest: "120.2",
        debtor: "阿里巴巴集团",
        debtorAddress: "杭州市西湖区",
        gmtCreate: "2020-12-29",
        id: 0,
        isDeleted: "0",
        isLawsuit: "0",
        realSubmitDeadline: "2020-12-29",//
        recallDate: "2020-12-29",
        scheduleManagements: [
          {
            amcBidId: 0,
            amcServiceUserId: 0,
            dateDay: "2020-12-29",
            dateMatters: "腾房完毕",
            dateMonth: 0,
            gmtCreate: "2020-12-29",
            gmtDelete: "2020-12-29",
            gmtModify: "2020-12-29",
            id: 0,
            isDelete: "0",
          },
        ],
        security: "2",
        serviceCaseUpdateTime: "2020-12-29",
        serviceTime: "2020-12-29",
        submitDeadline: "2020-12-29",
      },
    };
  },
  components: {
    Breadcrumb,
    PlanModal
  },
  filters: {
    guarantorsList: (arr = []) => {
      return arr.map(i => i.guarantorName).join("、");
    },
  },
  methods: {},
  computed:{
    deadDate(){
      return this.form.submitDeadline - Date.now() < 7 ? true : false;
    }
  },
  created() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    amcBidDetail(id).then((res) => {
      console.log(res);
      // this.info = res.data;
    });
  },
};
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
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
      line-height: 20px;
    }

    .subtitle {
      font-size: 14px;
      font-weight: 500;
      color: #333333;
      line-height: 14px;

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
    background-color: #008CB0;
    font-size: 14px;
    color: #FFFFFF;
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
  border: 1px dashed #F5222D;
  margin-top: 4px;
  color: #F5222D;
}
.absence_sign{
  width: 44px;
  height: 22px;
  color: #FAAD14;
  font-size: 12px;
  border: 1px dashed #FAAD14;
  border-radius: 2px;
  margin-top: 4px;
}
</style>