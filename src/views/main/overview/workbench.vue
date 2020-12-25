<template>
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format item-toDo">待办事项</div>
        <div class="item-content item-format item-thing">
          <!-- 未认证的服务商 -->
          <a-list v-if="false" item-layout="horizontal" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item">
              <a-list-item-meta description :title="item.title">
                <a slot="description" href="javascript:;">{{
                  item.description
                }}</a>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
          <!-- 认证过的服务商 -->
            <div v-if="true">
              <ul>
                <li>
                  <a-badge status="success" />
                  <span>[资质审核通过]：</span> {{test}}
                  <a href="javascript:;">立即前往</a>
                </li>
                <li>
                  <a-badge status="success" />
                  <span>[竞标成功]：</span>
                   <a href="javascript:;">立即前往</a>
                </li>
                <li>
                  <a-badge status="warning" />
                  <span>[方案提交即将截止]：</span>
                   <a href="javascript:;">立即前往</a>
                </li>
                <li>
                  <a-badge status="error" />
                  <span>[竞标失败]：</span>
                   <a href="javascript:;">立即前往</a>
                </li>
                 <li>
                  <a-badge status="error" />
                  <span>[竞标失败]：</span>
                   <a href="javascript:;">立即前往</a>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div class="item-wrapper">
        <div class="item-project item-format">竞标项目进度概览</div>
        <!-- 没有添加项目之前 -->
        <div v-if="isShow" class="empty">
          <a-empty :image="simpleImage" description>
            <slot name="description"
              >您还没有已开始的项目，去<a href="javascript:;"
                >服务商项目招商中心</a
              >添加第一个项目</slot
            >
          </a-empty>
        </div>
        <div class="item-content item-format" v-if="!isShow">
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
           <!-- <a-calendar @panelChange="onPanelChange" >
             <div slot="headerRender">123</div>
           </a-calendar> -->
          <!-- <DragVerify v-if="false"></DragVerify> -->
          <!--<img src="https://qiniu.yczcjk.com/123.png" alt="">-->
          <a-calendar>
              <a-date-picker  @change="onChange"/>
              <ul slot="dateCellRender" slot-scope="value" class="events">
                <!-- {{value}} -->
                <li v-for="item in getListData(value)"  :key="item.content">
                  <a-badge :status="item.type" :text="item.content" />
                </li>
              </ul>
              <template slot="monthCellRender" slot-scope="value">
                <div v-if="getMonthData(value)" class="notes-month">
                  <section>{{ getMonthData(value) }}</section>
                  <span>Backlog number</span>
                </div>
              </template>
            <slot>
              <a-month-picker placeholder="Select month" @change="onChange" />
              <br />
              <a-range-picker @change="onChange" />
              <br />
              <a-week-picker placeholder="Select week" @change="onChange" />
            </slot>
          </a-calendar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getEcharts } from "@/plugin/api/echarts";
