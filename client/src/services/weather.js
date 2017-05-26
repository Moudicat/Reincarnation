/**
 * Created by Moudi on 2017/5/26.
 */
import config from '../config';

export default class Weather {
  static async get() {
    const status = await fetch(config.baseURL + '/weather');
    return status.json();
  }
}
