import Vue from 'vue';
import Vuex from 'vuex';
import general from './modules/general/store';
import request from './modules/request/store';

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
    general,
    request,
  },
});
