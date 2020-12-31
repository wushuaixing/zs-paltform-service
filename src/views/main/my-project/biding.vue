<template>
  <div>
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div class="biding-wrapper">
      <div class="biding-wrapper-content">
        <div class="biding-query">
          <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item>
              <a-input v-model="params.debtor" placeholder="请输入债务人名称" class="custom-prefix-6" style="width: 500px">
                <template slot="prefix" >
                  <div class="query-item-prefix">债务人名称</div>
                </template>
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="当前进展：" v-if="query.tabStatus === 1">
              <a-select v-model="params.process" placeholder="请选择当前竞标进展" style="width: 180px" allowClear>
                <a-select-option :value="0">方案待提交</a-select-option>
                <a-select-option :value="1">方案已提交</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="biding-hr"/>
        <div class="biding-content">
          <a-tabs @change="handleTabChange" v-model="params.aimStatus">
            <a-tab-pane v-for="i in tabType" :key="i.id">
              <template slot="tab">
                <a-badge :dot="i.dot!==1&&i.id!==3"  :numberStyle="{width:'8px',height:'8px'}">{{i.title}}</a-badge>
              </template>
            </a-tab-pane>
          </a-tabs>
          <div class="biding-content-table">
            <a-table :columns="columns" :customRow="click" v-bind="tabConfig" @change="handleTableChange">
              <template slot="debtor" slot-scope="{debtor,isRead}">
                <a-avatar v-if="!isRead&&isRead!==undefined" :size="8" style="background-color:#F5222D;margin-right:5px"/>
                <span>{{debtor}}</span>
              </template>
              <template slot="amount" slot-scope="amount">{{amount|amountTh}}</template>
              <template slot="security" slot-scope="{security}">{{security|guarantyType}}</template>
              <template slot="process" slot-scope="{process}">
                <a-avatar :size="6" :style="{backgroundColor: process===0 ? '#F5222D' : process===1 ? '#52C41A' : '#FAAD14',marginRight:'5px'}"/>
                {{process|evolveType}}<br>
                <div class="tipsInfo" v-if="process===0">方案提交即将截止</div>
              </template>
              <template slot="datetime" slot-scope="time">{{time}}</template>
              <template slot="businessTeam" slot-scope="team">
                <div class="contactWay">
                  <p>{{ team.businessTeam}}
                  <p/>
                  <p><span>{{ team.projectManager }}</span><span>{{ team.contact }}</span>
                  <p/>
                </div>
              </template>
              <template slot="serviceTime" slot-scope="{serviceTime}">
                <div class="deadline">
                  <p>{{ serviceTime }}个月</p>
                  <p>({{ serviceTime }}到期)</p>
                </div>
              </template>
              <template slot="plan" slot-scope="plan">
                <div class="plan">
                  <div v-if="plan.dateMatters">
                    <p>{{ plan.dateDay }}前</p>
                    <p>{{ plan.dateMatters }}</p>
                  </div>
                  <p v-else>服务到期</p>
                </div>
              </template>
              <template slot="auction" slot-scope="item">
                <a-button type="link" size="small" icon="file-text" @click="handleAuction(item,'view')">查看详情</a-button>
                <template v-if="query.tabStatus === 1">
                  <a-divider type="vertical" style="margin:0"/>
                  <a-tooltip title="方案提交已截止" v-if="!item.behind">
                    <a-button type="link" size="small" icon="file-text" disabled class="common-table-disabled">方案报送</a-button>
                  </a-tooltip>
                  <a-button type="link" size="small" icon="file-text" v-else @click="handleAuction(item,'sub')" >方案报送</a-button>
                  <a-divider type="vertical" style="margin:0"/>
                  <a-button type="link" size="small" icon="file-text" @click="handleAuction(item,'aba')">放弃竞标</a-button>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
      <ProjectModal :projectInfo="projectInfo" :sign="'fail'" ref="failModal"/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import ProjectModal from '@/components/modal/project-modal';
