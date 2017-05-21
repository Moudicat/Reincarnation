import Vue from 'vue';
import App from './App';
import router from './router';
import elementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import store from './store/index';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import 'whatwg-fetch';

Vue.use(elementUI);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  NProgress.done();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
