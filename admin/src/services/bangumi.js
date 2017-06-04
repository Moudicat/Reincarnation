/**
 * Created by Moudi on 2017/6/4.
 */
import config from '../config';

export default class Bangumi {
  static async search(q) {
    const result = await fetch(config.baseURL + '/bangumi/q=' + q, {
      headers: { 'X-MDC-Token': Store.state.token }
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  static async add(contentObj) {
    const result = await fetch(`${config.baseURL}/bangumi`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-MDC-Token': Store.state.token
      },
      body: JSON.stringify(contentObj)
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
}
