<template>
<div class="workbench">
<a-spin :spinning="spinning" class="spin-wrapper" tip="Loading......" />
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format ">待办事项</div>
        <div class="item-content item-format item-thing item-toDo">
          <!-- 待办事项 -->
            <div class="emptyState" v-if="list.length===0">
              <img src="../../../assets/img/toDoList.png" alt="一张空待办事项的图片" class="emptyImg">
              <div>暂无待办事项</div>
            </div>
            <div class="toDoList" v-else>
              <ul class="through">
                <li  v-for="(item, index) in list" :key="index">
                  <a-badge :status="MATTER_TYPE[item.code].text" />
                  <span class="thing">{{ MATTER_TYPE[item.code].name}}</span>
                  <span class="message">{{item.message}}</span>
                   <a-button type="link" @click="onTarget(MATTER_TYPE[item.code].path, item)" >立即前往</a-button>
                   <!-- <router-link :to="MATTER_TYPE[item.code].path">立即前往</router-link> -->
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item-project item-format">竞标项目进度概览</div>
        <!-- <div class="empty" v-if="echarts.myProjectsNum ===0 && echarts.myProjectCaseUnSubmit===0 && echarts.myProjectsReview ===0 && echarts.myProjectsAimed===0 &&echarts.myProjectsInvalid===0 &&echarts.myProjectAbandon ===0" >
          <a-empty description>
            <slot name="description">您还没有已开始的项目，去<router-link to="/center">服务商项目招商中心</router-link>添加第一个项目</slot>
          </a-empty>
        </div> -->
        <!-- 未添加项目 -->
        <div class="empty" v-show="!isShowEcharts">
          <img src="../../../assets/img/empty.png" alt="一张空状态图片" class="emptyImg">
          <div>您还没有已开始的项目</div>
          <div>去<router-link to="/center">服务项目招商中心</router-link>添加第一个项目</div>
        </div>
        <!-- 项目echarts显示 -->
        <div class="item-content item-format"  v-show="isShowEcharts">
          <div class="total">我的项目总数：{{echarts.myProjectsNum}}</div>
          <div class="data-display">
            <div class="chart">
              <div id="main"></div>
            </div>
            <div class="schemeProcess">
              <a-badge color="#9200FF" style="marign-left: 12px" text="方案待提交" />
              <!-- <a-button type="link" @click="onTarget(MATTER_TYPE[item.code].path, item.projectId)" >{{echarts.myProjectCaseUnSubmit}}</a-button> -->
              <router-link to="/project/biding"  >{{echarts.myProjectCaseUnSubmit}}</router-link>
              <br />
              <a-badge text="方案已提交" color="#67CE57"/>
              <router-link to="/project/biding">{{echarts.myProjectCaseSubmitted}}</router-link>
              <br />
              <a-badge text="方案审批中" color="#F7CE22" />
              <router-link to="/project/biding">{{echarts.myProjectsReview}}</router-link>
              <br />
            </div>
            <div class="schemeStatus">
              <a-badge text="中标" color="#44D7B6"/>
              <router-link to="/project/biding">{{echarts.myProjectsAimed}}</router-link>
              <br />
              <a-badge text="失效" color="#01A0FF"/>
              <router-link to="/project/biding">{{echarts.myProjectsInvalid}}</router-link>
              <br />
              <a-badge text="放弃" color="#F5222D"/>
              <router-link to="/project/biding">{{echarts.myProjectAbandon}}</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="workbench-item workbench-right">
      <div class="item-wrapper">
        <div class="item-title item-format">我的日程</div>
        <div class="item-content item-format">
          <a-calendar
            mode="month"
            valueFormat="YYYY-MM-D"
            @panelChange="onPanelChange">
            <ul slot="dateCellRender" slot-scope="value" class="events">
              <li v-for="item in getListData(value)"  :key="item.content">
                <a-badge :status="item.type" :text="item.content" />
              </li>
            </ul>
          </a-calendar>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
