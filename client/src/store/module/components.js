/**
 * Created by Moudi on 2017/5/7.
 */
const state = {
  takeMeFlyState: false,
  bililiveInfo: []
};

const mutations = {
  SET_TAKEMEFLY(state, payload) {
    state.takeMeFlyState = payload;
  },
  SET_BILILIVEINFO(state, payload) {
    state.bililiveInfo = payload;
  }
};

const getters = {};

const actions = {};

export default {
  state,
  mutations,
  getters,
  actions
};
