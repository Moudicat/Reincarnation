/**
 * Created by Moudi on 2017/5/26.
 */

import BaseRouterController from './base/baseRouterController';
import { controller, get } from '../decorators/router';
import rplMiddleware from '../middlewares/rplMiddleware';
import calendar from '../services/programmerCalendar';

@controller('/calendar', rplMiddleware)
export default class Weather extends BaseRouterController {
  @get('/')
  get(req, res) {
    try {
      res.resData.data = {
        today: calendar.getTodayString(),
        direction: calendar.getDirectionString(),
        lucky: calendar.pickTodaysLuck()
      };
      res.json(res.resData);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  }
}
