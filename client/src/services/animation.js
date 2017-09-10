/**
 * Created by Moudi on 2017/6/4.
 */
import config from '../config';

export default class Animation {
  static async get() {
    const result = await fetch(config.baseURL + '/animation');
    return result.json();
  }

  static async getLatest() {
    const result = await fetch(config.baseURL + '/animation/latest');
    return result.json();
  }
}
