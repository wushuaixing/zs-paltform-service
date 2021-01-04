<template>
  <div class="biding-main">
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <a-spin v-if="loading" class="spin-wrapper" size="large"/>
    <div v-else class="biding-wrapper">
      <div class="biding-wrapper-content">
        <div class="biding-query">
          <a-form-model
            layout="inline"
            @submit="handleSubmit"
            @submit.native.prevent
          >
            <a-form-model-item>
              <a-input
                v-model="params.debtor"
                placeholder="请输入债务人名称"
                class="custom-prefix-6"
                style="width: 500px"
              >
                <template slot="prefix">
                  <div class="query-item-prefix">债务人名称</div>
                </template>
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="当前进展：" v-if="query.tabStatus === 1">
              <a-select
                v-model="params.process"
                placeholder="请选择当前竞标进展"
                style="width: 180px"
                allowClear
              >
                <a-select-option :value="0">方案待提交</a-select-option>
                <a-select-option :value="1">方案已提交</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="biding-content">
          <a-tabs @change="handleTabChange" v-model="params.aimStatus">
            <a-tab-pane v-for="i in tabType" :key="i.id">
              <template slot="tab">
                <a-badge
                  :dot="i.dot !== 1 && i.id !== 3"
                  :numberStyle="{ width: '8px', height: '8px' }"
                  >{{ i.title }}</a-badge
                >
              </template>
            </a-tab-pane>
          </a-tabs>
          <div class="biding-content-table">
            <a-table
              :columns="columns"
              :customRow="click"
              v-bind="tabConfig"
              @change="handleTableChange"
            >
              <template slot="debtor" slot-scope="{ debtor, isRead }">
                <a-avatar
                  v-if="!isRead && isRead !== undefined"
                  :size="8"
                  style="background-color: #f5222d; margin-right: 5px"
                />
                <span>{{ debtor }}</span>
              </template>
              <template slot="amount" slot-scope="amount">{{
                amount | amountTh
              }}</template>
              <template slot="security" slot-scope="{ security }">{{
                security | guarantyType
              }}</template>
              <template
                slot="process"
                slot-scope="{ process, closeSubmitDeadline }"
              >
                <a-avatar
                  :size="6"
                  :style="{
                    backgroundColor:
                      process === 0
                        ? '#F5222D'
                        : process === 1
                        ? '#52C41A'
                        : '#FAAD14',
                    marginRight: '5px',
                  }"
                />
                {{ process | evolveType }}<br />
                <div
                  class="tipsInfo"
                  v-if="closeSubmitDeadline === 1 && process === 0"
                >
                  方案提交即将截止
                </div>
              </template>
              <template slot="datetime" slot-scope="time">{{
                time | timeFilter
              }}</template>
              <template slot="businessTeam" slot-scope="team">
                <div class="contactWay">
                  <p>{{ team.businessTeam }}</p>
                  <p>
                    <span>{{ team.projectManager }}</span
                    ><span>{{ team.contact }}</span>
                  </p>
                </div>
              </template>
              <template
                slot="serviceTime"
                slot-scope="{ serviceTime, aggrementDate }"
              >
                <div class="deadline">
                  <p>{{ serviceTime }}个月</p>
                  <p>({{ dateOprate(aggrementDate, serviceTime) }}到期)</p>
                </div>
              </template>
              <template slot="plan" slot-scope="plan">
                <div class="plan">
                  <div v-if="plan.dateMatters">
                    <p>{{ plan.dateDay | timeFilter }}前</p>
                    <p>{{ plan.dateMatters }}</p>
                  </div>
                  <p v-else>服务到期</p>
                </div>
              </template>
              <template slot="auction" slot-scope="item">
                <a-button
                  type="link"
                  size="small"
                  icon="file-text"
                  @click="handleAuction(item, 'view')"
                  >查看详情</a-button
                >
                <template v-if="query.tabStatus === 1">
                  <a-divider type="vertical" style="margin: 0" />
                  <a-button
                    type="link"
                    size="small"
                    icon="file-text"
                    v-if="item.process === 0"
                    @click="handleAuction(item, 'sub')"
                    >方案报送</a-button
                  >
                  <a-button
                    type="link"
                    size="small"
                    icon="file-text"
                    v-if="item.process === 1"
                    @click="handleAuction(item, 'edit')"
                    >方案修改</a-button
                  >
                  <a-tooltip title="方案提交已截止" v-if="item.process === 2">
                    <a-button
                      type="link"
                      size="small"
                      icon="file-text"
                      disabled
                      class="common-table-disabled"
                      >方案修改</a-button
                    >
                  </a-tooltip>
                  <a-divider type="vertical" style="margin: 0" />
                  <a-button
                    type="link"
                    size="small"
                    icon="file-text"
                    @click="handleAuction(item, 'aba')"
                    >放弃竞标</a-button
                  >
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
      <ProjectModal :projectInfo="projectInfo" :sign="'fail'" ref="failModal" />
      <PlanModal :projectInfo="projectInfo" ref="planModal" />
    </div>
    <div v-if="!isCertification===0" class="nothing">
      <img class="nothing-pic" src="@/assets/img/tempty.png" alt="">
      <div class="nothing-msg">您尚未完成资质认证，请先完成资质认证！</div>
      <div class="nothing-btn">
        <a-button type="primary" @click="goConfirm">
          立即前往资质认证
        </a-button>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from "@/components/bread-crumb";
