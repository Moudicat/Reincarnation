/**
 * Created by reddy on 2017/5/2.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import User from 'services/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    login({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        User.login(loginForm)
          .then(response => {
            if (response.code !== 0) throw new Error(response.msg);
            commit('SET_TOKEN', response.token);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    logout({commit}) {
      commit('SET_TOKEN', '');
    }
  }
});
