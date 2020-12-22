<template>
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format item-toDo">待办事项</div>
        <div class="item-content item-format item-thing">
          <a-list item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                description
                :title="item.title"
              >
                <a slot="description" href="javascript:;">{{ item.description }}</a>
                <!-- <a-avatar
                  slot="avatar"
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                /> -->
              </a-list-item-meta>
            </a-list-item>
          </a-list>
            <!-- 认证过的服务商 -->
          <a-list v-if="false" item-layout="horizontal" :data-source="list">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta
                description
                :title="item.title"
              >
               <a slot="description" href="javascript:;">{{ item.description}}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item-project item-format">竞标项目进度概览</div>
        <!-- 没有添加项目之前 -->
        <div v-if="false" class="empty">
           <a-empty :image="simpleImage"  description>
             <slot name="description">您还没有已开始的项目，去<a href="javascript:;">服务商项目招商中心</a>添加第一个项目</slot>
           </a-empty>
        </div>
        <div  class="item-content item-format">
          <div class="total">我的项目总数：</div>
          <div class="data-display">
            <!-- 饼形图 -->
            <div class="chart">
            
            </div>
            <div class="schemeProcess">
              <a-badge  status="pink" text="方案待提交">
              </a-badge>
              <span>7</span>
              <br />
              <a-badge status="warning" text="方案已提交" />
              <span>7</span>
              <br />
              <a-badge status="success" text="方案审批中" />
              <span>8</span>
              <br />
            </div>
            <div class="schemeStatus">
              <a-badge status="success" text="中标" />
              <span>5</span>
              <br />
              <a-badge status="warning" text="失效" />
              <span>8</span>
              <br />
              <a-badge status="error" text="放弃" />
              <span>6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="workbench-item workbench-right">
      <div class="item-wrapper">
        <div class="item-title item-format">我的日程</div>
        <div class="item-content item-format">
          <!-- <DragVerify v-if="false"></DragVerify> -->
          <!--<img src="https://qiniu.yczcjk.com/123.png" alt="">-->
          <a-calendar>
            <ul slot="dateCellRender" slot-scope="value" class="events" :mode="false">
              <li v-for="item in getListData(value)" :key="item.content">
                <a-badge :status="item.type" :text="item.content" />
              </li>
            </ul>
            <template slot="monthCellRender" slot-scope="value">
              <div v-if="getMonthData(value)" class="notes-month">
                <section>{{ getMonthData(value) }}</section>
                <span>Backlog number</span>
              </div>
            </template>
          </a-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DragVerify from '../../login/drag-verify';
// 模拟数据
// data 资质都未认证的数据  
const data = [
   {
    description:"立即前往",
    title: `【资质及要素认证】: 您已成功注册成为浙商资产服务商，为了更精准地给您推送优质项目，请您尽快进行服务商资质及要素认证！`,
  },
  {
    description:"立即前往",
    title: '【认证未通过】: 很抱歉，您提交的资质信息未通过审核，请进行编辑和重新提交！',
  },
  {
    description:"立即前往",
    title: '【认证未通过】: 很抱歉，您提交的要素信息未通过审核，请进行编辑和重新提交！',
  },
]
// list表数据
const list = [
   {
    description:"点击前往",
    title: `【资质审核通过】: 您已通过资质审核，您可在“服务项目招商中心”对您有意向的项目进行报名！`,
  },
  {
    description:"点击前往",
    title: '【竞标成功】: 您提交的关于债务人xxx的服务方案已通过，请至“我的项目-我的竞标-已中标”列表中查看相关项目',
  },
  {
    description:"点击前往",
    title: '【方案提交即将截止】: 您已成功注册成为浙商资产服务商，为了更精准地给您推送优质项目，请您尽快进行服务商资质及要素认证！',
  },
  {
    description:"点击前往",
    title: `【资质审核通过】: 您已通过资质审核，您可在“服务项目招商中心”对您有意向的项目进行报名！`,
  },
  {
    description:"点击前往",
    title: '【竞标成功】: 您提交的关于债务人xxx的服务方案已通过，请至“我的项目-我的竞标-已中标”列表中查看相关项目',
  },
  
]
export default {
  name: 'Workbench',
  nameComment:"工作台",
  components:{
    // DragVerify
  },
  data() {
    return {
      list,
      data
    };
  },
  methods : {
    getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
          ];
          break;
        case 10:
          listData = [
            { type: 'warning', content: 'This is warning event.' },
            { type: 'success', content: 'This is usual event.' },
            { type: 'error', content: 'This is error event.' },
          ];
          break;
        case 15:
          listData = [
            { type: 'warning', content: 'This is warning event' },
            { type: 'success', content: 'This is very long usual event。。....' },
            { type: 'error', content: 'This is error event 1.' },
            { type: 'error', content: 'This is error event 2.' },
            { type: 'error', content: 'This is error event 3.' },
            { type: 'error', content: 'This is error event 4.' },
          ];
          break;
        default:
      }
      return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
  },
  mounted(){
  }
}
</script>

<style scoped lang="scss">
$leftWidth:460px;
$background:#E9E9E9;;
.workbench-wrapper{
  height: 100%;
  padding: 16px;
  .workbench{
    &-item{
      height: 100%;
      background-color: #ffffff;
    }
    &-left{
      float: left;
      width: $leftWidth;
      border-right: 10px solid $background;
    }
    &-right{
      margin-left: $leftWidth;
    }
  }
  .item{
    &-format{
      padding: 16px;
      font-size: 14px;
      line-height: 1;
    }
    &-border{
      border-bottom: 10px solid $background;
    }
    &-title{
      border-bottom: 1px solid $background;
      line-height: 1.5;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #262626;
    }
    &-content{
      min-height: 150px;
      max-height: 880px;
    }
    &-thing{
      min-height: 500px;
      max-height: 600px;
    }
  }
  .item-toDo {
    margin: 0 20px;
    padding-left: 0;
  }
  .item-project {
    height: 16px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #262626;
    line-height: 16px;
  }
  .data-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 200px;
    // background-color: #333;
  }
  .chart {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: pink;
  }
  .schemeProcess {
    width: 30%;
  }
  .ant-badge {
    margin: 10px 10px;
  }
  .schemeStatus {
    width: 30%;
  }
  .empty {
    margin-top: 50px;
    text-align: center;
  }
  a {
    color: #1900ffb0;
    text-decoration: underline;
  }
  // 日历样式
  .events {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .events .ant-badge-status {
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    text-overflow: ellipsis;
    font-size: 12px;
  }
  .notes-month {
    text-align: center;
    font-size: 28px;
  }
  .notes-month section {
    font-size: 28px;
  }
  // 日历头样式
  /deep/.ant-fullcalendar-header {
    text-align: center;
  } 
  // .ant-fullcalendar-fullscreen {
  //   text-align: center;
  // }
  /deep/.ant-fullcalendar-column-header-inner {
    text-align: center;
  }
  /deep/.ant-fullcalendar-date {
    border-top: 4px solid #E8E8E8;
  }
  /deep/.ant-fullcalendar-today .ant-fullcalendar-date {
    border-top: 6px solid #008CB0!important;
  }
}
</style>