import { clearProto, disabledDate } from "@/plugin/tools";
import { columns, colType } from "@/views/main/my-project/source";
import {amcBidDetail, amcBiding ,amcBidAimed ,amcBidAbandon,amcBidInvalid,unreadInfo,changeUnRead} from "@/plugin/api/my-biding"
export default {
  name: 'ToReview',
  data() {
    return {
      navData:[
        {id:1,title:'我的项目',path:'/provider/review'},
        {id:2,title:'我的竞标',path:'/provider/review'},
      ],
      tabType:[
        { id:1, title:'进行中' ,dot:true},
        { id:2, title:'已中标' ,dot:true},
        { id:3, title:'已放弃' ,dot:false},
        { id:4, title:'已失效' ,dot:true},
      ],

      http:{
        1:amcBiding,  //进行中
        2:amcBidAimed, //已中标
        3:amcBidAbandon, //已放弃
        4:amcBidInvalid  //已失效
      },
      // 请求参数字段
      params:{
        aimStatus: 1,
        page: 1,
        size: 10,
        sortField: "",
        sortOrder: ""
      },
      query:{
        username:"",
        startTime:'',
        endTime:'',
        tabStatus:1,
        orderType:'',
        orderField:'',
      },
      tabConfig:{
        dataSource:[{
          businessTeam: "浙萧",
          closeSubmitDeadline: 0,
          contact: "17767790721",
          debtCaptial: "199.12",
          debtInterest: "31.30",
          debtor: "杭州圣淘控股集团有限公司",
          gmtCreate: "2020-12-29",
          gmtModify: "2020-12-29",
          id: 1343752189446983700,
          isRead: 0,
          process: 2,
          projectManager: "王经理",
          realSubmitDeadline: null,
          security: "1",
          submitDeadline: null,
          advanceLast:false,
          aggrementDate: "2020-12-29",
          aimBackPrice: "9999.99",
          dateDay: "2020-12-29",
          dateMatters: "腾房完毕",
          serviceTime: "2020-12-29",
          abandonDate:"2020-12-29",
          readSubmitDeadline:"2020-12-29"
        },{
          businessTeam: "浙萧",
          closeSubmitDeadline: 0,
          contact: "17767790721",
          debtCaptial: "199.12",
          debtInterest: "31.30",
          debtor: "杭州圣淘控股集团有限公司",
          gmtCreate: "2020-12-29",
          gmtModify: "2020-12-29",
          id: 1343752189446983700,
          isRead: 0,
          process: 0,
          projectManager: "王经理",
          realSubmitDeadline: null,
          security: "1",
          submitDeadline: null,
          advanceLast:false,
          aggrementDate: "2020-12-29",
          aimBackPrice: "9999.99",
          dateDay: "2020-12-29",
          dateMatters: "腾房完毕",
          serviceTime: "2020-12-29",
          abandonDate:"2020-12-29",
          readSubmitDeadline:"2020-12-29"
        }],
        size:'middle',
        pagination:{
          total:40,
          showSizeChanger:true,
          pageSizeOptions:['10', '20', '30', '40'],
          showQuickJumper:true,
          showTotal:val=>`共${val}条信息`,
        },
      },
      disabledDate,
      projectInfo:{},
    };
  },
  components:{
    Breadcrumb,
    ProjectModal
  },
  created() {
    this.getProjectList();
    this.getUnreadInfo();
    /*aimedUnRead: 1
    goingUnRead: 1
    invalidUnRead: 1*/
  },
  methods:{
    //获取项目列表
    getProjectList(){
      this.http[this.params.aimStatus](this.params).then(res=>{
        if(res.code === 20000){
          console.log(res)
          this.tabConfig.pagination.total = res.data.total;
          this.tabConfig.dataSource = res.data.list;
        }
      })
    },
    //获取进行中,已中标,已失效是否已读状态
    getUnreadInfo(){
      unreadInfo().then(res=>{
        console.log(res)
        this.tabType[0].dot = res.data.goingUnRead;
        this.tabType[1].dot = res.data.aimedUnRead;
        this.tabType[3].dot = res.data.invalidUnRead;
      })
    },
    // 搜索查询
    handleSubmit(){
      this.getProjectList();
    },
    // tab状态切换
    handleTabChange(val){
      this.query.tabStatus = val;
      this.getProjectList()
    },
    // 分页,排序
    handleTableChange(pagination, filters, sorter){
      this.params.page = pagination.current;
      this.params.size = pagination.pageSize;
      this.params.sortField = sorter.field;
      this.params.sortOrder = sorter.order ? sorter.order === "ascend" ? "ASC" : "DESC" : "";
      this.getProjectList();
    },
    //tablet添加行点击事件
    click(row){
      return {
          on: {
            click: () => {
              //未读消息变为已读
              changeUnRead(row.id).then(res=>{
                console.log(res)
              })
            }
          }
      }
    },
    // table操作列
    handleAuction(item,type){
      console.log(clearProto(item));
      if (type === 'aba') {
        amcBidDetail(item.id).then(res=>{
          console.log(res)
        if(res.code === 20000){
          this.projectInfo = clearProto(res.data)
          this.$refs.failModal.handleOpenModal();
        }
      })
      }
      if(type === 'view'){
        changeUnRead(item.id).then(res=>{
          console.log(res)
        })
        this.$router.push({path:"detail",query:{id:item.id}})
      }
    },
  },
  computed:{
    columns:function (){
      return columns[colType[this.query.tabStatus]]
    }
  }
}
</script>

<style scoped lang="scss">
.biding-wrapper{
  padding: 16px;
  &-content{
    background-color: #ffffff;
  }
  .biding-query{
    padding: 20px;
  }
  .biding-hr{
    width: 100%;
    height: 16px;
    background-color: #f2f3f5;
  }
  .biding-content{
    &-table{
      padding: 4px 20px 20px;
    }
  }
}
.query-item-prefix{
  font-size: 14px;
}
.content-action{
  margin-bottom: 20px;
}
.content-action button{
  margin-right: 15px;
}
</style>
<style lang="scss">
.query-item-prefix{
  height: 100%;
  width: 90px;
  text-align:center;
  border-right: 1px solid #ddd;
}
.custom-prefix-6 input{
  padding-left: 113px!important;
}
.common-table-disabled{
  cursor: pointer!important;
}
.tipsInfo{
  width:fit-content;
  color:#F5222D;
  border:1px #F5222D dashed;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
</style>
