import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Lazyload from 'vue-lazyload';
import 'whatwg-fetch';

import {Table, TableColumn} from 'element-ui';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式

Vue.use(Lazyload);
Vue.use(Table);
Vue.use(TableColumn);

Vue.config.productionTip = false;

import '../static/reset.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});
