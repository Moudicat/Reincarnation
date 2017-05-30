/**
 * Created by Moudi on 2017/5/6.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import header from './module/header';
import components from './module/components';
import global from './module/global';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    header: {
      namespaced: true,
      ...header
    },
    components: {
      namespaced: true,
      ...components
    },
    global: {
      namespaced: true,
      ...global
    }
  }
});
