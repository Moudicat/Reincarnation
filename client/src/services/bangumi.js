/**
 * Created by Moudi on 2017/6/5.
 */
import config from '../config';

export default class Bangumi {
  static async get(id) {
    const result = await fetch(config.baseURL + '/bangumi/' + id);
    return result.json();
  }
}
