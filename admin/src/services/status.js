/**
 * Created by Moudi on 2017/5/26.
 */
import config from '../config';

export default class Status {
  static async update() {
    const result = await fetch(config.baseURL + '/status', {
      headers: { 'X-MDC-Token': Store.state.token }
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
}
