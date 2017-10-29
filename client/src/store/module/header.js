/**
 * Created by Moudi on 2017/5/6.
 */

const state = {
  miniAvatarState: false,
  articleModeState: false,
  avatarUrl: 'https://moudicat-data.oss-cn-beijing.aliyuncs.com/cdn/images/avatar_240x240.png'
};

const mutations = {
  SET_AVATAR(state, payload) {
    state.miniAvatarState = payload;
  },
  SET_ARTICLEMODE(state, payload) {
    state.articleModeState = payload;
  },
  SET_AVATARURL(state, payload) {
    state.avatarUrl = payload;
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
