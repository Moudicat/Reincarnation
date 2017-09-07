/**
 * Created by Moudi on 2017/5/4.
 */

import ArticleApi from '../api/article';
import BaseRouterController from './base/baseRouterController';
import { controller, get, post, patch, del } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';


@controller('/article', rplMiddleware)
export default class Article extends BaseRouterController {

  @get('/')
  get(req, res) {
    // start, limit
    let start = Number(req.query.start) || 0;
    let limit = Number(req.query.limit) || 5;

    ArticleApi.get(start, limit)
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @get('/list')
  list(req, res) {
    ArticleApi.list()
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @get('/count')
  count(req, res) {
    ArticleApi.countArticle()
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @get('/:id')
  getOne(req, res, next) {
    if (req.params.id === 'all') {
      next();
      return;
    }
    if (req.params.id.length < 20) {
      res.sendStatus(404);
      return;
    }
    ArticleApi.getOne(req.params.id)
      .then(response => {
        if (!response) {
          res.sendStatus(404);
        } else {
          res.resData.data = response;
          res.json(res.resData);
        }
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @post('/', authorization)
  insert(req, res) {
    /*
     title: String,
     author: String,
     postTime: String,
     modifiedTime: String,
     status: String,
     content: String,
     description: String,
     banner: String
     */
    let articleObj = req.body;
    if (!(articleObj.title && articleObj.author && articleObj.status && articleObj.content)) {
      res.sendStatus(400);
      return;
    }
    ArticleApi.add(articleObj)
      .then(response => {
        if (response._id) {
          res.resData.msg = '成功';
          res.json(res.resData);
        } else {
          throw new Error('处理失败');
        }
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @get('/all', authorization)
  getAll(req, res) {
    ArticleApi.listAll()
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  // 更新文章
  @patch('/:id', authorization)
  modify(req, res) {
    if (!req.body.articleObj) {
      res.sendStatus(400);
      return;
    }
    ArticleApi.update(req.body.articleObj)
      .then(response => {
        res.resData.msg = '修改成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @del('/markDel', authorization)
  remove(req, res) {
    ArticleApi.remove()
      .then(response => {
        res.resData.msg = '删除成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      })
  }

  @patch('/:id/status', authorization)
  setStatus(req, res) {
    ArticleApi.setStatus(req.params.id, req.body.status)
      .then(response => {
        res.resData.msg = '修改成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      })
  }
}
