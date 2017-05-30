/**
 * Created by reddy on 2017/5/2.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import User from 'services/user';
import Storage from 'services/storage';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    user: {
      username: '',
      nickname: '',
      lastLoginTime: '',
      avatar: ''
    },
    articleModifyId: ''
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USERINFO(state, userInfo) {
      state.user.username = userInfo.username;
      state.user.nickname = userInfo.nickname;
      state.user.lastLoginTime = userInfo.lastLoginTime;
      state.user.avatar = userInfo.avatar;
    },
    SET_AMI(state, id) {
      state.articleModifyId = id;
    }
  },
  actions: {
    init({commit}) {
      if (Storage.get('token')) {
        commit('SET_TOKEN', Storage.get('token'));
      }
      if (Storage.get('userInfo')) {
        commit('SET_USERINFO', Storage.get('userInfo'));
      }
    },
    login({commit}, loginForm) {
      return new Promise((resolve, reject) => {
        User.login(loginForm)
          .then(response => {
            if (response.code !== 0) throw new Error(response.msg);
            commit('SET_TOKEN', response.token);
            Storage.set('token', response.token);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getInfo({commit}) {
      return new Promise((resolve, reject) => {
        User.getInfo()
        .then(response => {
          if (response.code !== 0) throw new Error(response.msg);
          commit('SET_USERINFO', response.data);
          Storage.set('userInfo', response.data);
          resolve(response);
        })
        .catch(err => {
          reject(err);
        });
      });
    },
    logout({commit}) {
      return new Promise((resolve, reject) => {
        try {
          commit('SET_USERINFO', '');
          Storage.remove('userInfo');
          commit('SET_TOKEN', '');
          Storage.remove('token');
          resolve();
        } catch (err) {
          reject(err);
        }
      });
    }
  }
});
