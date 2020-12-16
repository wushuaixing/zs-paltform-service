<template>
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format">待办事项</div>
        <div class="item-content item-format">这是内容</div>
      </div>
      <div class="item-wrapper">
        <div class="item-title item-format">竞标项目进度概览</div>
        <div class="item-content item-format">这是内容</div>
      </div>
    </div>
    <div class="workbench-item workbench-right">
      <div class="item-wrapper">
        <div class="item-title item-format">我的日程</div>
        <div class="item-content item-format">
          <a-calendar>
            <ul slot="dateCellRender" slot-scope="value" class="events">
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
// import ECharts from '@/components/echarts';
export default {
  name: 'Workbench',
  nameComment:"工作台",
  components:{
  },
  data() {
    return {};
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
}
</script>

<style scoped lang="scss">
$leftWidth:350px;
$background:#f0f2f5;
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
      padding: 15px;
      font-size: 14px;
      line-height: 1;
    }
    &-border{
      border-bottom: 10px solid $background;
    }
    &-title{
      border-bottom: 1px solid $background;
      line-height: 1.5;
    }
    &-content{
      min-height: 150px;
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
}
</style>
