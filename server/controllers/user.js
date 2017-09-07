
import jwt from 'jsonwebtoken';
import config from '../config';
import UserApi from '../api/user';
import BaseRouterController from './base/baseRouterController';
import { controller, get, post } from '../decorators/router';
import authorization from '../middlewares/authorization';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/user', rplMiddleware)
export default class User extends BaseRouterController {

  @post('')
  register(req, res, next) {
    UserApi.register(req.body)
      .then(user => {
        const token = jwt.sign({
          uid: user._id,
          name: user.username,
          exp: Math.floor(+new Date / 1000) + 60 * 2 // 2 min
        }, config.jwt.secret);
        res.resData.token = token;
        res.resData.msg = '注册成功';
        res.json(res.resData);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  }

  @post('login')
  login(req, res, next) {
    UserApi.login(req.body)
      .then(response => {
        if (response !== null && response.password === req.body.password) {
          const token = jwt.sign({
            uid: response._id,
            name: response.username,
            exp: Math.floor(+new Date / 1000) + 60 * 60 // 60 min
          }, config.jwt.secret);
          res.cookie('X-MDC-Token', token, { httpOnly: true });
          res.resData.token = token;
          res.resData.msg = '登录成功';
          res.json(res.resData);
        } else {
          res.resData.msg = '用户名或密码不正确';
          res.resData.code = -1;
          res.json(res.resData);
        }
      })
      .catch(err => {
        res.resData.msg = err.message;
        res.resData.code = -1;
        res.json(res.resData);
      });
  }

  @get('', authorization)
  getInfo(req, res, next) {
    UserApi.getInfo(req.username)
      .then(response => {
        res.resData.data = response;
        res.json(res.resData);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  }
}
