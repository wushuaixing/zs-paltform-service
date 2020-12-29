<template>
  <div>
    <Breadcrumb :source="navData" icon="environment"></Breadcrumb>
    <div class="biding-wrapper">
      <div class="biding-wrapper-content">
        <div class="biding-query">
          <a-form-model layout="inline" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item>
              <a-input v-model="query.username" placeholder="请输入债务人名称" class="custom-prefix-6" style="width: 500px">
                <template slot="prefix" >
                  <div class="query-item-prefix">债务人名称</div>
                </template>
              </a-input>
            </a-form-model-item>
            <a-form-model-item label="当前进展：" v-if="query.tabStatus === 1">
              <a-select v-model="query.orgType" placeholder="请选择当前竞标进展" style="width: 180px" allowClear>
                <a-select-option value="1">方案待提交</a-select-option>
                <a-select-option value="2">方案已提交</a-select-option>
              </a-select>
            </a-form-model-item>
            <a-form-model-item>
              <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class="biding-hr"/>
        <div class="biding-content">
          <a-tabs @change="handleTabChange">
            <a-tab-pane v-for="i in tabType" :key="i.id">
              <template slot="tab">
                <a-badge :dot="i.dot"  :numberStyle="{width:'8px',height:'8px'}">{{i.title}}</a-badge>
              </template>
            </a-tab-pane>
          </a-tabs>
          <div class="biding-content-table">
            <a-table :columns="columns" v-bind="tabConfig" @change="handleTableChange">
              <template slot="debtor" slot-scope="{debtor}">
                <span>{{debtor}}</span>
              </template>
              <template slot="amount" slot-scope="amount">{{amount|amountTh}}</template>
              <template slot="security" slot-scope="{security}">{{security|guarantyType}}</template>
              <template slot="process" slot-scope="{process,advanceLast}">
                <a-avatar :size="6" :style="{backgroundColor: process===0 ? '#F5222D' : process===1 ? '#52C41A' : '#FAAD14',marginRight:'5px'}"/>
                {{process|evolveType}}<br>
                <a-tag color="#f50" v-if="advanceLast">方案提交即将截止</a-tag>
              </template>
              <template slot="datetime" slot-scope="time">{{time|timeFilter}}</template>
              <template slot="businessTeam" slot-scope="{businessTeam}">
                <div class="contactWay">
                  <p>{{ businessTeam}}
                  <p/>
                  <!-- <p><span>{{ contactWay.name }}</span><span>{{ contactWay.phone }}</span>
                  <p/> -->
                </div>
              </template>
              <template slot="serviceTime" slot-scope="{serviceTime}">
                <div class="deadline">
                  <p>{{ serviceTime }}个月</p>
                  <p>({{ serviceTime }}到期)</p>
                </div>
              </template>
              <template slot="plan" slot-scope="{plan}">
                <div class="plan">
                  <div v-if="plan.flag">
                    <p>{{ plan.time }}前</p>
                    <p>({{ plan.content }})</p>
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
    <planModal/>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import ProjectModal from '@/components/modal/project-modal';
import planModal from "./Plan-modal";
import { clearProto, disabledDate } from "@/plugin/tools";
import { columns, colType } from "@/views/main/my-project/source";
import { amcBiding,amcBidAimed} from "@/plugin/api/my-biding"
export default {
  name: 'ToReview',
  data() {
    return {
      navData:[
        {id:1,title:'服务商管理',path:'/provider/review'},
        {id:2,title:'待审查',path:'/provider/review'},
      ],
      tabType:[
        { id:1, title:'进行中' ,dot:false},
        { id:2, title:'已中标' ,dot:false},
        { id:3, title:'已放弃' ,dot:false},
        { id:4, title:'已失效' ,dot:false},
      ],
      tabStatus:1,
      params:{
        aimStatus: 1,
        debtor: "",
        page: 1,
        process: 0,
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
          businessTeam: "浙江不知名的团队",
          closeSubmitDeadline: 0,
          debtCaptial: "9999.99",
          debtInterest: "9999.99",
          debtor: "杭州阿里巴巴集团",
          gmtCreate: "2020-12-23T02:46:50.000+0000",
          gmtModify: "2020-12-23T02:46:50.000+0000",
          id: 1234567890,
          isRead: 0,
          process: 0,
          advanceLast:false,
          realSubmitDeadline: null,
          security: "1",
          submitDeadline: null
        },{
          key: 2,
          name: '临时用户2', //债务人名称
          money1: 14321.123123, //债权本金
          money2: 1435, //债权利息
          money3: 4343.999, //目标回款金额
          advance: 2, //当前进展
          advanceLast: true,//当前进展--方案提交即将截止
          guaranty: '抵押+担保', //担保方式
          contactWay: {  //对接团队及联系方式
            orgName: '源城资产',
            name: '王经理',
            phone: '18537729667',
          },
          updateTime: '2033-09-25', //更新日期
          signDate: '2021-01-05', //合同签订日期
          abaDate: '2025-02-25', //放弃日期
          failDate: '2023-11-02', //失效日期
          deadline: { //服务期限
            monthNum: 68,
            endTime: '2028-02-05',
          },
          plan: { //本阶段计划
            time: '2010-09-25',
            content: '诉讼完结',
            flag: false,
          },
          behind: false,
          guarantorsList: ['上海市奉贤区南奉公路999弄370号1层，张艰苦，李奋斗'],
          msgsInfoList: ['贵州省遵义市播州区鸭溪镇黎明路溪城鸣苑2栋1层1-11号商业用房', '惠州大亚湾霞涌霞光西路3号海韵雅苑2栋24层03号房屋']
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
    ProjectModal,
    planModal,
  },
  created() {
    amcBiding(this.params).then(res=>{
      console.log(res);
      this.tabConfig.pagination.total = res.data.total;
      this.tabConfig.dataSource = res.data.list;
    })
    amcBidAimed({
      aimStatus: 2,
      debtor: "",
      page: 1,
      process: 0,
      size: 10,
      sortField: "",
      sortOrder: ""
    }).then(res=>{
      console.log(res)
      // this.tabConfig.dataSource = res.data.list;
    })
  },
  methods:{
    handleSubmit(e){
      e.preventDefault();
      console.log(clearProto(this.query));
    },
    handleTabChange(val){
      this.query.tabStatus = val;
    },
    handleTableChange(pagination, filters, sorter){
      console.log(pagination,sorter);
    },
    handleAuction(item,type){
      // console.log(item);
      if (type === 'aba') {
        this.projectInfo = clearProto(item);
        this.$refs.failModal.handleOpenModal();
      }
      if(type === 'view'){
        console.log(item);
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
</style>
