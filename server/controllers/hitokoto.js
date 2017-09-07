/**
 * Created by Moudi on 2017/5/11.
 */
import HitokotoApi from '../api/hitokoto';
import BaseRouterController from './base/baseRouterController';
import { controller, get, patch, del } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/hitokoto', rplMiddleware)
export default class Hitokoto extends BaseRouterController {
  @get('/')
  get(req, res, next) {
    HitokotoApi.get()
      .then(response => {
        if (response.length === 0) {
          res.resData.msg = '无数据';
          res.json(res.resData);
        } else {
          delete(response[0]._id);
          res.resData.data = response[0];
          res.json(res.resData);
        }
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @patch('/', authorization)
  insert(req, res) {
    HitokotoApi.insert(req.body)
      .then(response => {
        res.resData.msg = '添加成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @get('/all', authorization)
  getAll(req, res) {
    HitokotoApi.getAll()
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @patch('/:id', authorization)
  setActive(req, res) {
    HitokotoApi.setActive(req.params.id, req.body.isActive)
      .then(response => {
        res.resData.msg = '操作成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      })
  }

  @del('/:id', authorization)
  remove(req, res) {
    HitokotoApi.remove(req.params.id)
      .then(response => {
        res.resData.msg = '删除成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }
}
