/**
 * Created by Moudi on 2017/5/6.
 */

const state = {
  miniAvatarState: false
};

const mutations = {
  SET_AVATAR(state, payload) {
    state.miniAvatarState = payload;
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
