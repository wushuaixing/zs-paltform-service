<template>
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format item-toDo">待办事项</div>
        <div class="item-content item-format item-thing">
          <!-- 认证过的服务商 -->
            <div v-if="true">
              <ul class="through">
                <li  v-for="(item, index) in list" :key="index">
                  <a-badge :status="MATTYER_TYPE[item.code].text" />
                  <span class="thing">{{ MATTYER_TYPE[item.code].name}}</span>
                  <span class="message">{{item.message}}</span>
                  <router-link :to="MATTYER_TYPE[item.code].path">立即前往</router-link>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item-project item-format">竞标项目进度概览</div>
        <!-- 没有添加项目之前 -->
        <div v-if="echarts.myProjectsNum === 0" class="empty">
          <a-empty description>
            <slot name="description"
              >您还没有已开始的项目，去<router-link to="center">服务商项目招商中心</router-link>添加第一个项目</slot
            >
          </a-empty>
        </div>
        <div class="item-content item-format" v-if="echarts.myProjectsNum !== 0">
          <div class="total">我的项目总数：{{echarts.myProjectsNum}}</div>
          <div class="data-display">
            <!-- 饼形图 -->
            <div class="chart">
              <div id="main"></div>
            </div>
            <div class="schemeProcess">
              <a-badge color="#c23531" text="方案待提交" />
              <span>{{echarts.myProjectCaseUnSubmit}}</span>
              <br />
              <a-badge text="方案已提交" color="#2f4554"/>
              <span>{{echarts.myProjectCaseSubmitted}}</span>
              <br />
              <a-badge text="方案审批中" color="#61a0a8" />
              <span>{{echarts.myProjectsReview}}</span>
              <br />
            </div>
            <div class="schemeStatus">
              <a-badge text="中标" color="#d48265"/>
              <span>{{echarts.myProjectsAimed}}</span>
              <br />
              <a-badge text="失效" color="#91c7ae"/>
              <span>{{echarts.myProjectsInvalid}}</span>
              <br />
              <a-badge text="放弃" color="#749f83"/>
              <span>{{echarts.myProjectAbandon}}</span>
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
              @panelChange="onPanelChange"
          >
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
</template>

<script>
import { getEcharts } from "@/plugin/api/echarts";
import { getCalendar, getTODoList } from "@/plugin/api/calendar";
import { MATTYER_TYPE } from "./toDoList";
// import { _.merge } from 'lodash'
// import { cloneDeep } from 'lodash'
import echarts from "echarts";
export default {
  name: "Workbench",
  nameComment: "工作台",
  components: {
  },
  data() {
    return {
      // 后台图表的数据
      echarts:[],
      // 需要渲染的事项数据
      listData:[],
      // 待办事项的数据
      list: [],
      // 提醒类型
      MATTYER_TYPE,
      // 开始时间和结束时间的参数
      schedule:{
        endDate:"",
        startDate:""
      },
      // 事项数据
      data: [
        // { dateDay: '2020-12-2', dateMatters: ["吃饭","睡觉"], id: 1 },
        // { dateDay: '2020-12-6', dateMatters: ["敲代码"], id: 2 },
        // { dateDay: '2021-1-1', dateMatters: ["睡觉"], id: 3 },
      ],
    };
  },
  computed: {
  },
  methods: {
    getListData(value) {
      let listData = [];
      for (let i = 0; i < this.data.length; i++) {
        let dateStr = `${value.year()}-${value.month() + 1}-${value.date()}`
        if (dateStr === this.data[i].dateDay) {
          this.data[i].dateMatters.forEach( item => {
            var obj = { type: "warning", content: item };
            listData.push(obj);
          })
          return listData;
        }
      }
    },
    // 修改表单
    onPanelChange(value) {
      console.log(value);
      console.log(value.slice(0,8) + '01',value.slice(0,8) + '31')
      this.schedule.endDate = value.slice(0,8) + '01';
      this.schedule.startDate = value.slice(0,8) + '31';
    },
    onChange(date, dateString) {
      console.log(date.format('yyyy-MM'), dateString);
      this.getCalendearDatas ()
    },
    // 获取日历事项
    getCalendearDatas () {
      var time = new Date().toLocaleString()
      let baseDate = time.slice(0,7).replace("/","-");
      let startDate = baseDate + '-' + "01"
      let endDate = baseDate + '-' + "31"
      console.log(startDate,endDate)
      getCalendar({startDate,endDate}).then((res) => {
      console.log(res.data)
      if (res.code !== 20000) return this.$message.error("获取日历事项失败");
      // for (let item of res.data) {
      //   var reg = item.dateDay
      //   reg = reg.slice(0,10)
      // }
      this.data = res.data
    })
    },
    // 待办事项
    async getList() {
      const res = await getTODoList()
      console.log(res);
    //  this.list = res;
    if (res.code !== 20000) return this.$message.error('您还没有待办事项') 
      this.list = res.data
    }
  },
  created () {
    this.getCalendearDatas()
    this.getList()
  },
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    const res = await getEcharts()
    if (res.code !== 20000) return this.$message.error('获取图表数据失败') 
    // console.log(res);
    this.echarts = res.data
    var option = {
      label: {
        color:this.color
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          labelLine: {
            show: false,
          },
          data: [
            { value: this.echarts.myProjectCaseUnSubmit},
            { value: this.echarts.myProjectCaseSubmitted},
            { value: this.echarts.myProjectsReview},
            { value: this.echarts.myProjectsAimed},
            { value: this.echarts.myProjectsInvalid},
            { value: this.echarts.myProjectAbandon},
          ],
        },
      ],
    };
    myChart.setOption(option);
  },
};
</script>

<style scoped lang="scss">
$leftWidth: 460px;
$background: #e9e9e9;
.workbench-wrapper {
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
      border-right: 10px solid $background;
    }
    &-right {
      margin-left: $leftWidth;
    }
  }
  .item {
    &-format {
      padding: 16px;
      font-size: 14px;
      line-height: 1;
    }
    &-border {
      border-bottom: 10px solid $background;
    }
    &-title {
      border-bottom: 1px solid $background;
      line-height: 1.5;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 900;
      color: #262626;
    }
    &-content {
      min-height: 150px;
      max-height: 880px;
    }
    &-thing {
      min-height: 500px;
      max-height: 600px;
    }
    
  }
  ul {
    margin: 0;
    padding: 0;
  }
  .through {
    li {
      list-style: none;
      border-bottom: 1px solid #E9E9E9;
      margin: 0;
      padding: 10px 0;
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
    font-weight: 900;
    color: #262626;
    line-height: 16px;
  }
  .data-display {
    display: flex;
    justify-content: space-between;
    align-items: center;
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
  .schemeProcess {
    width: 30%;
  }
  .schemeStatus {
    width: 30%;
  }
  .total {
    margin-top: 10px;
    font-weight: 800;
  }
  .empty {
    margin-top: 50px;
    text-align: center;
  }
  // a {
  //   color: #1900ffb0;
  //   text-decoration: underline;
  // }
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
  /deep/.ant-fullcalendar-column-header-inner {
    font-weight: 800;
    text-align: center;
    // display: none;
  }
  /deep/.ant-fullcalendar-date {
    border-top: 4px solid #e8e8e8;
  }
  /deep/.ant-fullcalendar-today .ant-fullcalendar-date {
    border-top: 6px solid #008cb0 !important;
  }
}
// .error {
//   text-decoration: line-through;
// }
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
  // letter-spacing: 0.1em;
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
  font-weight: 800;
  font-size: 16px;
}
</style>