import ProjectModal from "@/components/modal/project-modal";
import PlanModal from "./Plan-modal";
import { clearProto } from "@/plugin/tools";
import { columns, colType } from "@/views/main/my-project/source";
import {
  amcBidDetail,
  amcBiding,
  amcBidAimed,
  amcBidAbandon,
  amcBidInvalid,
  unreadInfo,
  changeUnRead,
} from "@/plugin/api/my-biding";
export default {
  name: "ToReview",
  data() {
    return {
      loading:true,
      navData: [
        { id: 1, title: "我的项目", path: "biding" },
        { id: 2, title: "我的竞标", path: "biding" },
      ],
      tabType: [
        { id: 1, title: "进行中", dot: "" },
        { id: 2, title: "已中标", dot: "" },
        { id: 3, title: "已放弃", dot: "" },
        { id: 4, title: "已失效", dot: "" },
      ],
      http: {
        1: amcBiding, //进行中
        2: amcBidAimed, //已中标
        3: amcBidAbandon, //已放弃
        4: amcBidInvalid, //已失效
      },
      // 请求参数字段
      params: {
        aimStatus: 1,
        page: 1,
        size: 10,
        sortField: "",
        sortOrder: "",
      },
      query: {
        username: "",
        startTime: "",
        endTime: "",
        tabStatus: 1,
        orderType: "",
        orderField: "",
      },
      tabConfig: {
        dataSource: [],
        size: "middle",
        pagination: {
          total: 40,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30", "40"],
          showQuickJumper: true,
          showTotal: (val) => `共${val}条信息`,
        },
      },
      projectInfo: {},
    };
  },
  components: {
    Breadcrumb,
    ProjectModal,
    PlanModal,
  },
  created() {
    this.getProjectList();
    this.getUnreadInfo();
  },
  methods: {
    //获取项目列表
    getProjectList() {
      this.http[this.params.aimStatus](this.params).then((res) => {
        if (res.code === 20000) {
          console.log(res);
          this.loading = false;
          this.tabConfig.pagination.total = res.data.total;
          this.tabConfig.dataSource = res.data.list;
        }else{
          this.$message.error("获取项目列表失败,请重新加载")
        }
      });
    },
    //获取进行中,已中标,已失效是否已读状态
    getUnreadInfo() {
      unreadInfo().then((res) => {
        if(res.code === 20000){
          this.tabType[0].dot = res.data.goingUnRead;
          this.tabType[1].dot = res.data.aimedUnRead;
          this.tabType[3].dot = res.data.invalidUnRead;
        }else{
          console.log("error")
        }
      });
    },
    // 搜索查询
    handleSubmit() {
      this.loading = true;
      this.getProjectList();
    },
    // tab状态切换
    handleTabChange(val) {
      this.loading = true;
      this.query.tabStatus = val;
      this.getProjectList();
    },
    // 分页,排序
    handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      this.params.size = pagination.pageSize;
      this.params.sortField = sorter.field;
      this.params.sortOrder = sorter.order
        ? sorter.order === "ascend"
          ? "ASC"
          : "DESC"
        : "";
      this.getProjectList();
    },
    //table添加行点击事件,点击未读变为已读
    click(row) {
      return {
        on: {
          click: () => {
            changeUnRead(row.id).then((res) => {
              console.log(res);
            });
          },
        },
      };
    },
    // table操作列
    handleAuction(item, type) {
      //放弃竞标
      if (type === "aba") {
        amcBidDetail(item.id, this.params.aimStatus).then((res) => {
        if (res.code === 20000) {
          this.projectInfo = clearProto(res.data);
          this.$refs.failModal.handleOpenModal();
        }else{
          return this.$message.error("获取项目信息失败!")
        }
      });
      }
      //查看详情
      if (type === "view") {
        this.$router.push({
          path: "detail",
          query: { id: item.id, type: this.params.aimStatus },
        });
      }
      //方案报送/方案修改
      if (type === "sub" || type === "edit") {
        amcBidDetail(item.id, this.params.aimStatus).then((res) => {
        if (res.code === 20000) {
          this.projectInfo = clearProto(res.data);
          if(type === "sub"){
            window.localStorage.removeItem("servePlan")
          }
          if(type === "edit"){
            var servePlan = { //服务方案
              serviceTime: "",
              collectionTarget: "",
              projectId: "",
              plans: [],
              documentAddress: "",
            },length = this.projectInfo.amcBidFiles.length;
            servePlan.serviceTime = this.projectInfo.serviceTime;
            servePlan.collectionTarget = this.projectInfo.aimBackPrice;
            servePlan.projectId = this.projectInfo.id;

            servePlan.documentAddress = this.projectInfo.amcBidFiles[length - 1].caseFileAddress;
            this.projectInfo.scheduleManagements.forEach(i=>{
              var plan = {};
              plan.content = i.dateMatters;
              plan.months = i.dateMonth;
              servePlan.plans.push(plan);
            })
            window.localStorage.setItem("servePlan",JSON.stringify(servePlan));
            this.$refs.planModal.handleOpenModal();
          }
        }else{
          return this.$message.error("获取项目详情失败!...")
        }
      });
      }
    },
    //计算方案结束日期
    dateOprate(time, month) {
      var date = new Date(time);
      date.toLocaleDateString();
      date.setMonth(date.getMonth() + month);
      return date.toLocaleDateString().replaceAll("/", "-");
    },
    goConfirm(){
      this.$router.push({name:'my-attestation/qualifies'})
    }
  },
  computed: {
    columns: function () {
      return columns[colType[this.query.tabStatus]];
    },
    isCertification(){
      return this.$store.getters.getInfo.isCertification;
    }
  },
};
</script>

