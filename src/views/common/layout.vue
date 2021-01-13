<template>
  <div style="height: 100%" id="root-node-wrapper">
    <a-layout style="min-height: 100%" v-if="!loading" class="layout-wrapper">
      <a-layout-header class="header-wrapper" :style="{ position: 'fixed', zIndex: 99, width: '100%' }">
        <a-icon class="header-icon" type="codepen"/>
        <span class="header-title">浙商资产服务商招募管理系统</span>
        <a-menu theme="dark" mode="horizontal" :default-selected-keys="['a']" :selectedKeys="selectedKey"
                :style="{ lineHeight: '64px',display:'inline-block',verticalAlign: 'top',height:'64px' }">
          <a-menu-item key="a">
            <router-link to="/">我的</router-link>
          </a-menu-item>
          <a-menu-item key="b">
            <router-link to="/center">服务项目招商中心</router-link>
          </a-menu-item>
        </a-menu>
        <div class="header-info">
          <a-dropdown :trigger="['click']" placement="bottomRight" size="large"
                      :getPopupContainer="e=>e.parentElement" >
            <a-menu slot="overlay" >
              <a-menu-item key="1">
                <div @click="handleModifyPhone"><a-icon class="personal-icon" type="user" />修改绑定手机号</div>
              </a-menu-item>
              <a-menu-item key="2">
                <div @click="handleSetPwd" v-if="isSetPassword===0"><a-icon class="personal-icon" type="lock" />设置登录密码</div>
                <div @click="handleModifyPwd" v-if="isSetPassword===1"><a-icon class="personal-icon" type="lock" />修改登录密码</div>
              </a-menu-item>
              <a-menu-item key="3">
                <div @click="doLogout"><a-icon class="personal-icon" type="poweroff" />退出登录</div>
              </a-menu-item>
            </a-menu>
            <a-button type="link" icon="down" style="color:#fff;">Hi，{{username}}</a-button>
          </a-dropdown>
        </div>
      </a-layout-header>
      <router-view/>
    </a-layout>
    <a-spin v-if="loading" class="spin-wrapper" size="large" tip="数据加载中，请稍后..." />
    <ModifyPhoneModal ref="modifyPhone"></ModifyPhoneModal>
    <ModifyPwdModal ref="modifyPwd"></ModifyPwdModal>
    <SetPwdModal ref="setPwd"></SetPwdModal>
  </div>
</template>
<script>
  import { getInfo} from "@/plugin/api/base";
  import ModifyPhoneModal from "./personal/modify-phone"
  import ModifyPwdModal from "./personal/modify-password"
  import SetPwdModal from "./personal/set-password"
  import {logout} from "@/plugin/api/login"
  export default {
    data() {
      return {
        loading:true,
        selectedKey:['a'],
        info:{},
      };
    },
    components: {
      ModifyPwdModal,
      ModifyPhoneModal,
      SetPwdModal
    },
    methods:{
      handleModifyPhone(){
        this.$refs.modifyPhone.showModal()
      },
      handleModifyPwd(){
        this.$refs.modifyPwd.showModal()
      },
      handleSetPwd(){
        this.$refs.setPwd.showModal()
      },
      doLogout(){
        let _this = this
        this.$confirm({
          title:"是否退出登录?",
          centered:true,
          onOk(){
            logout()
            _this.$router.push('/login');
          }
        })
      }
    },
    created() {
	    if(!window.localStorage.token) return this.$router.push('/login');
	    const { hash } = window.location;
      if(/^#\/center/.test(hash))this.selectedKey = ['b'];
      if(!this.$store.state.isLogin){
        getInfo().then(res=>{
          this.loading = false;
          if(res.code === 20000){
            this.$store.commit('updateInfo', res.data);
          }else{
            this.$router.push("/login");
          }
        }).catch(err=>{console.log(err)}).finally(()=>this.loading = false)
      }else{
        this.loading = false;
      }
    },
    mounted() {
      // console.log('默认页面：首次加载！');
      console.log('检查校验：判断及检查相关token信息！');
    },
    computed:{
      username(){
        return this.$store.getters.getInfo.username;
      },
      isSetPassword(){
        return this.$store.getters.getInfo.isSetPassword;
      }
    },
    watch:{
      $route(to,from){
        if(to.path !== from.path){
          if(/\/center/.test(to.path)){
            this.selectedKey = ['b'];
          } else {
            this.selectedKey = ['a'];
          }
        }
      }
    }
  };
</script>

<style lang="scss">
.personal-icon{
  padding-right: 6px;
}
.root-node-wrapper{

}
.layout-wrapper {
  .header{
    &-wrapper{
      padding: 0 20px;
    }
    &-icon{
      margin-right: 15px;
      font-size: 20px;
      color: #fff;
    }
    &-title{
      color: #fff;
      font-size: 16px;
      margin-right: 15px;
    }
    &-info{
      float: right;
      &-text{
        color: #FFFFFF;
        height: 100%;
        padding: 0 12px;
        line-height: 65px;
        &:hover{
          background-color: $common-base-active;
          cursor:pointer;
        }
      }
    }
  }
}
.spin-wrapper{
  width: 100%;
  padding-top: 10vh!important;
}
.ant-modal-confirm-btns{
  margin-right: 50%;
  transform: translateX(50%);
}
</style>
