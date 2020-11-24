<template>
  <div class="layout-menu">
    <a-menu
        mode="inline"
        :default-selected-keys="defaultKey"
        :default-open-keys="defaultOpenKey"
        :style="{ height: '100%', borderRight: 0 }"
    >
      <a-sub-menu v-for="item in source" :key="item.id">
        <span slot="title" v-if="item.title">
          <a-icon :type="item.icon" v-if="item.icon"/>{{item.title}}
        </span>
        <a-menu-item v-for="cItem in item.child" :key="`${item.id}${cItem.id}`">
          <router-link :to="`${item.path}${cItem.path}`">{{ cItem.title }}</router-link>
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
          title:'服务商管理',
          icon:'team',
          path:'/provider',
          child:[
            { id:'1', title:'待审查', path:'/review' },
            { id:'2', title:'已入库', path:'/storage' },
          ]
        },
        {
          id:'3',
          title:'招商管理',
          icon:'solution',
          path:'/investment',
          child:[
            { id:'1', title:'招商项目管理', path:'/list' }
          ]
        },
        {
          id:'4',
          title:'服务跟踪',
          icon:'desktop',
          child:[
            { id:'1', title:'服务跟进管理', path:'/' },
            { id:'2', title:'收支审批管理', path:'/' },
          ]
        },
        {
          id:'5',
          title:'内部权限管理',
          icon:'key',
          child:[
            { id:'1', title:'机构与账户', path:'/' },
            { id:'2', title:'登录界面', path:'/login' }
          ]
        },
      ]
    };
  },
}
</script>

<style scoped>
.layout-menu .ant-menu-item{
  margin: 0!important;
}
</style>
