/**
 * Created by Moudi on 2017/5/30.
 */
const state = {
  version: '',
  bgUrl: '1_0800',
  status: []
};

const mutations = {
  SET_VERSION(state, payload) {
    state.version = payload;
  },
  SET_BGURL(state, payload) {
    state.bgUrl = payload;
  },
  SET_STATUS(state, payload) {
    state.status = payload;
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
