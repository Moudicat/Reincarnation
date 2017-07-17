import Vue from 'vue';
import Router from 'vue-router';
import Layout from 'views/layout/layout';
import login from 'views/login';
import Dashboard from 'views/dashboard/dashboard';
import NewArticle from 'views/article/new';
import ArticleList from 'views/article/list';
import Status from 'views/status';
import Hitokoto from 'views/hitokoto';
import BangumiList from 'views/bangumi/list';
import BangumiAdd from 'views/bangumi/add';
import Link from 'views/link';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: '首页',
      component: Layout,
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: Dashboard
        }
      ]
    },
    {
      path: '/article',
      name: 'Article',
      component: Layout,
      redirect: '/article/list',
      children: [
        {
          path: 'list',
          component: ArticleList
        },
        {
          path: 'new',
          component: NewArticle
        }
      ]
    },
    {
      path: '/status-panel',
      name: 'status',
      component: Layout,
      redirect: '/status-panel/update',
      children: [
        {
          path: 'update',
          component: Status
        }
      ]
    },
    {
      path: '/hitokoto',
      name: 'hitokoto',
      component: Layout,
      redirect: '/hitokoto/index',
      children: [
        {
          path: 'index',
          component: Hitokoto
        }
      ]
    },
    {
      path: '/bangumi',
      name: 'bangumi',
      component: Layout,
      redirect: '/bangumi/list',
      children: [
        {
          path: 'list',
          component: BangumiList
        },
        {
          path: 'add',
          component: BangumiAdd
        }
      ]
    },
    {
      path: '/links',
      name: 'links',
      component: Layout,
      redirect: '/links/list',
      children: [
        {
          path: 'list',
          component: Link
        }
      ]
    }
  ]
});
