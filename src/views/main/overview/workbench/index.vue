<template>
  <div class="workbench-wrapper">
    <div class="workbench-item workbench-left">
      <div class="item-wrapper item-border">
        <div class="item-title item-format">服务商注册情况</div>
        <div class="item-content item-format">这是内容</div>
      </div>
      <div class="item-wrapper item-border">
        <div class="item-title item-format">项目招商情况</div>
        <div class="item-content item-format">这是内容</div>
      </div>
      <div class="item-wrapper">
        <div class="item-title item-format">服务进展情况</div>
        <div class="item-content item-format">这是内容</div>
      </div>
    </div>
    <div class="workbench-item workbench-right">
      <div class="item-wrapper item-border">
        <div class="item-title item-format">每日新增注册阶段分布</div>
        <div class="item-content item-format">这是内容</div>
      </div>
      <div class="item-wrapper">
        <div class="item-title item-format">我的待办</div>
        <div class="item-content item-format">
          <Charts />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Charts from './charts';
export default {
  name: 'Workbench',
  nameComment:"工作台",
  components:{
    Charts
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
  .workbench{
    &-item{
      height: 100%;
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
