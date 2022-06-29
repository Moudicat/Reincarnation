import BaseRouterController from './base/baseRouterController';
import { controller, get  } from '../decorators/router';
import rplMiddleware from '../middlewares/rplMiddleware';
import config from '../config';
import request from 'superagent';

@controller('/notify', rplMiddleware)
export default class Notify extends BaseRouterController {
  @get('/')
  async get(req, res) {
    const getTokenUrl = `https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=${config.wecom.cid}&corpsecret=${config.wecom.secret}`
    const getTokenRes = await request.get(getTokenUrl)
    const accessToken = getTokenRes.body.access_token
    if (accessToken?.length <= 0) {
      aelog(req, res, new Error('获取 accessToken 失败'));
      res.sendStatus(500);
      return;
    }
    const sendMsgUrl = `https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token=${accessToken}`
    await request.post(sendMsgUrl).send({
      touser: '@all',
      agentid: config.wecom.aid,
      msgtype: 'text',
      text: {
        content: req.body,
      },
      duplicate_check_interval: 600,
    })
    res.resData.data = '';
    res.json(res.resData);
  }
}