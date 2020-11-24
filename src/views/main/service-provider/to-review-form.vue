<template>
  <div>
    <Breadcrumb :source="navData" icon="environment">
      <OpenAccount slot="suffix" />
    </Breadcrumb>
    <div class="to-review-wrapper">
      <div class="to-review-query">
        <a-form layout="inline" @submit="handleSubmit">
          <a-form-item>
            <a-input v-decorator="['username']" placeholder="请输入联络人姓名" class="custom-prefix-5">
              <template slot="prefix" >
                <div class="query-item-prefix">联络人姓名</div>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="提交日期：" style="margin-bottom:0;">
            <a-form-item :style="{ display: 'inline-block'}" >
              <a-date-picker style="width: 100%" placeholder="搜索范围起始日期"/>
            </a-form-item>
            <span :style="{ display: 'inline-block',marginLeft:'-5px',width:'20px'}">至</span>
            <a-form-item :style="{ display: 'inline-block'}">
              <a-date-picker style="width: 100%" placeholder="搜索范围截止日期"/>
            </a-form-item>
          </a-form-item>
          <a-form-item label="机构类型：">
            <a-select v-decorator="['type']" placeholder="请选择机构类型" style="width: 150px">
              <a-select-option value="1">Option 1</a-select-option>
              <a-select-option value="2">Option 2</a-select-option>
              <a-select-option value="3">Option 3</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">查询</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div class="to-review-content">
        <a-tabs @change="handleTabChange">
          <a-tab-pane key="1" tab="已提交要素表"/>
          <a-tab-pane key="2" tab="未提交要素表"/>
          <a-tab-pane key="3" tab="仅认证手机号"/>
        </a-tabs>
        <div class="content-action">
          <a-button>全部</a-button>
          <a-button>只显示未读</a-button>
          <a-button>全部标为已读</a-button>
          <a-button icon="search">名单一键导出</a-button>
        </div>
        <a-table :columns="columns" :data-source="dataSource" size="middle" :pagination="pagination" @change="handleTableChange">
          <!--          <a slot="name" slot-scope="text">{{ text }}</a>-->
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import OpenAccount from './common/account';

const columns1 = [
  {
    title: '联络人姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '联系方式',
    dataIndex: 'age',
    key: 'age',
    width: 80,
  },
  {
    title: '机构类型',
    dataIndex: 'address',
    key: 'address 1',
    ellipsis: true,
  },
  {
    title: '机构名称',
    dataIndex: 'address',
    key: 'address 2',
    ellipsis: true,
  },
  {
    title: '从业时长',
    dataIndex: 'address',
    key: 'address 3',
  },
  {
    title: '涉业地区',
    dataIndex: 'address',
    key: 'address 41',
  },
  {
    title: '团队规模',
    dataIndex: 'address',
    key: 'address 42',
  },
  {
    title: '要素提交日期',
    dataIndex: 'address',
    key: 'address 43',
    ellipsis: true,
  },
  {
    title: '操作',
    dataIndex: 'address',
    key: 'address 44',
    ellipsis: true,
  },
];

export default {
  name: 'ToReview',
  data() {
    return {
      navData:[
        {id:1,title:'服务商管理',path:'/provider/review'},
        {id:2,title:'待审查',path:'/provider/review'},
      ],
      columns:columns1,
      dataSource:[{
        key:1,
        name:'临时用户',
      }],
      pagination:{
        current:1,
        total:1,
        showQuickJumper:true,
        showLessItems:true,
        size:'middle',
        showTotal:val=>`共${val}条信息`,
      }
    };
  },
  components:{
    OpenAccount,
    Breadcrumb,
  },
  created() {
    // const a = "<span>12312</span>";
  },
  methods:{
    handleSubmit(e){
      e.preventDefault();
      console.log(this.$form);
      console.log('handleSubmit');
    },
    handleTabChange(val){
      console.log(val);
    },
    handleTableChange(ev){
      console.log(ev);
    }
  }
}
</script>

<style scoped>
.to-review-wrapper{
  padding: 16px;
}
.query-item-prefix{
  font-size: 14px;
}
.content-action{
  margin-bottom: 10px;
}
.content-action button{
  margin-right: 15px;
}
</style>
<style>
.query-item-prefix{
  height: 100%;
  width: 80px;
  text-align:left;
  border-right: 1px solid #ddd;
}
.custom-prefix-5 input{
  padding-left: 100px!important;
}
</style>
