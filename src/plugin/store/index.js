import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCertification:true,
    isSubmitElements:true,
    info:{}
  },
  getters:{
    getInfo:(state)=> state.info,
  },
  mutations: {
    updateInfo:(state,infoSource)=>{
      state.info = Object.assign({},state.info,infoSource)
    }
  },
  actions: {
    updateInfo:(context,source)=>{
      context.commit('updateInfo',source)
    }
  },
  modules: {
  }
})