import { getCalendar } from "@/plugin/api/calendar";
// import { _.merge } from 'lodash'
// import { _.cloneDeep } from 'lodash'
import echarts from "echarts";
// 模拟的数据 
const data = [
  {
    description: "立即前往",
    title: `【资质及要素认证】: 您已成功注册成为浙商资产服务商，为了更精准地给您推送优质项目，请您尽快进行服务商资质及要素认证！`,
  },
  {
    description: "立即前往",
    title:
      "【认证未通过】: 很抱歉，您提交的资质信息未通过审核，请进行编辑和重新提交！",
  },
  {
    description: "立即前往",
    title:
      "【认证未通过】: 很抱歉，您提交的要素信息未通过审核，请进行编辑和重新提交！",
  },
];
// list表数据
// const list = [
//   {
//     id: 1,
//     description: "点击前往",
//     title: `【资质审核通过】: 您已通过资质审核，您可在“服务项目招商中心”对您有意向的项目进行报名！`,
//   },
//   {
//     id: 2,
//     description: "点击前往",
//     title:
//       "【竞标成功】: 您提交的关于债务人xxx的服务方案已通过，请至“我的项目-我的竞标-已中标”列表中查看相关项目",
//   },
//   {
//     id: 3,
//     description: "点击前往",
//     title:
//       "【方案提交即将截止】: 您已成功注册成为浙商资产服务商，为了更精准地给您推送优质项目，请您尽快进行服务商资质及要素认证！",
//   },
//   {
//     id: 4,
//     description: "点击前往",
//     title: `【资质审核通过】: 您已通过资质审核，您可在“服务项目招商中心”对您有意向的项目进行报名！`,
//   },
//   {
//     id: 4,
//     description: "点击前往",
//     title: `【资质审核通过】: 您已通过资质审核，您可在“服务项目招商中心”对您有意向的项目进行报名！`,
//   }
// ];
export default {
  name: "Workbench",
  nameComment: "工作台",
  components: {
    // DragVerify
  },
  data() {
    return {
      // 图表显示
      isShow: false,
      data,
      // 后台图表的数据
      echarts:[
      ],
      listData:[],
      dev: []
      
    };
  },
  computed: {
    test () {
      return '[资质认证未确认]' + this.echarts + "试试看拼接"
    },
    
  },
  methods: {
    getListData(value) {
      // let listData;
      console.log(...value);
      console.log(value._d);
      // const dev = JSON.parse(JSON.stringify(value))
      // console.log(dev);
      // var deep = _.cloneDeep(value);
      // console.log(deep[0] === value[0]);
      // this.listData.push(value.date())
      // return listData
      // console.log(value.data());
      // this.arr[length] = value._d
      // switch (value.date()) {
      //   case 8:
      //     listData = [
      //       { type: "warning", content: "腾房完毕" },
      //       { type: "success", content: "完成评估" },
      //     ];
      //     break;
      //   case 10:
      //     listData = [
      //       { type: "warning", content: "This is warning event." },
      //       { type: "success", content: "This is usual event." },
      //       { type: "error", content: "This is error event." },
      //     ];
      //     break;
      //   case 15:
      //     listData = [
      //       { type: "warning", content: "This is warning event" },
      //       {
      //         type: "success",
      //         content: "This is very long usual event。。....",
      //       },
      //       { type: "error", content: "This is error event 1." },
      //       { type: "error", content: "This is error event 2." },
      //       { type: "error", content: "This is error event 3." },
      //       { type: "error", content: "This is error event 4." },
      //     ];
      //     break;
      //   default:
      // }
      // return listData || [];
    },

    getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    },
    
    // 日期修改
    onChange(date, dateString) {
      console.log(date, dateString);
    },
    // 获取后台日历数据
    async getListDatas (value) {
      const res = await getCalendar(value)
      console.log(res);
    }
  },
  created () {

  },
  async mounted() {
    var myChart = echarts.init(document.getElementById("main"));
    const res = await getEcharts(data)
    if (res.code !== 20000) return
    console.log(res);
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
          // avoidLabelOverlap: false,
          // label: {
          //   show: false,
          //   position: "center",
          // },
          // emphasis: {
          //   label: {
          //     show: true,
          //     fontSize: "30",
          //     fontWeight: "bold",
          //   },
          // },
          labelLine: {
            show: false,
          },
          data: [
            // { value: 30},
            // { value: this.echarts.myProjectCaseSubmitted},
            // { value: 70},
            // { value: 10},
            // { value: 30},
            // { value: 50},
            // console.log(this.echarts.myProjectCaseSubmitted),
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
  li {
    list-style: none;
    border-bottom: 1px solid #E9E9E9;
    margin: 0;
    padding: 10px 0;
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
    border-top: 4px solid #e8e8e8;
  }
  /deep/.ant-fullcalendar-today .ant-fullcalendar-date {
    border-top: 6px solid #008cb0 !important;
  }
}
span {
  font-weight: 800;
  font-size: 16px;
  padding: 3px 0;
}
#main{
  position: absolute;
  top: 0px;
  left: 0px;
  width: 150px;
  height: 150px;
}
</style>
