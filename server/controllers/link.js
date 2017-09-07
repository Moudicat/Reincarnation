import LinkApi from '../api/link';
import BaseRouterController from './base/baseRouterController';
import { controller, get, patch, del } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/link', rplMiddleware)
export default class Link extends BaseRouterController {

  @get('/')
  list(req, res) {
    LinkApi.list()
      .then(response => {
        if (response.length === 0) {
          res.resData.msg = '无数据';
          res.json(res.resData);
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

  @patch('/', authorization)
  insert(req, res) {
    if (!req.body.name || !req.body.address || !req.body.owner) {
      res.sendStatus(400);
      return;
    }
    LinkApi.insert(req.body)
      .then(response => {
        res.resData.msg = '添加成功';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @del('/:id', authorization)
  remove(req, res) {
    LinkApi.remove(req.params.id)
      .then(() => {
        res.resData.msg = '成功删除';
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      })
  }
}
