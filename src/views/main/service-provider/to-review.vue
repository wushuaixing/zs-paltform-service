<template>
  <div>
    <Breadcrumb :source="navData" icon="environment">
      <OpenAccount slot="suffix" />
    </Breadcrumb>
    <div style="padding: 16px">
      <span>这是，待审查页面</span>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
import OpenAccount from './common/account';
export default {
  name: 'ToReview',
  data() {
    return {
      navData:[
        {id:1,title:'服务商管理',path:'/provider/review'},
        {id:2,title:'待审查',path:'/provider/review'},
      ]
    };
  },
  components:{
    OpenAccount,
    Breadcrumb,
  },
  created() {
    // const a = "<span>12312</span>";
  }
}
</script>

<style scoped>

</style>
