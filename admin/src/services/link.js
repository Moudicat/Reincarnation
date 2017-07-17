/**
 * Created by Moudicat on 2017/7/18.
 */
import config from '../config';

export default class Link {
  static async get() {
    const result = await fetch(config.baseURL + '/link');
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }

  static async add(contentObj) {
    const result = await fetch(`${config.baseURL}/link`, {
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

  static async remove(id) {
    const result = await fetch(`${config.baseURL}/link/${id}`, {
      method: 'delete',
      headers: {
        'X-MDC-Token': Store.state.token
      }
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
}
