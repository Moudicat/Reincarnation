import Vue from 'vue';
import App from './App';
import router from './router';

Vue.config.productionTip = false;

import '../static/reset.css';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
