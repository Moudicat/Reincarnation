/**
 * Created by Moudi on 2017/6/4.
 */
import config from '../config';

export default class Animation {
  static async get() {
    const result = await fetch(config.baseURL + '/animation', {
      headers: { 'X-MDC-Token': Store.state.token }
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  static async add(contentObj) {
    const result = await fetch(`${config.baseURL}/animation`, {
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
  static async getOne(id) {
    const result = await fetch(`${config.baseURL}/animation/${id}`, {
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
  static async update(contentObj) {
    const result = await fetch(`${config.baseURL}/animation/${contentObj.id}`, {
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
    const result = await fetch(`${config.baseURL}/animation/` + id, {
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
