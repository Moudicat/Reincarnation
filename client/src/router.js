import Vue from 'vue';
import Router from 'vue-router';
import Homepage from 'views/homepage';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'index'
    },
    {
      path: '/index',
      name: 'Homepage',
      component: Homepage
    }
  ],
  linkActiveClass: 'active'
});
