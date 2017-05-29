/**
 * Created by Moudi on 2017/5/26.
 */
import config from '../config';

export default class Status {
  static async update(statusArr) {
    const result = await fetch(config.baseURL + '/status', {
      headers: {
        'X-MDC-Token': Store.state.token,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({status: statusArr})
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }

  static async get() {
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
