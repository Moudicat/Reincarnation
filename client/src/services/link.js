/**
 * Created by reddy on 2017/6/29.
 */
import config from '../config';

export default class Link {
  static async list() {
    const status = await fetch(config.baseURL + '/link');
    return status.json();
  }
}
