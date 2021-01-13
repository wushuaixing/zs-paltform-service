import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCertification: true,
    isSubmitElements: true,
    info: {},
    isLogin: false,
  },
  getters: {
    getInfo: (state) => state.info,
  },
  mutations: {
    updateLoginStates: (state) => {
      state.isLogin = true;
    },
    updateInfo: (state, infoSource = {}) => {
      window.localStorage.token = infoSource.token;
      state.info = Object.assign({}, state.info, infoSource)
    },
    resetInfo: (state) => {
      state.info = {};
      state.isLogin = false;
      window.localStorage.token = '';
    },
    updateIdentity: (state, identity) => {
      state.info = Object.assign({}, state.info, { identity, isSubmitCertify: 1 })
    },
  },
  actions: {
    updateInfo: (context, source) => {
      context.commit('updateInfo', source)
    },
    login: (context, source) => {
      context.commit('updateInfo', source);
      context.commit('updateLoginStates');
    },
    updateIdentity: (context, identity) => {
      context.commit('updateIdentity', identity)
    },
  },
  modules: {
  }
})
