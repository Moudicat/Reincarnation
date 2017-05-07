import Vue from 'vue';
import Router from 'vue-router';
import Homepage from 'views/homepage';

import Page404 from 'views/404';
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
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ],
  linkActiveClass: 'active'
});
