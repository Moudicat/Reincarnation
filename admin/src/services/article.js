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
    return result.json();
  }
  // 列出全部
  static async listAll() {
    const result = await fetch(config.baseURL + '/article/all', {
      headers: {'X-MDC-Token': Store.state.token}
    });
    return result.json();
  }
  // 修改发布状态
  static async setStatus(id, status) {
    const result = await fetch(`${config.baseURL}/article/${id}/status`, {
      method: 'PATCH',
      headers: {'X-MDC-Token': Store.state.token},
      body: JSON.stringify({status: status})
    });
    return result.json();
  }
  // 更新文章
  static async update(articleObj) {
    const result = await fetch(`${config.baseURL}/article/${id}`, {
      method: 'PATCH',
      headers: {'X-MDC-Token': Store.state.token},
      body: JSON.stringify({articleObj})
    });
    return result.json();
  }
}
