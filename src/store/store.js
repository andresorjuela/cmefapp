import Vue from 'vue';
import Vuex from 'vuex';
import general from './modules/general/store'
Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    general
  }
});
