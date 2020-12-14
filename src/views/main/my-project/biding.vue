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
              <template slot="amount" slot-scope="amount">{{amount|amountTh}}</template>
              <template slot="advance" slot-scope="{advance,advanceLast}">
                <a-avatar :size="6" :style="{backgroundColor: advance===2?'#f5222d':'#1890ff',marginRight:'5px'}"/>
                {{advance|evolveType}}<br>
                <a-tag color="#f50" v-if="advanceLast">方案提交即将截止</a-tag>
              </template>
              <template slot="auction" slot-scope="item">
                <span>{{item.user}}</span>
              </template>
              <template slot="auction" slot-scope="item">
                <a-button type="link" size="small" icon="file-text" @click="handleAuction(item,'view')">查看详情</a-button>
                <template v-if="query.tabStatus === 1">
                  <a-divider type="vertical" />
                  <a-tooltip title="方案提交已截止" v-if="!item.behind">
                    <a-button type="link" size="small" icon="file-text" disabled class="common-table-disabled">方案报送</a-button>
                  </a-tooltip>
                  <a-button type="link" size="small" icon="file-text" v-else @click="handleAuction(item,'sub')" >方案报送</a-button>
                  <a-divider type="vertical" />
                  <a-button type="link" size="small" icon="file-text" @click="handleAuction(item,'fail')">放弃竞标</a-button>
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 90vh;"></div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import { clearProto, disabledDate } from "@/plugin/tools";
import { columns, colType } from "@/views/main/my-project/source";

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
          key:1,
          name:'临时用户1',
          money1:12321.123123,
          money2:4187545,
          advance:1,
          behind:true,
        },{
          key:2,
          name:'临时用户2',
          money1:333333.123123,
          money2:32543,
          advance:2,
          advanceLast:true,
          behind:123123,
        }],
        size:'middle',
        pagination:{
          current:1,
          total:1,
          showQuickJumper:true,
          showLessItems:true,
          showTotal:val=>`共${val}条信息`,
        },
      },
      disabledDate,
    };
  },
  components:{
    Breadcrumb,
  },
  created() {
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
      console.log(sorter);
    },
    handleAuction(item,type){
      console.log(type);
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
