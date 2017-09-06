/**
 * Created by Moudi on 2017/5/26.
 */

import BaseRouterController from './base/baseRouterController';
import { controller, get, patch, del } from '../decorators/router';
import rplMiddleware from '../middlewares/rplMiddleware';

@controller('/weather', rplMiddleware)
export default class Weather extends BaseRouterController {
  @get('')
  get(req, res) => {
    global.weather.timestamp = +new Date() - 1495199400000;
    res.resData.data = global.weather;
    res.json(res.resData);
  }
}
