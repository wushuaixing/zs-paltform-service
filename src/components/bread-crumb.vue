<template>
  <div class="bread-crumb-wrapper">
    <a-icon :type="icon" v-if="icon" class="bread-crumb-icon"/>
    <a-breadcrumb class="bread-crumb">
      <a-breadcrumb-item v-for="item in source" :key="item.id">
        <router-link :to="item.path">{{ item.title }}</router-link>
      </a-breadcrumb-item>
    </a-breadcrumb>
    <div class="bread-crumb-slot" >
      <slot name="suffix"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',
  data() {
    return {};
  },
  props:{
    source:{
      type: Array,
      default: ()=>[],
    },
    icon: {
      type:String,
      default:'environment',
    },
  }
}
</script>

<style scoped>
  .bread-crumb-wrapper{
    padding: 16px;
    position: relative;
    line-height: 20px;
    font-size: 14px;
    border-bottom: 1px solid #ddd;
  }
  .bread-crumb{
    display: inline-block;
  }
  .bread-crumb-wrapper .bread-crumb-icon{
    margin-right: 10px;
    display: inline-block;
  }
  .bread-crumb-wrapper .bread-crumb-slot{
    position: absolute;
    top: 8px;
    right: 16px;
    z-index: 1;
  }
</style>
