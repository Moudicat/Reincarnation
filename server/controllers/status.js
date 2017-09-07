/**
 * Created by Moudi on 2017/5/23.
 */
import StatusApi from '../api/status';
import AnimationApi from '../api/animation';
import BaseRouterController from './base/baseRouterController';
import { controller, get, patch, del } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/status', rplMiddleware)
export default class Status extends BaseRouterController {
  @get('')
  get(req, res) {
    StatusApi.get()
      .then(response => {
        if (response.length === 0) {
          res.resData.msg = '无数据';
          res.json(res.resData);
        } else {
          res.resData.data = response[0];
          AnimationApi.getLatest()
            .then(response => {
              let animationObj = {
                name: '最近看的番',
                content: response[0].name,
                num: parseInt(response[0].episode)
              };
              res.resData.data.StatusApi.push(animationObj);
              res.json(res.resData);
            })
            .catch(err => {
              console.error(err);
              res.sendStatus(500);
              return;
            });
        }
      })
      .catch(err => {
        aelog(req, res, err);
        res.sendStatus(500);
      });
  }

  @patch('', authorization)
  insert(req, res) {
    if (!req.body.status && req.body.StatusApi.length === 0 && !(req.body.status instanceof Array)) {
      res.sendStatus(400);
    } else {
      StatusApi.update(req.body)
        .then(response => {
          res.resData.msg = '添加成功';
          res.json(res.resData);
        })
        .catch(err => {
          aelog(req, res, err);
          res.sendStatus(500);
        });
    }
  }
}
