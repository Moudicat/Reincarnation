import Vue from 'vue';
import Router from 'vue-router';
import Homepage from 'views/homepage';
import About from 'views/about';
import AboutPage from 'views/about/aboutPage';
import ReleaseTable from 'components/releaseTable';
import Bangumi from 'views/bangumi';
import Links from 'views/links';
const Article = () => import('./views/article');
import Page404 from 'views/404';
Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {x: 0, y: 0};
    }
  },
  routes: [
    {
      path: '/',
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
      path: '/links',
      name: 'Links',
      component: Links
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
