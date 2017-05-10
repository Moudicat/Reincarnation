import Vue from 'vue';
import Router from 'vue-router';
import Homepage from 'views/homepage';
import About from 'views/about';
import AboutPage from 'views/about/aboutPage';
import ReleaseTable from 'components/releaseTable';
import Bangumi from 'views/bangumi';
import Article from 'views/article';

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
      path: '/article/:id',
      name: 'Article',
      component: Article
    },
    {
      path: '/animation',
      name: 'Animation',
      component: Bangumi
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      redirect: '/about/index',
      children: [
        {
          path: '/about/index',
          name: 'aboutPage',
          component: AboutPage
        },
        {
          path: '/about/release-note',
          name: 'releaseTable',
          component: ReleaseTable
        }
      ]
    },
    {
      path: '*',
      name: '404',
      component: Page404
    }
  ],
  linkActiveClass: 'active'
});