/*eslint-disable*/
import { getEcharts } from "@/plugin/api/echarts";
import { getCalendar, getTODoList, removeToDolist} from "@/plugin/api/calendar";
import { MATTER_TYPE } from "./toDoList";
import echarts from "echarts";
export default {
  name: "Workbench",
  nameComment: "工作台",
  components: {
  },
  data() {
    return {
      spinning:true,
      // 后台图表的数据
      echarts: {},
      // 需要渲染的事项数据
      listData:[],
      // 待办事项的数据
      list: [],
      // 提醒类型
      MATTER_TYPE,
      // 开始时间和结束时间请求的携带参数
      schedule:{
        endDate:"",
        startDate:""
      },
      // 事项数据
      data: []
    };
  },
  computed: {
    isShowEcharts(){
     return Object.values(this.echarts).some(i=>i!==0)
    }
  },
  methods: {
    getListData(value) {
      let listData = [];
      for (let i = 0; i < this.data.length; i++) {
        let dateStr = `${value.year()}-${(value.month() + 1).toString().padStart(2, 0)}-${value.date().toString().padStart(2, 0)}`;
        if (dateStr === this.data[i].dateDay) {
          this.data[i].matters.forEach( item => {
            var obj = { type: "processing", content: item.dateMatters };
            listData.push(obj);
          });
          return listData;
        }
      }
    },
    // 修改表单
    onPanelChange(value) {
      // console.log(value.slice(0,8) + '01',value.slice(0,8) + '31');
      this.schedule.endDate = value.slice(0,8) + '01';
      this.schedule.startDate = value.slice(0,8) + '31';
      getCalendar({
				'startDate': this.schedule.endDate,
        'endDate': this.schedule.startDate
			}).then((res) => {
				if (res.code !== 20000) return this.$message.error("获取日历事项失败");
        this.data = res.data
        this.spinning = false
			})
    },
    // 获取日历事项
    async getCalendarData () {
      var time = new Date().toLocaleString();
      let baseDate = time.slice(0,7).replace("/","-");
      let startDate = baseDate + '-' + "01";
      let endDate = baseDate + '-' + "31";
      const res = await getCalendar({startDate,endDate})
      if (res.code !== 20000) return this.$message.error("获取日历事项失败");
      this.data = res.data
      this.spinning = false
    },
    // 待办事项
    async getList() {
      const res = await getTODoList();
      if (res.code !== 20000) return
        this.list = res.data
        this.spinning = false
    },
    //echarts饼图
    async initECharts () {
      let myChart = echarts.init(document.getElementById("main"));
      const res = await getEcharts();
      if (res.code !== 20000) return this.$message.error('获取图表数据失败');
      this.echarts = res.data;
      this.spinning = false
      let option = {
      color: ['#9200FF', '#67CE57','#F7CE22','#44D7B6','#01A0FF','#F5222D'],
        tooltip: {
            trigger: 'item',
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            // avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center',
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: this.echarts.myProjectCaseUnSubmit, name: '方案待提交'},
              { value: this.echarts.myProjectCaseSubmitted, name: '方案已提交'},
              { value: this.echarts.myProjectsReview, name:'方案审批中'},
              { value: this.echarts.myProjectsAimed, name: '中标'},
              { value: this.echarts.myProjectsInvalid, name: '失效'},
              { value: this.echarts.myProjectAbandon, name:'放弃'},
            ]
          }
        ]
      }
    myChart.setOption(option);
    },
    // 根据详情路由跳转
    onTarget (path,item) {
      this.$router.push({path,query:item.projectId})
      console.log(item);
      if (item.code === 8 || item.code === 7) {
        removeToDolist({code:item.code}).then((res)=>{
          if(res.code!==20000) return 
          this.getList()
        })
      }
    }
  },
  created () {
    this.getCalendarData()
    this.getList()
  },
  mounted() {
    this.initECharts()
  }
}
</script>

