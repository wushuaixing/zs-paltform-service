<template>
  <div class="attest-wrapper">
    <Breadcrumb :source="sourceList" icon="environment" />
    <div class="attest-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
const reg = new RegExp('/attest/qualifies');
export default {
  name: 'myAttestation',
  nameComment: '我的认证',
  data() {
    return {
      routeState:1,
    };
  },
  created() {
    const { path } = this.$route;
    this.routeState = reg.test(path) ? 1 : 2;
  },
  components:{
    Breadcrumb
  },
  computed:{
    sourceList:function () {
      return [
        { id:1,title:'我的认证',path:'/attest/qualifies'},
        this.routeState === 1 && {id:2,title:'资质认证',path:'/attest/qualifies'},
        this.routeState === 2 && {id:3,title:'要素认证',path:'/attest/factor'},
      ].filter(i=>i)
    }
  },
  watch:{
    $route(to,from){
      // console.log("to.path",to.path,from.path);
      if(to.path !== from.path) this.routeState = reg.test(this.$route.path) ? 1 : 2;
    }
  }
}
</script>

<style scoped lang='scss'>
.attest-wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  .attest-content{
    flex: 1;
  }
}
</style>

<style lang='scss'>
.attest-form{
  .ant-form-item-with-help{
    margin-bottom: 0;
  }
  .ant-form-item-label,.ant-form-item-control{
    line-height: 32px;
  }
  .ant-form-explain, .ant-form-extra{
    margin-top: 0;
    min-height: 25px;
  }
  .form-item-no-title{
    .ant-form-item-label label:after{
      content:' '
    }
  }
}
</style>
