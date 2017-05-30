/**
 * Created by Moudi on 2017/5/30.
 */
const state = {
  version: ''
};

const mutations = {
  SET_VERSION(state, payload) {
    state.version = payload;
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
