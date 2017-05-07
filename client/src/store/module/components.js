/**
 * Created by Moudi on 2017/5/7.
 */
const state = {
  takeMeFlyState: false
};

const mutations = {
  SET_TAKEMEFLY(state, payload) {
    state.takeMeFlyState = payload;
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