<style scoped lang="scss">
$leftWidth: 470px;
.workbench-wrapper {
  // width: 1440px;
  height: 100%;
  padding: 16px;
  a {
      text-decoration: none!important;
      color: #0A91B4!important;
    }
  .workbench {
    &-item {
      height: 100%;
      background-color: #ffffff;
    }
    &-left {
      float: left;
      width: $leftWidth;
      border-right: 10px solid $background-base;
    }
    &-right {
      margin-left: $leftWidth;
    }
  }
  .item {
    &-format {
      box-sizing: border-box;
      padding: 10px;
      font-size: 14px;
      line-height: 1;
      border-bottom: 1px solid #E9E9E9;
    }
    &-border {
      border-bottom: 10px solid $background-base;
    }
    &-title {
      padding: 20px 24px;
      border-bottom: 1px solid #E9E9E9;
      line-height: 1.5;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #262626;
    }
    &-project {
      padding: 20px 24px;
      // border-bottom: 1px solid $background;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
    }
    &-content {
      box-sizing: border-box;
      min-height: 273px;
    }
    &-thing {
      height: 515px;
    }

  }
    ul {
      margin: 0;
      padding: 0;
    }
    .through {
      height: 500px;
      ul {
        height: 500px;
        overflow-y: auto;
      }
      li {
        list-style: none;
        border-bottom: 1px solid #E9E9E9;
        margin-left: 16px;
        padding: 10px 0;
      }
      /deep/.ant-btn-link {
        color: #1094B5;
      }
    }
    .data-display {
      display: flex;
      justify-content: space-between;
      margin-top: 5px;
      width: 100%;
      height: 200px;
      .ant-badge {
        margin: 10px 10px;
      }
    }
    .chart {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
    }
    .schemeProcess,.schemeStatus {
      overflow: hidden;
      width: 40%;
      margin: 10px 0 10px 20px;
      span {
        height: 20px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #333333;
        line-height: 20px;
      }
      /deep/span[data-v-354f9fd6] {
        padding: 2px 40px 2px 0;
      }
    }
      /deep/.ant-badge-status-dot {
        width: 8px;
        height: 8px;
      }
    .total {
      padding: 0 14px;
      margin-top: 10px;
      height: 16px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #333333;
      line-height: 16px;
    }
    .empty{
      color: #7F7F7F;
      margin-top: 50px;
      text-align: center;
      min-height: 220px;
      .emptyImg {
        margin-bottom: 24px;
      }
    }
    .emptyState {
      color: #7F7F7F;
      margin-top: 150px;
      text-align: center;
      font-size: 14px;
      .emptyImg {
        margin-bottom: 24px;
      }
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
    /deep/.ant-badge-status-text {
      margin-left: 4px;
      height: 17px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999!important;
      line-height: 17px;
    }
    // 日历头样式
    /deep/.ant-fullcalendar-header {
      text-align: center;
      // margin-bottom: 5px;
      margin: 8px 0;
    }
    /deep/.ant-fullcalendar-column-header-inner {
      font-weight: 800;
      height: 14px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #333333;
      line-height: 14px;
      margin-bottom: 20px;
      text-align: center;
    }
    /deep/.ant-fullcalendar-date {
      border-top: 4px solid #e8e8e8;
      overflow: hidden;
    }
    /deep/.ant-fullcalendar-today .ant-fullcalendar-date {
      border-top: 6px solid #008cb0 !important;
      opacity: 0.8;
     
    }
    // 修改待办事项里面的滚动条样式
    /deep/.ant-fullcalendar-content {
      // height: 50px;
      overflow-y: auto;
    }
    /deep/.ant-fullcalendar-content::-webkit-scrollbar {
      width: 4px;
      height: 5px;
      background: #ccc;
    }
    /deep/.ant-fullcalendar-content::-webkit-scrollbar-thumb {
      width: 2px;
      border-radius: 3px;
      -webkit-box-align: inherit;
      background: rgba(47, 3, 88, 0.3);
    }
    /deep/.ant-badge-status-text {
      height: 12px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #666666;
      line-height: 12px;
    }
    // 日历输入框
    /deep/.ant-select-selection--single {
      width: 160px;
    }
    // /deep/.ant-fullcalendar-value {
    //   padding-top: 26px;
    //   padding-right: 14px;
    // }
  }
  // 隐藏月和年选择按钮
  /deep/.ant-radio-group {
    display: none;
  }
  span {
    font-weight: 400;
    font-size: 16px;
    padding: 3px 0;
  }
  .message {
    font-size: 14px;
    color: #7F7F7F;
    height: 20px;
    line-height: 20px;
  }
  #main{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 150px;
    height: 150px;
  }
  // 提醒类型样式
  .thing {
    color: #333333;
    line-height: 22px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 14px;
  }
  /deep/.ant-btn {
    padding: unset;
    height: 20px;
    line-height: 20px;
  }
  // 加滚动条 
  .toDoList {
    overflow-y: auto;
    // overflow: hidden;
  }
  
</style>
