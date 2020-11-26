<template>
  <div>
    <Breadcrumb :source="navData" icon="environment"/>
    <div class="detail-wrapper">
      这是详情
    </div>
  </div>
</template>

<script>
const navData = [
  {id:1,title:'招商管理',path:'/investment/list'},
  {id:2,title:'招商项目管理',path:'/investment/list'},
  {id:2,title:'招商项目详情',path:''},
];
import Breadcrumb from '@/components/bread-crumb';
export default {
  name: 'ItemDetail',
  data() {
    return {
      navData
    };
  },
  components:{
    Breadcrumb
  }

}
</script>

<style scoped>
.detail-wrapper{
  padding: 16px;
}
</style>
