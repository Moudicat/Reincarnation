/**
 * Created by Moudi on 2017/5/6.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import header from './module/header';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    header: {
      namespaced: true,
      ...header
    }
  }
});
