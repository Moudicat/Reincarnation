/**
 * Created by Moudi on 2017/5/21.
 */
import config from '../config';

export default class Hitokoto {
  static async get() {
    const result = await fetch(config.baseURL + '/hitokoto', {
      headers: { 'X-MDC-Token': Store.state.token }
    });
    return result.json();
  }
}
