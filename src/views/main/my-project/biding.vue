<template>
  <div class="biding-main">
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div v-if="isCertification===0" class="nothing">
      <img class="nothing-pic" src="@/assets/img/tempty.png" alt="">
      <div class="nothing-msg">您尚未完成资质认证，请先完成资质认证！</div>
      <div class="nothing-btn">
        <a-button type="primary" @click="goConfirm('certifi')">
          立即前往资质认证
        </a-button>
      </div>
    </div>
    <div v-else-if="isConfirmElements===0" class="nothing">
      <img class="nothing-pic" src="@/assets/img/tempty.png" alt="">
      <div class="nothing-msg">您尚未完成要素认证，请先完成要素认证！</div>
      <div class="nothing-btn">
        <a-button type="primary" @click="goConfirm('ele')">
          立即前往要素认证
        </a-button>
      </div>
    </div>
    <div v-else class="biding-wrapper">
      <div class="biding-wrapper-content">
        <div class="biding-query">
          <a-form-model
            layout="inline"
          >
            <a-form-model-item class="debtor" label="债务人名称">
              <a-input
                v-model="params.debtor"
                placeholder="请输入债务人名称"
                class="custom-prefix-6"
                style="width: 500px"
              />
            </a-form-model-item>
            <a-form-model-item class="process-now" label="当前进展" v-if="query.tabStatus === 1">
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
            <a-form-model-item class="btns">
              <a-button type="primary" class="reset-btn" html-type="submit" @click="reset">重置</a-button>
              <a-button style="margin-left:16px" class="search-btn" type="primary" html-type="submit" @click="handleSubmit">查询</a-button>
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
          <div class="frame-content">
            <a-table
              rowKey="id"
              :columns="columns"
              :customRow="click"
              v-bind="tabConfig"
              @change="handleTableChange"
							class="frame-content-table"
            >
              <template slot="debtor" slot-scope="{debtor,isRead}">
                <a-avatar
                  :size="8"
                  :style="{backgroundColor:(!isRead&&isRead!==undefined)?'#f5222d':'transparent', marginRight:'5px'}"
                />
                <a-tooltip :title="debtor" placement="topLeft">
                  <span>{{ debtor }}</span>
                </a-tooltip>
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
                  :size="8"
                  :style="{
                    backgroundColor:
                      process === 0
                        ? '#F5222D'
                        : process === 1
                        ? '#52C41A'
                        : '#FAAD14',
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
                  @click="handleAuction(item, 'view')"
                  >查看详情</a-button
                >
                <template v-if="query.tabStatus === 1">
                  <a-divider type="vertical" style="margin: 0" />
                  <a-button
                    type="link"
                    size="small"
                    v-if="item.process === 0"
                    @click="handleAuction(item, 'sub')"
                    >方案报送</a-button
                  >
                  <a-button
                    type="link"
                    size="small"
                    v-if="item.process === 1"
                    @click="handleAuction(item, 'edit')"
                    >方案修改</a-button
                  >
                  <a-tooltip title="方案提交已截止" v-if="item.process === 2">
                    <a-button
                      type="link"
                      size="small"
                      disabled
                      class="common-table-disabled"
                      >方案修改</a-button
                    >
                  </a-tooltip>
                  <a-divider type="vertical" style="margin: 0" />
                  <a-button
                    type="link"
                    size="small"
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
  </div>
</template>

<script>
import Breadcrumb from "@/components/bread-crumb";
import ProjectModal from "@/components/modal/project-modal";
import PlanModal from "./Plan-modal";
import { clearProto } from "@/plugin/tools";
import { columns} from "@/views/main/my-project/source";
import { getInfo } from "@/plugin/api/base"
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
        rowKey:'id',
        class:'frame-content-table',
        dataSource: [],
        size: "middle",
        pagination: {
          total: 0,
          current:1,
          showQuickJumper: true,
          showTotal: (val) => `共${val}条信息`,
        },
      },
      projectInfo: {},
      sortOrder:''
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
    getInfo().then(res=>{
      if(res.code === 20000){
        this.$store.commit('updateInfo', res.data);
      }else{
        return false;
      }
    })
  },
  methods: {
    //获取项目列表
    getProjectList() {
      this.http[this.params.aimStatus](this.params).then((res) => {
        if (res.code === 20000) {
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
      this.params.page = 1;
      this.tabConfig.pagination.current = 1;
      this.sortOrder = false;
      this.params.sortOrder = "";
      this.getProjectList();
    },
    //重置
    reset(){
      this.params.debtor = '';
      this.params.process = '';
      this.params.page = 1;
      this.tabConfig.pagination.current = 1;
      this.sortOrder = false;
      this.params.sortOrder = "";
      this.getProjectList();
    },
    // tab状态切换
    handleTabChange(val) {
      this.sortOrder = false;
      this.query.tabStatus = val;
      this.params.page = 1;
      this.tabConfig.pagination.current = 1;
      this.getProjectList();
      this.getUnreadInfo();
    },
    // 分页,排序
    handleTableChange(pagination, filters, sorter) {
      this.params.page = pagination.current;
      this.tabConfig.pagination.current = pagination.current;
      this.params.sortField = sorter.field;
      this.sortOrder = sorter.order;
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
            changeUnRead(row.id).then(res=>{
              if(res.code === 20000){
                row.isRead = 1;
                this.getUnreadInfo()
              }else{
                return false;
              }
            })
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
            this.$refs.planModal.handleOpenModal()
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
    goConfirm(type){
      if(type === "certifi")this.$router.push({name:'my-attestation/qualifies'});
      if(type === "ele")this.$router.push({name:'my-attestation/factor'})
    }
  },
  computed: {
    columns(){
      return columns({
        type:this.params.aimStatus,
        sortOrder:this.sortOrder
      })
    },
    isCertification(){
      return this.$store.getters.getInfo.isCertification;
    },
    isConfirmElements(){
      return this.$store.getters.getInfo.isConfirmElements;
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
  min-height: 808px;
  background-color: #fff;
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
  min-height: 808px;
  background-color: #fff;
  .biding-query {
    padding: 20px 20px 5px 20px;
  }
  .biding-content {
		padding: 0 20px;
    &-table {
      padding: 4px 0;
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
	.frame-content-table{
		.ant-table-body{
			tr > th, tr > td {
				border-bottom: none;
				&:first-child{
					padding-left: 16px;
				}
				&:last-child{
					padding-right: 16px;
				}
			}

		}
		.ant-table-thead > tr > th{
			background-color: #F5F5F5;
			//background: #FAFAFA;
		}
		.ant-table-tbody > tr:nth-child(2n){
			background: #FAFAFA;
		}
		.frame-table-bold{
			font-weight: bold;
			color: #333333;
		}
    .ant-table-placeholder{
      border-bottom: none;
    }
	}

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
  border-radius: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .biding-content-table{
//   table{
//     border-bottom: 1px #E8E8E8 solid;
//   }
//   tr >td,tr >th{
// 		border-bottom: none;
//   }
// 	tbody > tr{
// 		height: 72px;
// 	}
//    tr:nth-child(2n){
//       background: #FAFAFA;
//    }
// }
.biding-main{
  .ant-form{
    .debtor{
      margin-right: 24px;
    }
    .btns{
      float: right;
      margin-right: 0;
      .reset-btn{
        background-color: #fff;
        color: #666666;
        border: 1px solid #dddddd;
        border-radius: 2px;
        font-size: 14px;
      }
      .search-btn{
        font-size: 14px;
        background: #008CB0;
        border-radius: 2px;
      }
    }
  }
}
</style>
