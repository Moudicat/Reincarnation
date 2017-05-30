/**
 * Created by Moudi on 2017/5/22.
 */
import config from '../config';

export default class Article {
  // 添加
  static async add(articleForm) {
    const result = await fetch(config.baseURL + '/article', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-MDC-Token': Store.state.token
      },
      body: JSON.stringify(articleForm)
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  // 列出全部
  static async listAll() {
    const result = await fetch(config.baseURL + '/article/all', {
      headers: {'X-MDC-Token': Store.state.token}
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  // 修改发布状态
  static async setStatus(id, status) {
    const result = await fetch(`${config.baseURL}/article/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-MDC-Token': Store.state.token
      },
      body: JSON.stringify({status: status})
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
  // 更新文章
  static async update(id, articleObj) {
    const result = await fetch(`${config.baseURL}/article/${id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-MDC-Token': Store.state.token
      },
      body: JSON.stringify({articleObj})
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }

  static async getOne(id) {
    const result = await fetch(`${config.baseURL}/article/${id}`);
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }

  static async remove() {
    const result = await fetch(`${config.baseURL}/article/markDel`, {
      method: 'delete',
      headers: {'X-MDC-Token': Store.state.token}
    });
    if (result.ok) {
      return result.json();
    } else {
      throw new Error(result.status);
    }
  }
}
