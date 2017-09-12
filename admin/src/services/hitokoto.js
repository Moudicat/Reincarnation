/**
 * Created by Moudi on 2017/5/21.
 */
import config from '../config';

export default class Hitokoto {
  static async get() {
    const result = await fetch(config.baseURL + '/hitokoto', {
      headers: { 'X-MDC-Token': Store.state.token }
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  static async getAll() {
    const result = await fetch(config.baseURL + '/hitokoto/all', {
      headers: { 'X-MDC-Token': Store.state.token }
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  static async add(contentObj) {
    const result = await fetch(`${config.baseURL}/hitokoto`, {
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
  static async setActive(id, isActive) {
    const result = await fetch(`${config.baseURL}/hitokoto/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-MDC-Token': Store.state.token
      },
      body: JSON.stringify({isActive})
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  static async remove(id) {
    const result = await fetch(`${config.baseURL}/hitokoto/${id}`, {
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
