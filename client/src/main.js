import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'whatwg-fetch';

import {Table, TableColumn} from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

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