<style scoped lang="scss">
.biding-main{
  padding: 16px;
}
.spin-wrapper{
  width: 100%;
  padding-top: 10vh !important;
}
.nothing{
  width: 100%;
  height: 100%;
  text-align: center;
  &-pic{
    margin-top: 232px;
  }
  &-msg{
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    margin-top: 12px;
  }
  &-btn{
    margin-top: 24px;
  }
}
.biding-wrapper {
  &-content {
    background-color: #ffffff;
  }
  .biding-query {
    padding: 20px;
  }
  .biding-content {
    &-table {
      padding: 4px 20px 20px;
    }
  }
}
.query-item-prefix {
  font-size: 14px;
}
.content-action {
  margin-bottom: 20px;
}
.content-action button {
  margin-right: 15px;
}
.contactWay{
  p{
    margin: 0;
  }
}
.deadline{
  p{
    margin: 0;
  }
}
.plan{
  p{
    margin: 0;
  }
}
</style>
<style lang="scss">
.query-item-prefix {
  height: 100%;
  width: 90px;
  text-align: center;
  border-right: 1px solid #ddd;
}
.custom-prefix-6 input {
  padding-left: 113px !important;
}
.common-table-disabled {
  cursor: pointer !important;
}
.tipsInfo {
  width: fit-content;
  color: #f5222d;
  border: 1px #f5222d dashed;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.biding-content-table{
  table{
    border-bottom: 1px #E8E8E8 solid;
  }
  tr{
    height: 72px;
    td{
      border-bottom: none;
    }
  }
   tr:nth-child(2n){
      background: #FAFAFA;
   }
}
</style>
