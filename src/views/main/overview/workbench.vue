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
          <ECharts :loading="false" addListener/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ECharts from '@/components/echarts';
export default {
  name: 'Workbench',
  nameComment:"工作台",
  components:{
    ECharts
  },
  data() {
    return {};
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
}
</style>
