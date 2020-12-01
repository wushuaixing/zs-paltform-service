<template>
  <div class="attest-wrapper">
    <Breadcrumb :source="[
        {id:1,title:'我的认证',path:'/attest/qualifies'},
        routeState===1 && {id:2,title:'资质认证',path:'/attest/qualifies'},
        routeState===2 && {id:3,title:'要素认证',path:'/attest/factor'},
      ].filter(i=>i)" icon="environment" />
    <div class="attest-content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/bread-crumb';
export default {
  name: 'myAttestation',
  nameComment: '我的认证',
  data() {
    return {
      routeState:1,
      navData:[
        {id:1,title:'我的认证',path:'/attest/qualifies'},
        {id:2,title:'资质认证',path:'/attest/qualifies'},
        {id:3,title:'要素认证',path:'/attest/factor'},
      ],
    };
  },
  created() {
    const { path } =this.$route;
    this.routeState = new RegExp('/attestation/qualifies').test(path)?1:2;
  },
  components:{
    Breadcrumb
  },
  watch:{
    $route(to,from){
      // console.log("to.path",to.path,from.path);
      if(to.path !== from.path) this.routeState = new RegExp('/attestation/qualification').test(this.$route.path)?1:2;
    }
  }
}
</script>

<style scoped lang='scss'>
.attest-wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
  .attest-content{
    padding: 16px;
    flex: 1;
  }
}
</style>
