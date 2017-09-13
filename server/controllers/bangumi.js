
import BangumiApi from '../api/bangumi';
import BaseRouterController from './base/baseRouterController';
import { controller, get, patch } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/bangumi', rplMiddleware)
export default class Bangumi extends BaseRouterController {
  @get('/search')
  search(req, res, next) {
    BangumiApi.search(req.query.q)
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
  getOne(req, res) {
    if (!req.params.id) {
      res.sendStatus(400);
      return;
    }
    BangumiApi.getOne(req.params.id)
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @patch('/', authorization)
  insert(req, res, next) {
    if (req.body instanceof Array) {
      const bangumiArr = req.body.concat();

      function insert() {
        if (bangumiArr.length === 0) {
          res.resData.msg = '添加成功，本次添加了' + req.body.length + '条数据';
          res.json(res.resData);
          return;
        }
        BangumiApi.insert(bangumiArr[0])
          .then(response => {
            bangumiArr.shift();
            insert();
          })
          .catch(err => {
            aelog(req, res, err);
            res.sendStatus(500);
            return;
          });
      }

      insert();
    } else if (typeof req.body === 'object') {
      BangumiApi.insert(req.body)
        .then(response => {
          res.resData.msg = '添加成功，本次添加/更新了1条数据';
          res.json(res.resData);
          return;
        })
        .catch(err => {
          aelog(req, res, err);
          res.sendStatus(500);
          return;
        });
    } else {
      res.sendStatus(400);
      return;
    }
  }
}
