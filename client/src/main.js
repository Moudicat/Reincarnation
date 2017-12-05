import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Lazyload from 'vue-lazyload';
import 'whatwg-fetch';
import {Table, TableColumn, Form, FormItem, Pagination, Input} from 'element-ui';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import Popup from 'services/popup';

let Promise = require('es6-promise').Promise;
if (!window.Promise) {
  window.Promise = Promise;
}

Vue.use(Popup);
Vue.use(Pagination);
Vue.use(Lazyload, {
  filter: {
    webp (listener, options) {
      if (!options.supportWebp) return;
      const isCDN = /moudicat-data.oss-cn-beijing.aliyuncs.com/;
      if (isCDN.test(listener.src)) {
        listener.src += '?x-oss-process=style/webp';
      }
    }
  }
});
Vue.use(Input);
Vue.use(Table);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(TableColumn);

Vue.prototype.$event = Vue.prototype.$event || new Vue();

Vue.config.productionTip = false;

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
