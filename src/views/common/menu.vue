<template>
  <div class="layout-menu">
    <a-menu
        mode="inline"
        :default-selected-keys="defaultKey"
        :selectedKeys="selectedKeys"
        theme="dark"
        :default-open-keys="defaultOpenKey"
        :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu v-for="item in source" :key="item.id">
        <span slot="title" v-if="item.title">
          <a-icon :type="item.icon" v-if="item.icon"/>{{item.title}}
        </span>
        <a-menu-item v-for="cItem in item.child" :key="`${item.id}${cItem.id}`">
          <router-link :to="`${item.path||''}${cItem.path||''}`">{{ cItem.title }}</router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      defaultKey:['11'],
      selectedKeys:[],
      defaultOpenKey:['1','2','3','4','5'],
      source:[
        {
          id:'1',
          title:'概览',
          icon:'appstore',
          path:'/overview',
          child:[
            { id:'1', title:'工作台', path:'' }
          ]
        },
        {
          id:'2',
          title:'我的项目',
          icon:'team',
          path:'/project',
          child:[
            { id:'1', title:'我的竞标', path:'/biding' },
            // { id:'2', title:'我的服务', path:'/serve' },
          ]
        },
        {
          id:'3',
          title:'我的认证',
          icon:'solution',
          path:'/attest',
          child:[
            { id:'1', title:'资质认证', path:'/qualifies' },
            { id:'2', title:'要素认证', path:'/factor' },
          ]
        },
      ]
    };
  },
  methods:{
    getSelectKey(path){
      let defaultKey = '1';
      let childKey = '1';
      this.source.filter(i=>i.path).forEach(i=>{
        if(new RegExp('^' + i.path).test(path)){
          defaultKey = i.id;
          (i.child || []).filter(i=>i.path).forEach(item=>{
            if(new RegExp('^' + i.path + item.path).test(path)) childKey = item.id;
          })
        }
      })
      return [defaultKey + childKey];
    }
  },
  created() {
    const { path } = this.$route;
    this.selectedKeys = this.getSelectKey(path);
  },
  watch:{
    $route(to,from){
      // console.log("to.path",to.path,from.path);
      if(to.path !== from.path) this.selectedKeys = this.getSelectKey(to.path);
    }
  }
}
</script>

<style scoped>
.layout-menu{
  background-color: #001529;
  height: 100%;
}
.layout-menu .ant-menu-item{
  margin: 0!important;
}
</style>
