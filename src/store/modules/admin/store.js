import Vue from 'vue';
import Vuex from 'vuex';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);
const state = {
  isLoggedIn: false,
  admin: {},
  adminToken: '',
  adminList: [],
  dateList: [],
  requestList: [],
  appointmentList: [],
  DBStats:{}
};
export default {
  state,
  actions,
  getters,
  mutations,
};
