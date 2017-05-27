import Vue from 'vue';
import Router from 'vue-router';
import Layout from 'views/layout/layout';
import login from 'views/login';
import Dashboard from 'views/dashboard/dashboard';
import NewArticle from 'views/article/new';
import ArticleList from 'views/article/list';
import Status from 'views/status';

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
      name: '文章',
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
    }
    // {
    //   path: '/questionnaire',
    //   component: Layout,
    //   redirect: '/questionnaire/list',
    //   children: [
    //     {
    //       path: 'list',
    //       component: QuestionnaireList
    //     },
    //     {
    //       path: 'new',
    //       component: NewQuestionnaire
    //     },
    //     {
    //       path: ':qid/edit',
    //       component: NewQuestionnaire
    //     },
    //     {
    //       path: ':qid/result',
    //       component: QuestionnaireResult,
    //       children: [
    //         {
    //           path: ':stuId',
    //           component: StudentResult
    //         }
    //       ]
    //     }
    //   ]
    // }
  ]
});
